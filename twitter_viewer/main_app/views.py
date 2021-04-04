# Create your views here.

import twitter
from django.core.cache import cache
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from main_app.serializers import TweetsSerializer, ProfileSerializer

# Create your views here.
api_key = ''
api_secret_key = ''
access_token = ''
access_token_secret = ''


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def profile(request):
    user = request.user
    api = twitter.Api(consumer_key=api_key,
                      consumer_secret=api_secret_key,
                      access_token_key=user.twitter_access.oauth_token,
                      access_token_secret=user.twitter_access.oauth_token_secret)
    profile = api.GetUser(screen_name=user.username)
    serializer = ProfileSerializer(profile)
    return Response(data={"profile": serializer.data})


class Tweets(APIView, PageNumberPagination):
    page_size = 12
    page_query_param = 'page'
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            username = request.data['input']
            if len(username) == 0:
                raise ValueError("Invalid input value")

            cache_key = 'user_tweets__' + username
            user_tweets = cache.get(cache_key)
            if not user_tweets:
                api = twitter.Api(consumer_key=api_key,
                                  consumer_secret=api_secret_key,
                                  access_token_key=request.user.twitter_access.oauth_token,
                                  access_token_secret=request.user.twitter_access.oauth_token_secret,
                                  tweet_mode='extended')
                user_tweets = api.GetUserTimeline(screen_name=username, exclude_replies=True,
                                                  include_rts=False, count=100)
                cache.set(cache_key, user_tweets, 900)

            # print(user_tweets[0])
            results = self.paginate_queryset(user_tweets, request)
            serializer = TweetsSerializer(results, many=True)
            return Response({"tweets": serializer.data, "amount": len(user_tweets), "page_size": self.page_size})
        except (ValueError, KeyError):
            return Response(status=400, data={"message": "Invalid input value!"})
        except twitter.error.TwitterError:
            return Response(status=406, data={"message": "Not valid user!"})
        except Exception:
            return Response(status=500, data={"message": "Server error!"})
