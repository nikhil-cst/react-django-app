from urllib import request
from rest_framework import serializers
from .models import *
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title', 'description']

    # def update(self, instance, request, validated_data):
    #     instance.title = validated_data.get('title', instance.title)
    #     instance.description = validated_data.get('description', instance.description)
    #     instance.save(user = self.request.user)
    #     return instance

class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField( write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['first_name','last_name', 'email', 'password']

    def validate(self, attrs):
        return super().validate(attrs)

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length = 255, min_length = 3)
    password = serializers.CharField(max_length = 16, min_length = 6, write_only = True,  style={'input_type': 'password'})
    
    class Meta:
        model = User
        fields = ['email', 'password']

    def validate(self, data):
        email = data.get('email', None)
        password = data.get('password')

        user = authenticate(email=email, password=password)

        if not user:
            raise serializers.ValidationError('This email or password is Wrong.')

        if not user.is_active:
            raise serializers.ValidationError('Your account is disabled.')

        data['user'] = user
        return data

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        
        except TokenError:
            self.fail('bad request')
