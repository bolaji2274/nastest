from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path, include
from api import views 
from .views import UserViewSet, LivestockViewSet, OrderViewSet, NotificationViewSet, ProfileViewSet, MetricsView
from .views import TicketViewSet, FeedbackViewSet, FarmerCommitmentViewSet, ProfitSharingViewSet, ProfitDistributionViewSet
from .views import SalesAnalysisView, CustomerAnalysisView, PerformanceMetricsView


from rest_framework.routers import DefaultRouter


router = DefaultRouter()
# router.register(r'customers', CustomerViewSet)
router.register(r'livestock', LivestockViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'notifications', NotificationViewSet)
router.register(r'profiles', ProfileViewSet)
router.register(r'tickets', TicketViewSet)
router.register(r'customers', UserViewSet)
router.register(r'feedback', FeedbackViewSet)
router.register(r'profit-sharing', ProfitSharingViewSet)
router.register(r'farmer-commitments', FarmerCommitmentViewSet)
router.register(r'profit-distributions', ProfitDistributionViewSet)


urlpatterns = [
    # path("api/",),
    path("token/", views.MyTokenObtainPairView.as_view(), name="token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("register/", views.RegisterView.as_view(), name="register"),
    path("test/", views.testEndPoint, name="test"),
    path('metrics/', MetricsView.as_view(), name='metrics'),
    path('sales-analytics/', SalesAnalysisView.as_view(), name='sales-analytics'),
    path('customer-analytics/', CustomerAnalysisView.as_view(), name='customer-analytics'),
    path('operational-performance/', PerformanceMetricsView.as_view(), name='operational-performance'),
    path('', include(router.urls)),
    path('route/', views.getRoutes), 
]
