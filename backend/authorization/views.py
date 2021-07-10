import jwt
from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.http import HttpResponseRedirect
from rest_framework import exceptions
from rest_framework.response import Response
from rest_framework.decorators import api_view
from requests_oauthlib import OAuth1Session

from .models import twitterRequestTokens, twitterAccessTokens
from .utils import generate_access_token, generate_refresh_token
from backend.settings import CLIENT_KEY, CLIENT_SECRET_KEY


REQUEST_TOKEN_URL = "https://api.twitter.com/oauth/request_token"
BASE_AUTHORIZATION_URL = "https://api.twitter.com/oauth/authorize"
ACCESS_TOKEN_URL = "https://api.twitter.com/oauth/access_token"


@api_view(['GET'])
def getTwitterAuthorizePage(request):
    try:
        oauth = OAuth1Session(CLIENT_KEY, client_secret=CLIENT_SECRET_KEY)
        fetch_response = oauth.fetch_request_token(REQUEST_TOKEN_URL)
        request_tokens = twitterRequestTokens(oauth_token=fetch_response.get('oauth_token'),
                                              oauth_token_secret=fetch_response.get('oauth_token_secret'))
        request_tokens.full_clean()
        request_tokens.save()
        return Response(data={"url": oauth.authorization_url(BASE_AUTHORIZATION_URL)}, status=200)
    except (ValidationError, Exception):
        return Response(status=500)


@api_view(['GET'])
def authorization(request):
    try:
        oauth = OAuth1Session(CLIENT_KEY, client_secret=CLIENT_SECRET_KEY)
        oauth_response = oauth.parse_authorization_response(request.build_absolute_uri())
        oauth_verifier = oauth_response.get('oauth_verifier')
        request_tokens = twitterRequestTokens.objects.get(pk=oauth_response.get('oauth_token'))

        access_oauth = OAuth1Session(CLIENT_KEY,
                                     client_secret=CLIENT_SECRET_KEY,
                                     resource_owner_key=request_tokens.oauth_token,
                                     resource_owner_secret=request_tokens.oauth_token_secret,
                                     verifier=oauth_verifier)

        access_tokens = access_oauth.fetch_access_token(ACCESS_TOKEN_URL)
        twitter_access_tokens = twitterAccessTokens(oauth_token=access_tokens.get("oauth_token"),
                                                    oauth_token_secret=access_tokens.get("oauth_token_secret"))
        twitter_access_tokens.save()

        screen_name = access_tokens.get("screen_name")
        User = get_user_model()
        user = User.objects.filter(username=screen_name).first()
        if user is None:
            user = User(username=screen_name)

        user.twitter_access = twitter_access_tokens
        user.save()

        access_token = generate_access_token(user)
        refresh_token = generate_refresh_token(user)

        response = HttpResponseRedirect("/")
        response.set_cookie(key='access_token', value=access_token)
        response.set_cookie(key='refreshtoken', value=refresh_token, httponly=True)
        return response
    except Exception:
        return Response(status=500, data={})


@api_view(['POST'])
def refresh_token_view(request):
    refresh_token = request.COOKIES.get('refreshtoken')
    if refresh_token is None:
        raise exceptions.AuthenticationFailed('Authentication credentials were not provided.')
    try:
        payload = jwt.decode(
            refresh_token, settings.REFRESH_TOKEN_SECRET, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise exceptions.AuthenticationFailed('expired refresh token, please login again.')

    User = get_user_model()
    user = User.objects.filter(id=payload.get('user_id')).first()
    if user is None:
        raise exceptions.AuthenticationFailed('User not found')

    if not user.is_active:
        raise exceptions.AuthenticationFailed('user is inactive')

    access_token = generate_access_token(user)
    return Response({'access_token': access_token})
