from django.urls import path
from .views import AdviceListCreateAPIView, ContextWordListAPIView

urlpatterns = [
    path('advice/', AdviceListCreateAPIView.as_view(), name='advice-list-create'),
    path('context-words/', ContextWordListAPIView.as_view(), name='contextword-list'),
]
