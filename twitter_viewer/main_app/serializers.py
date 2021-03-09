import re
from rest_framework import serializers
from dateutil.parser import parse


class UserSerializer(serializers.Serializer):
    name = serializers.CharField()
    url = serializers.CharField()
    screen_name = serializers.CharField()
    profile_image_url_https = serializers.CharField()


class MediaListField(serializers.Serializer):
    id = serializers.CharField()
    type = serializers.CharField()
    media_url_https = serializers.CharField()


class TweetsSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    user = UserSerializer()
    media = MediaListField(many=True)
    created_at = serializers.SerializerMethodField()
    favorite_count = serializers.CharField()
    retweet_count = serializers.CharField()
    full_text = serializers.SerializerMethodField()

    def get_full_text(self, obj):
        # return obj.full_text[0:-24]
        return re.compile(r'''((?:mailto:|ftp://|https?://)[^ <>'"{}|\\^`[\]]*)''').sub(r'<a href="\1" target="_blank">Link</a>', obj.full_text)



    def get_created_at(self, obj):
        dt = parse(obj.created_at).strftime("%A, %d. %B %Y %I:%M%p")
        return dt
