from django.contrib import admin
from api.models import User, Profile
from .models import Livestock, Order, Notification, Profile

# Register the Livestock model
@admin.register(Livestock)
class LivestockAdmin(admin.ModelAdmin):
    list_display = ['name', 'type', 'available_quantity']
    search_fields = ['name', 'type']

# Register the Order model
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['customer', 'livestock', 'quantity', 'status']
    search_fields = ['customer__email', 'livestock__name']

# Register the Notification model
@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ['customer', 'message', 'created_at']
    search_fields = ['customer__email', 'message']
# Register your models here.
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['email', 'farm_branch_name', 'phone_number']
    search_fields = ['email', 'farm_branch_name', 'phone_number']
class ProfileAdmin(admin.ModelAdmin):
    list_editable = ['verified']
    list_display = ['user', 'full_name', 'verified']
    

# admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)