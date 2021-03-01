import twitter
from django.contrib.auth import authenticate
from django.shortcuts import render
from django.core.paginator import Paginator
from django.http import HttpResponse

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view

from main_app.serializers import TweetsSerializer

# Create your views here.
api_key = ''
api_secret_key = ''
access_token = ''
access_token_secret = ''

api = twitter.Api(consumer_key=api_key,
                  consumer_secret=api_secret_key,
                  access_token_key=access_token,
                  access_token_secret=access_token_secret,
                  tweet_mode='extended')


@api_view(['GET', 'POST'])
def login(request):
    user_data = request.data["user"]
    user = authenticate(username=user_data["login"], password=user_data["password"])
    if user:
        return Response({'error': 0, 'user': user_data["login"]})
    else:
        return Response({'error': 1, 'message': 'Invalid login or password!'})


class Tweets(APIView):

    def post(self, request, page):
        try:
            username = request.data['input']
            if len(username) > 0:
                user_tweets = api.GetUserTimeline(screen_name=username, exclude_replies=True, include_rts=False,
                                                  count=12)
                # print(user_tweets[0])
                # p = Paginator(user_tweets, 6)
                serializer = TweetsSerializer(user_tweets, many=True)
                return Response(serializer.data)
            else:
                return Response()
        except twitter.error.TwitterError:
            # Not Authorized
            return Response()
        except KeyError:
            return Response()
