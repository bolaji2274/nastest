from django.shortcuts import render

from api.models import Profile, User
from api.serializer import UserSerializer, MyTokenObtainPairSerializer, RegisterSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response


# Create your views here.

# New code for email verification start

# from django.core.mail import send_mail
# from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
# from django.utils.encoding import force_bytes
# from django.template.loader import render_to_string
# from django.contrib.sites.shortcuts import get_current_site
# from django.contrib.auth.tokens import default_token_generator
# from django.core.mail import EmailMessage

# # Function to send email verification
# def send_verification_email(request, user):
#     token = default_token_generator.make_token(user)
#     uid = urlsafe_base64_encode(force_bytes(user.pk))
#     current_site = get_current_site(request)
    
#     # Build verification URL
#     verification_url = f"http://{current_site.domain}/verify-email/{uid}/{token}/"
    
#     # Email subject and message
#     subject = 'Verify Your Email Address'
#     message = render_to_string('email_verification_template.html', {
#         'user': user,
#         'verification_url': verification_url,
#     })
    
#     email = EmailMessage(subject=subject, body=message, to=[user.email])
#     email.content_subtype = 'html'  # This ensures the email is sent as HTML
#     email.send()
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.shortcuts import get_current_site

# Function to send email verification
def send_verification_email(user, request):
    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    current_site = get_current_site(request)
    
    # Build verification URL
    # verification_url = f"http://{current_site.domain}/verify-email/{uid}/{token}/"
    verification_url = f"http://{current_site.domain}/verify-email/{uid}/{token}/"
    
    # Email subject and message
    subject = 'Verify Your Email Address'
    message = render_to_string('email_verification_template.html', {
        'user': user,
        'verification_url': verification_url,
    })
    
    # Sending HTML email
    email = EmailMessage(subject=subject, body=message, to=[user.email])
    email.content_subtype = 'html'  # This ensures the email is sent as HTML
    email.send()

    # # Send email
    # send_mail(
    #     subject,
    #     message,
    #     'hammedbolajihammed@gmail.com',
    #     [user.email],
    #     fail_silently=False,
    # )

        # stop here

        # start here 
        
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import messages

def verify_email(request, uidb64, token):
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        user.is_active = True  # Activate the user
        user.save()
        messages.success(request, 'Your account has been activated successfully!')
        return redirect('login')  # Redirect to login page after successful verification
    else:
        messages.error(request, 'The confirmation link is invalid or has expired.')
        return redirect('register')  # Redirect back to registration in case of failure
    # stop here 
    
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    # queryset = User.objects.all()
    permission_classes = ([AllowAny])
    serializer_class = RegisterSerializer
    
    # New code for email verification start
    # def perform_create(self, serializer):
    #     user = serializer.save()
    #     user.is_active = False  # Make sure user is inactive until email is verified
    #     user.save()
        
    #     # Send verification email
    #     send_verification_email(self.request, user)
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Create user but set is_active to False
        user = serializer.save(is_active=False)

        # Send the email verification after registration
        send_verification_email(user=user, request=request)  # Make sure to pass 'request' to build URLs

        return Response(
            {"detail": "Registration successful! Please verify your email to activate your account."},
            status=status.HTTP_201_CREATED
        )
        
        # stop here
    
# Get All Routes

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/'
    ]
    return Response(routes)


    
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])

def dashboard(request):
    if request.method == 'GET':
        context = f"Hey {request.user}, You are seeing a GET response"
        return Response({'response': context}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = request.POST.get('text')
        context = f"Hey ! {request.user}, your text is {text}"
        return Response({'response': context}, status=status.HTTP_200_OK)
    return Response({}, status=status.HTTP_400_BAD_REQUEST)
        
        
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = "Hello buddy"
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)