from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Advice, ContextWord
from .serializers import AdviceSerializer, ContextWordSerializer
from django.shortcuts import get_object_or_404

class AdviceListCreateAPIView(APIView):
    def get(self, request):
        advices = Advice.objects.all()
        serializer = AdviceSerializer(advices, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AdviceSerializer(data=request.data)
        if serializer.is_valid():
            advice = serializer.save()
            return Response(AdviceSerializer(advice).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ContextWordListAPIView(APIView):
    def get(self, request):
        context_words = ContextWord.objects.all()
        serializer = ContextWordSerializer(context_words, many=True)
        return Response(serializer.data)
