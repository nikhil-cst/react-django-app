from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from .serializers import *
from .models import Note
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from django.contrib.auth import login
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.fields import CurrentUserDefault
import json

class NoteList(generics.ListAPIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes =[JWTAuthentication, ]
    serializer_class = NoteSerializer

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)

class NoteCreate(generics.GenericAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [JWTAuthentication, ]

    def post(self, request):
        serializer = self.serializer_class(data = request.data)
        serializer.is_valid(raise_exception = True)
        serializer.save(user = self.request.user)

        user_data = serializer.data
        return Response(user_data, status = status.HTTP_201_CREATED)

class NoteDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [JWTAuthentication, ]
    serializer_class = NoteSerializer

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)

class Signup(generics.GenericAPIView):
    serializer_class = SignupSerializer

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data = user)
        serializer.is_valid(raise_exception = True)
        serializer.save()

        user_data = serializer.data
        return Response(user_data, status = status.HTTP_201_CREATED)

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        data = request.data
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]

        if not user:
            raise AuthenticationFailed('Invalid credentials')

        if user is not None:
            refresh = RefreshToken.for_user(user)
            login(request, user)

            return Response({'userData':serializer.data, 'refreshToken' : str(refresh), 'accessToken' : str(refresh.access_token)}, status = status.HTTP_200_OK)

        return Response(serializer.data, status = status.HTTP_200_OK)

class LogoutView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = LogoutSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception = True)
        serializer.save()
        return Response({'message': 'User successfully logged out'}, status= status.HTTP_200_OK)
