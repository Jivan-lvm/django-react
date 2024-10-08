from django.contrib import admin
from django.urls import path, include
from backend.views import CheckPermission


urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('', CheckPermission.as_view())
]
