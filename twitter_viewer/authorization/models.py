# import jwt
from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models


class twitterRequestTokens(models.Model):
    oauth_token = models.CharField(max_length=64, unique=True, primary_key=True)
    oauth_token_secret = models.CharField(max_length=64)
    created_at = models.DateTimeField(auto_now_add=True)

    objects = models.Manager()


class twitterAccessTokens(models.Model):
    oauth_token = models.CharField(max_length=64, unique=True, primary_key=True, db_index=True)
    oauth_token_secret = models.CharField(max_length=64)

    objects = models.Manager()


class UserManager(BaseUserManager):

    def create_user(self, username, password=None):
        if username is None:
            raise TypeError('Users must have a username.')

        user = self.model(username=username)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, password):
        if password is None:
            raise TypeError('Superusers must have a password.')

        user = self.create_user(username, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(db_index=True, max_length=255, unique=True)
    email = models.EmailField(unique=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    twitter_access = models.ForeignKey('twitterAccessTokens', on_delete=models.CASCADE,)

    USERNAME_FIELD = 'username'

    objects = UserManager()

    def __str__(self):
        return self.username
