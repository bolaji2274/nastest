from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db.models.signals import post_save
# Create your models here.

class User(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=100)
    first_name = models.CharField(max_length=155)
    last_name = models.CharField(max_length=155)
    farm_branch_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    
    groups = models.ManyToManyField(Group, related_name='customer_groups')
    user_permissions = models.ManyToManyField(Permission, related_name='customer_permissions')
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


class Livestock(models.Model):
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    available_quantity = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    

class Order(models.Model):
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    livestock = models.ForeignKey(Livestock, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    status = models.CharField(max_length=50)

class Notification(models.Model):
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    
    full_name = models.CharField(max_length=250)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    bio = models.CharField(max_length=100)
    image = models.ImageField(default='default.jpg', upload_to='user_images')
    verified = models.BooleanField(default=False)
    farm_branch_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    
    def __str__(self):
        return self.full_name
    
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
    
post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)