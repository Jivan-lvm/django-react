from django.db import models


class Currency(models.Model):
    name = models.CharField(max_length=10)
    price_usdt = models.PositiveIntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('name', 'timestamp')