from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from api import views 


urlpatterns = [
    # path("api/",),
    path("token/", views.MyTokenObtainPairView.as_view(), name="token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("register/", views.RegisterView.as_view(), name="register"),
    path('', views.getRoutes),
    
]