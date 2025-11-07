from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

from .models import ConstraintField, SportProfile
from .serializers import ConstraintFieldSerializer, SportProfileSerializer

class ConstraintFieldListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        constraints = ConstraintField.objects.all()
        serializer = ConstraintFieldSerializer(constraints, many=True)
        return Response(serializer.data)

class ConstraintFieldDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        return get_object_or_404(ConstraintField, pk=pk)

    def get(self, request, pk, format=None):
        constraint = self.get_object(pk)
        serializer = ConstraintFieldSerializer(constraint)
        return Response(serializer.data)

class SportProfileListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        if request.user.is_superuser:
            sport_profiles = SportProfile.objects.all()
        else:
            sport_profiles = SportProfile.objects.filter(user=request.user)
        
        serializer = SportProfileSerializer(sport_profiles, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        if SportProfile.objects.filter(user=request.user).exists():
            return Response(
                {"detail": "Un profil sportif existe déjà pour cet utilisateur."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        serializer = SportProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SportProfileDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        obj = get_object_or_404(SportProfile, pk=pk)
        if not self.request.user.is_superuser and obj.user != self.request.user:
            raise PermissionDenied("Vous n'avez pas la permission d'accéder à ce profil.")
        return obj

    def get(self, request, pk, format=None):
        sport_profile = self.get_object(pk)
        serializer = SportProfileSerializer(sport_profile)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        sport_profile = self.get_object(pk)
        serializer = SportProfileSerializer(sport_profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        sport_profile = self.get_object(pk)
        serializer = SportProfileSerializer(sport_profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        sport_profile = self.get_object(pk)
        sport_profile.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)