from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer
from .serializers import UserCreateSerializer, UserDetailSerializer, UserDetailSerializer
from .models import CustomUser


# Create your views here.

class UserCreateView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = UserCreateSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "message": "Utilisateur créé avec succès",
                "user": UserDetailSerializer(user).data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = CustomUser.objects.get(id=request.user.id)
        serializer = UserDetailSerializer(user)
        return Response(serializer.data)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
