from django.contrib import admin
from backend.models import Currency

@admin.register(Currency)
class CurrencyAdmin(admin.ModelAdmin):
    list_display = ('name', 'price_usdt', 'timestamp')
