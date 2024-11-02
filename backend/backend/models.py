from django.db import models


class Currency(models.Model):
    name = models.CharField(max_length=10)
    price_usdt = models.PositiveIntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name}: {self.price_usdt} USD at {self.timestamp}"