from django.urls import path
from api.views import SellCryptoView, BuyCryptoView, CurrencyHistoryView


urlpatterns = [
    path('sell', SellCryptoView.as_view(), name='sell_crypto'),
    path('buy', BuyCryptoView.as_view(), name='buy_crypto'), 
    path('currency-history', CurrencyHistoryView.as_view(), name='currency_history'),
]
