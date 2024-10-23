from django.shortcuts import render

from api.models import User, Profile, Livestock, Order, Notification, Ticket, Feedback, ProfitDistribution, ProfitSharing, FarmerCommitment
from api.serializer import MyTokenObtainPairSerializer, UserSerializer, RegisterSerializer, ProfileSerializer, LivestockSerializer, OrderSerializer, NotificationSerializer, TicketSerializer, FeedbackSerializer, ProfitDistributionSerializer, ProfitSharingSerializer, FarmerCommitmentSerializer
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


from rest_framework.views import APIView
from django.db.models import Count, Sum
from .models import Sale, Product, Profile, User
from .serializer import ProductSerializer
# Dashboard Start
class OverviewDashboardView(APIView):
   
    def get(self, request):
        # Total sales (sum of all sales)
        total_sales = Sale.objects.aggregate(Sum('total_price'))['total_price__sum'] or 0

        # New users (e.g., joined within a specific timeframe)
        new_users = User.objects.filter(date_joined__gte='2024-01-01').count() or 0

        # Total products
        total_products = Product.objects.count() or 0

        # Total orders (sales count)
        total_orders = Sale.objects.count() or 0

        # Conversion rate (orders divided by new users)
        conversion_rate = ((total_orders / new_users) * 100 if new_users > 0 else 0) or 0
        data = {
            'total_sales': total_sales,
            'new_users': new_users,
            'total_products': total_products,
            'conversion_rate': conversion_rate
        }
        # Return the response using serialized data
        return Response(data)
    
class ProductDashboardView(APIView):
    def get(self, request):
        # Total products
        total_products = Product.objects.count() or 0

        # Top selling product (product with the highest sales)
        top_selling_product = Product.objects.order_by('-sales').first()
        top_selling_product = top_selling_product.sales if top_selling_product else 0
        # Low stock products (let's define low stock as anything below 10 units)
        low_stock_products = Product.objects.filter(stock__lt=10) or 0

        # Total revenue from all products (sum of all sales total)
        total_revenue = Sale.objects.aggregate(Sum('total_price'))['total_price__sum'] or 0

        # Product list
        product_list = Product.objects.all()

        # Serialize data
        top_selling_product_serialized = ProductSerializer(top_selling_product).data if top_selling_product else None
        low_stock_products_serialized = ProductSerializer(low_stock_products, many=True).data
        product_list_serialized = ProductSerializer(product_list, many=True).data
        
        
        # Ensure any other null values in the serialized data are replaced with 0
        if top_selling_product_serialized:
            top_selling_product_serialized = {k: v if v is not None else 0 for k, v in top_selling_product_serialized.items()}

        product_list_serialized = [
            {k: v if v is not None else 0 for k, v in product.items()} for product in product_list_serialized
        ]

        # Return the response
        return Response({
            'total_products': total_products,
            'top_selling_product': top_selling_product_serialized,
            'low_stock_products': low_stock_products_serialized,
            'total_revenue': total_revenue,
            'product_list': product_list_serialized
        })

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
        customer_data = User.objects.values('date_joined').annotate(total_customers=Count('id'))
        return Response(customer_data)

class SalesAnalysisView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        sales_data = Order.objects.values('created_at').annotate(total_sales=Sum('quantity'))
        return Response(sales_data)

class CustomerAnalysisView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        customer_data = User.objects.values('date_joined').annotate(total_customers=Count('id'))
        return Response(customer_data)

class InventoryAnalysisView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        inventory_data = Livestock.objects.values('created_at').annotate(total_inventory=Sum('available_quantity'))
        return Response(inventory_data)

class PerformanceMetricsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        total_customers = User.objects.count()
        total_orders = Order.objects.count()
        total_livestock = Livestock.objects.count()

        data = {
            'total_customers': total_customers,
            'total_orders': total_orders,
            'total_livestock': total_livestock,
        }
        return Response(data)
class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100
    
class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
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
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['message', 'notification_type']
    ordering_fields = ['created_at']
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Notification.objects.all()  # Admin sees all notifications
        return Notification.objects.filter(customer=user)  # Customer sees their own notifications
class ProfitSharingViewSet(viewsets.ModelViewSet):
    queryset = ProfitSharing.objects.all()
    serializer_class = ProfitSharingSerializer

class FarmerCommitmentViewSet(viewsets.ModelViewSet):
    queryset = FarmerCommitment.objects.all()
    serializer_class = FarmerCommitmentSerializer

class ProfitDistributionViewSet(viewsets.ModelViewSet):
    queryset = ProfitDistribution.objects.all()
    serializer_class = ProfitDistributionSerializer
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
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

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