from rest_framework import serializers
from .models import UserActivityLog, User, UserActivity, Activity


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = '__all__'


class UserActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserActivity
        # fields = '__all__'
        fields = ['user', 'activity', 'completed', 'created_at', 'updated_at', 'user_name']


class UserActivityLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserActivityLog
        fields = ['score', 'completed', 'user_name', 'user_id', 'activity_name']
