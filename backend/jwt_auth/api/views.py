from django.shortcuts import render

from api.models import User
from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = ([AllowAny])
    serializer_class = RegisterSerializer
    
    # New code for email verification start
    # def perform_create(self, serializer):
    #     user = serializer.save()
    #     user.is_active = False  # Make sure user is inactive until email is verified
    #     user.save()
        
    #     # Send verification email
    #     send_verification_email(self.request, user)
    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)

    #     # Create user but set is_active to False
    #     user = serializer.save(is_active=False)

        # Send the email verification after registration
        # send_verification_email(user=user, request=request)  # Make sure to pass 'request' to build URLs

        # return Response(
        #     {"detail": "Registration successful! Please verify your email to activate your account."},
        #     status=status.HTTP_201_CREATED
        # )
        
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
        # data = f"Congratulation {request.user}, your API just responded to GET request"
        data = f"Congratulation {request.user}, you just login to your dashboard"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = "Hello buddy"
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)