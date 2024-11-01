from celery import shared_task
import random
from backend.models import Currency
import logging

logger = logging.getLogger(__name__)

@shared_task
def generate_random_price():
    try:
        price = random.randint(5, 10)
        currency, created = Currency.objects.update_or_create(
            name='JIVAN',
            defaults={'price_usdt': price}
        )
        action = "создана" if created else "обновлена"
        logger.info(f"{action.capitalize()} цена для JIVAN: {price}")
    except Exception as e:
        logger.error(f"Ошибка при генерации цены: {e}")