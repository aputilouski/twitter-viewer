from django.urls import path
from .views import *

urlpatterns = [
    path('profile/', profile),
    path('load_tweets', LoadTweets.as_view()),
]
