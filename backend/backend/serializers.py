from rest_framework import serializers
from backend.models import Currency


class BuyCryptoSerializer(serializers.Serializer):
    usdt = serializers.IntegerField()


class SellCryptoSerializer(serializers.Serializer):
    jivan = serializers.IntegerField()
    
    
class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = ['timestamp', 'price_usdt']
