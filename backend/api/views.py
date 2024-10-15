from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from backend.serializers import BuyCryptoSerializer, SellCryptoSerializer
from users.models import User
from backend.models import Currency
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated


class BuyCryptoView(GenericAPIView):
    serializer_class = BuyCryptoSerializer

    def post(self, request, *args, **kwargs):
        user = request.user
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        amount_usdt = serializer.validated_data['usdt']
        try:
            current_price = Currency.objects.latest('timestamp').price_usdt
        except Currency.DoesNotExist:
            return Response({'error': 'Цена валюты не найдена'}, status=status.HTTP_404_NOT_FOUND)
        
        amount_crypto = amount_usdt / current_price

        if user.balance_usdt >= amount_usdt:
            user.balance_usdt -= amount_usdt
            user.balance_crypto += amount_crypto
            user.save()
            return Response({'success': 'Успешная покупка'}, status=status.HTTP_200_OK)
        return Response({'error': 'Недостаточно средств для покупки'}, status=status.HTTP_400_BAD_REQUEST)


class SellCryptoView(GenericAPIView):
    serializer_class = SellCryptoSerializer

    def post(self, request, *args, **kwargs):
        user = request.user
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        amount_crypto = serializer.validated_data['jivan']
        try:
            current_price = Currency.objects.latest('timestamp').price_usdt
        except Currency.DoesNotExist:
            return Response({'error': 'Цена валюты не найдена'}, status=status.HTTP_404_NOT_FOUND)
        
        amount_usdt = amount_crypto * current_price

        if user.balance_crypto >= amount_crypto:
            user.balance_crypto -= amount_crypto
            user.balance_usdt += amount_usdt
            user.save()
            return Response({'success': 'Успешная продажа', 'received_usdt': amount_usdt}, status=status.HTTP_200_OK)
        return Response({'error': 'Недостаточно криптовалюты для продажи'}, status=status.HTTP_400_BAD_REQUEST)
    
    
class UserBalanceView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        return Response({
            'balance_usdt': user.balance_usdt,
            'balance_crypto': user.balance_crypto,
        })
        
        
class CurrencyHistoryView(APIView):
    def get(self, request, *args, **kwargs):
        history = Currency.objects.order_by('-timestamp')[:30]
        data = [
            {
                'price_usdt': entry.price_usdt,
                'timestamp': entry.timestamp
            }
            for entry in history
        ]
        return Response(data)