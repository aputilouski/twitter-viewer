# Create your views here.
import twitter
from django.core.cache import cache
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from .serializers import TweetsSerializer, ProfileSerializer
from authorization.models import twitterAccessTokens
from backend.settings import CLIENT_KEY, CLIENT_SECRET_KEY, DEFAULT_ACCESS_TOKEN, DEFAULT_ACCESS_TOKEN_SECRET


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def profile(request):
    user = request.user
    api = twitter.Api(consumer_key=CLIENT_KEY,
                      consumer_secret=CLIENT_SECRET_KEY,
                      access_token_key=user.twitter_access.oauth_token,
                      access_token_secret=user.twitter_access.oauth_token_secret)
    profile = api.GetUser(screen_name=user.username)
    serializer = ProfileSerializer(profile)
    return Response(data={"profile": serializer.data})


def load_tweets(input, user):
    cache_key = 'user_tweets__' + input
    user_tweets = cache.get(cache_key)
    if not user_tweets:
        api = twitter.Api(consumer_key=CLIENT_KEY,
                          consumer_secret=CLIENT_SECRET_KEY,
                          access_token_key=user.twitter_access.oauth_token,
                          access_token_secret=user.twitter_access.oauth_token_secret,
                          tweet_mode='extended')
        user_tweets = api.GetUserTimeline(screen_name=input, exclude_replies=True,
                                          include_rts=False, count=100)
        cache.set(cache_key, user_tweets, 900)
    return user_tweets


def set_default_tokens(user):
    user.twitter_access = twitterAccessTokens()
    user.twitter_access.oauth_token = DEFAULT_ACCESS_TOKEN
    user.twitter_access.oauth_token_secret = DEFAULT_ACCESS_TOKEN_SECRET


class LoadTweets(APIView, PageNumberPagination):
    page_size = 12
    page_query_param = 'page'
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):

        try:
            username = request.query_params.get('input')
            if len(username) == 0:
                raise ValueError("Invalid input value")


            if request.user.is_anonymous:
                set_default_tokens(request.user)

            loaded_tweets = load_tweets(username, request.user)

            results = self.paginate_queryset(loaded_tweets, request)
            serializer = TweetsSerializer(results, many=True)
            return Response({"tweets": serializer.data, "amount": len(loaded_tweets), "page_size": self.page_size})

        except (ValueError, KeyError):
            return Response(status=400, data={"message": "Invalid input value!"})
        except twitter.error.TwitterError:
            return Response(status=406, data={"message": "Not valid user!"})
        except Exception:
            return Response(status=500, data={"message": "Server error!"})
