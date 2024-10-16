from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers


User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('email', 'password')
        

class UserBalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['balance_usdt', 'balance_crypto']