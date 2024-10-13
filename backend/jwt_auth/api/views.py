from django.shortcuts import render

from api.models import User, Profile, Livestock, Order, Notification
from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer, ProfileSerializer, LivestockSerializer, OrderSerializer, NotificationSerializer
from rest_framework import viewsets, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.db.models import Count, Sum
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination


class SalesDataView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        sales_data = Order.objects.values('created_at').annotate(total_sales=Sum('quantity'))
        return Response(sales_data)

class InventoryTrendsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        inventory_data = Livestock.objects.values('created_at').annotate(total_inventory=Sum('available_quantity'))
        return Response(inventory_data)

class CustomerInsightsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        customer_data = Customer.objects.values('date_joined').annotate(total_customers=Count('id'))
        return Response(customer_data)

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100
class LivestockViewSet(viewsets.ModelViewSet):
    queryset = Livestock.objects.all()
    serializer_class = LivestockSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'type']
    ordering_fields = ['name', 'type', 'available_quantity', 'created_at']
    pagination_class = StandardResultsSetPagination

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

class MetricsView(APIView):
    def get(self, request):
        total_livestock = Livestock.objects.count()
        pending_orders = Order.objects.filter(status='Pending').count()
        approved_orders = Order.objects.filter(status='Approved').count()

        data = {
            'totalLivestock': total_livestock,
            'pendingOrders': pending_orders,
            'approvedOrders': approved_orders,
        }
        return Response(data)
class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = ([AllowAny])
    serializer_class = RegisterSerializer
    
    
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