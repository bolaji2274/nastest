from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path, include
from api import views 
from .views import LivestockViewSet, OrderViewSet, NotificationViewSet, ProfileViewSet, MetricsView
from .views import SalesDataView, InventoryTrendsView, CustomerInsightsView


from rest_framework.routers import DefaultRouter


router = DefaultRouter()
# router.register(r'customers', CustomerViewSet)
router.register(r'livestock', LivestockViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'notifications', NotificationViewSet)
router.register(r'profiles', ProfileViewSet)


urlpatterns = [
    # path("api/",),
    path("token/", views.MyTokenObtainPairView.as_view(), name="token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("register/", views.RegisterView.as_view(), name="register"),
    path("test/", views.testEndPoint, name="test"),
    path('metrics/', MetricsView.as_view(), name='metrics'),
    # path("cregister/", CustomerRegistrationView.as_view(), name='customer-registration'),
    # path('login/', CustomerLoginView.as_view(), name='customer_login'),
    # path('ctoken/', CustomTokenObtainPairView.as_view(), name='customer-token'),
    # path('/livestock', LivestockViewSet.as_view(), name='livestock'),
    # path('/order', OrderViewSet.as_view(), name='order'),
    # path('/notification', NotificationViewSet.as_view(), name='notification'),
    path('', include(router.urls)),
    path('', views.getRoutes), 
]
