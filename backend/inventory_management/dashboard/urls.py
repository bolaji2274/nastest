from django.urls import path
from django.contrib.auth import views as auth_views
from . import views
# from .views import CustomLoginView

# urlpatterns = [
#     path('login/', CustomLoginView.as_view(), name='login'),
#     path('logout/', auth_views.LogoutView.as_view(template_name='logout.html'), name='logout'),
# ]

urlpatterns = [
    # path('', views.index, name='index'),
    # path('logout/', auth_views.LogoutView.as_view(template_name='logout.html'),
    path('staff/', views.staff, name='staff'),
    path('', views.home, name='home'),
    path('services/', views.services, name='services'),
    path('livestock-application/', views.livestock_application, name='livestock_application'),
    path('approvals/', views.approvals, name='approvals'),
    path('customer-info/', views.customer_info, name='customer_info'),
    path('profit-sharing/', views.profit_sharing, name='profit_sharing'),
    path('profile/', views.profile, name='profile'),
    path('admin-dashboard/', views.admin_dashboard, name='admin_dashboard'),
    path('logout/', views.logout, name='logout'),
    path('login/', views.login, name='login'),
]

# urlpatterns = [
#     path('logout/', auth_views.LogoutView.as_view(template_name='logout.html'), name='logout'),
# ]