from api.models import User, Profile

from django.contrib.auth import authenticate

from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email']
        
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        
        token['username'] = user.username
        token['email'] = user.email
        token['full_name'] = user.profile.full_name
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
        fields = ['email', 'username', 'password', 'password2']
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
        user = User.objects.create(
            username = validated_data['username'], 
            email = validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        
        return user