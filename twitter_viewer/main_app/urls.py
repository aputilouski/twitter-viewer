from django.urls import path
from .views import *

urlpatterns = [
    path('login/', login),
    path('get_tweets/', Tweets.as_view())
]
