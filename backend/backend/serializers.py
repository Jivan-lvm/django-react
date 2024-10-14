from rest_framework import serializers


class BuyCryptoSerializer(serializers.Serializer):
    usdt = serializers.DecimalField(max_digits=10, decimal_places=2)


class SellCryptoSerializer(serializers.Serializer):
    jivan = serializers.DecimalField(max_digits=10, decimal_places=2)