from rest_framework import serializers
from backend.models import Currency


class BuyCryptoSerializer(serializers.Serializer):
    usdt = serializers.IntegerField()


class SellCryptoSerializer(serializers.Serializer):
    jivan = serializers.IntegerField()
    
    
class CurrencySerializer(serializers.Serializer):
    price_usdt = serializers.IntegerField()
    timestamp = serializers.DateTimeField()
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['timestamp'] = instance.timestamp.strftime("%d.%m.%Y")
        return representation
