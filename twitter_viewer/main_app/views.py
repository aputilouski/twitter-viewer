# Create your views here.

import twitter
from django.contrib.auth import authenticate
from django.core.cache import cache
from rest_framework.pagination import PageNumberPagination
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


class Tweets(APIView, PageNumberPagination):
    page_size = 12
    page_query_param = 'page'

    def post(self, request):
        try:
            username = request.data['input']
            if len(username) == 0:
                return Response()

            cache_key = 'user_tweets__' + username
            user_tweets = cache.get(cache_key)
            if not user_tweets:
                user_tweets = api.GetUserTimeline(screen_name=username, exclude_replies=True, include_rts=False,
                                                  count=150)
                cache.set(cache_key, user_tweets, 900)

            # print(user_tweets[0])
            results = self.paginate_queryset(user_tweets, request)
            serializer = TweetsSerializer(results, many=True)
            return Response(serializer.data)

        except twitter.error.TwitterError:
            # Not Authorized
            return Response()
        except KeyError:
            return Response()
