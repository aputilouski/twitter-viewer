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
    video_info = serializers.SerializerMethodField(required=False)

    def get_video_info(self, obj):
        if type(obj.video_info) is dict:
            bitrate = url = None
            for data in obj.video_info['variants']:
                if data['content_type'] == "video/mp4" and (bitrate is None or bitrate < data['bitrate']):
                    bitrate = data['bitrate']
                    url = data['url']
            if url is not None:
                return {"url": url}
        else:
            return None


class TweetsSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    user = UserSerializer()
    media = MediaListField(many=True)
    created_at = serializers.SerializerMethodField()
    favorite_count = serializers.CharField()
    retweet_count = serializers.CharField()
    full_text = serializers.SerializerMethodField()

    def get_full_text(self, obj):
        return re.compile(r'''((?:mailto:|ftp://|https?://)[^ <>'"{}|\\^`[\]]*)''').sub(
            r'<a href="\1" target="_blank">Link</a>', obj.full_text)

    def get_created_at(self, obj):
        dt = parse(obj.created_at).strftime("%A, %d. %B %Y %I:%M%p")
        return dt
