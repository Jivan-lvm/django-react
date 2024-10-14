from celery import shared_task
import random
from backend.models import Currency
import logging

logger = logging.getLogger(__name__)

@shared_task
def generate_random_price():
    try:
        price = random.uniform(0.5, 10.0)
        Currency.objects.create(name='JIVAN', price_usdt=price)
        logger.info(f"Сгенерирована новая цена для JIVAN: {price}")
    except Exception as e:
        logger.error(f"Ошибка при генерации цены: {e}")