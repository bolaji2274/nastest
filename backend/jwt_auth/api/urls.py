from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from api import views 
from api.views import verify_email

urlpatterns = [
    # path("api/",),
    path("token/", views.MyTokenObtainPairView.as_view(), name="token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("register/", views.RegisterView.as_view(), name="register"),
    path("dashboard/", views.dashboard, name="dashboard"),
    path("test/", views.testEndPoint, name="test"),
    # path('verify-email/<uidb64>/<token>/', verify_email, name='verify-email'),
    path('verify-email/<uidb64>/<token>/', verify_email, name='verify-email'),
    path('', views.getRoutes),
    
]