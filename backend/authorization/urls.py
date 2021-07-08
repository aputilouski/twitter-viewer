from django.urls import path
from .views import *

urlpatterns = [
    path('request_token/', getTwitterAuthorizePage),
    path('access_token/', authorization),
    path('refresh_token/', refresh_token_view),
]
