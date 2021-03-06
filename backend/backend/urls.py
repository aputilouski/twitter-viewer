from django.contrib import admin
from django.urls import path, include
from .views import index


urlpatterns = [
    path('', index),
    path('admin/', admin.site.urls),
    path('api/', include('twitter_viewer.urls')),
    path('api/auth/', include('authorization.urls')),
    path('main', index),
    path('about', index),
]
