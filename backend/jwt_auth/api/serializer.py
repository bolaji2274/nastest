from api.models import User, Profile, Livestock, Order, Notification, Ticket, Feedback, ProfitSharing, ProfitDistribution, FarmerCommitment

from django.contrib.auth import authenticate

from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'farm_branch_name', 'email', 'phone_number']
        
class ProfitSharingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfitSharing
        fields = '__all__'

class FarmerCommitmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = FarmerCommitment
        fields = '__all__'

class ProfitDistributionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfitDistribution
        fields = '__all__'
class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'
class LivestockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Livestock
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
        
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
 
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        
        token['username'] = user.username
        token['email'] = user.email
        token['full_name'] = user.profile.full_name
        token['first_name'] = user.profile.first_name
        token['last_name'] = user.profile.last_name
        token['farm_branch_name'] = user.profile.farm_branch_name 
        token['phone_number'] = user.profile.phone_number
        token['bio'] = user.profile.bio
        token['image'] = str(user.profile.image)
        token['verified'] = user.profile.verified
        
        return token
    def validate(self, attrs):
        try:
            user = User.objects.get(email=attrs['email'])
        except User.DoesNotExist:
            raise serializers.ValidationError({"email": "No user found with this email."})
    
        
        # Authenticate using username and password
        authentication_kwargs = {
            'username': user.email,
            'password': attrs['password'],
        }
        user = authenticate(**authentication_kwargs)

        if user is None:
            raise serializers.ValidationError({"password": "Incorrect password."})
                #  start here
        if not user.is_active:
            raise serializers.ValidationError({"email": "Please verify your email before logging in."})
        #  stop here
        # If the email and password are valid, return the token
        return super().validate(attrs)
    

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    password2 = serializers.CharField(write_only = True, required = True)
    
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'farm_branch_name', 'email', 'phone_number', 'password', 'password2']
     # Add validation to check if the email already exists
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value
        
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields does not match"}
            )
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            farm_branch_name=validated_data['farm_branch_name'],
            phone_number=validated_data['phone_number'],
            password=validated_data['password']
        )
        
        return user