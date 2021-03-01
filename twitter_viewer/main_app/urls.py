from django.urls import path
from .views import *

urlpatterns = [
    path('login/', login),
    path('get_tweets/<int:page>', Tweets.as_view())
]
