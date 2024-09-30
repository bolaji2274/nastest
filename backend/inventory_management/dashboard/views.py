from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import views as auth_views
from django.contrib.auth.decorators import login_required, user_passes_test
# Create your views here.

def index(request):
    return HttpResponse('This is the index page')

def staff(request):
    return HttpResponse('This is the staff pages')



def home(request):
    return render(request, 'home.html')

def services(request):
    return render(request, 'services.html')

def livestock_application(request):
    return render(request, 'livestock_application.html')

def approvals(request):
    return render(request, 'approvals.html')

def customer_info(request):
    return render(request, 'customer_info.html')

def profit_sharing(request):
    return render(request, 'profit_sharing.html')

def logout(request):
    return render(request, 'logout.html')

def login(request):
    return render(request, 'login.html')

# Optionally, you can create a custom login view if you want to add extra context or behavior
# class CustomLoginView(auth_views.LoginView):
#     template_name = 'login.html'  # Specify your custom template


@login_required
def profile(request):
    return render(request, 'profile.html')

@user_passes_test(lambda u: u.is_staff)
def admin_dashboard(request):
    return render(request, 'admin_dashboard.html')
