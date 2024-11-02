from rest_framework import serializers
from backend.models import Currency


class BuyCryptoSerializer(serializers.Serializer):
    usdt = serializers.IntegerField()


class SellCryptoSerializer(serializers.Serializer):
    jivan = serializers.IntegerField()
    
    
class PriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = ('price_usdt', 'timestamp')
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['timestamp'] = instance.timestamp.strftime("%d.%m.%Y")
        return representation

class CurrencySerializer(serializers.Serializer):
    name = serializers.CharField()
    prices = PriceSerializer(many=True)
    

    def to_representation(self, instance):
        prices = Currency.objects.filter(name=instance['name']).order_by('timestamp')
        return {
            "name": instance['name'],
            "prices": PriceSerializer(prices, many=True).data
        }