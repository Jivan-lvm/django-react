from celery import shared_task
import random
from backend.models import Currency
import logging
from django.utils import timezone

logger = logging.getLogger(__name__)

@shared_task
def generate_random_price():
    try:
        price = random.randint(5, 10)
        timestamp = timezone.now()
        currency = Currency.objects.create(
            name='JIVAN',
            price_usdt=price,
            timestamp=timestamp
        )
        logger.info(f"Создана новая цена для JIVAN: {price}, ID записи: {currency.id}")
    except Exception as e:
        logger.error(f"Ошибка при генерации цены в Celery: {e}")