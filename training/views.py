from django.shortcuts import render
from django.http import HttpResponse

from rest_framework import viewsets
from .serializer import UserActivitySerializer, UserSerializer, UserActivityLogSerializer, ActivitySerializer
from .models import UserActivityLog, User, UserActivity, Activity

# Create your views here.

class UserActivityLogView(viewsets.ModelViewSet):
    serializer_class = UserActivityLogSerializer
    queryset = UserActivityLog.objects.all()


class UserActivityView(viewsets.ModelViewSet):
    serializer_class = UserActivitySerializer
    queryset = UserActivity.objects.all()


class ActivityView(viewsets.ModelViewSet):
    serializer_class = ActivitySerializer
    queryset = Activity.objects.all()


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
