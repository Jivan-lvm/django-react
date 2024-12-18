from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)
    
    
class User(AbstractBaseUser, PermissionsMixin):
    username = None
    email = models.EmailField(verbose_name='Email', 
                              unique=True,
                              max_length=255)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    balance_usdt = models.PositiveIntegerField(default=1000)
    balance_crypto = models.PositiveIntegerField(default=0)

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    
    objects = CustomUserManager()
    
    class Meta:
        verbose_name_plural = 'Пользователи'
        verbose_name = 'Пользователь'

    def __str__(self):
        return self.email
    
