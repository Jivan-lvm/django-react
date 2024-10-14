from django.db import models


class Currency(models.Model):
    name = models.CharField(max_length=10)
    price_usdt = models.DecimalField(max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('name', 'timestamp')