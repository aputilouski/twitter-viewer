from django.urls import path
from .views import *

urlpatterns = [
    path('profile/', profile),
    path('get_tweets/', Tweets.as_view()),
]
