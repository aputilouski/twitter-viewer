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
    response = Response(data={'user': user_data["login"]}, status=200) if user else Response(
        data={'message': 'Invalid login or password!'}, status=401)
    return response


class Tweets(APIView, PageNumberPagination):
    page_size = 12
    page_query_param = 'page'

    def post(self, request):
        try:
            username = request.data['input']
            if len(username) == 0:
                raise ValueError("Invalid input value")

            cache_key = 'user_tweets__' + username
            user_tweets = cache.get(cache_key)
            if not user_tweets:
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
