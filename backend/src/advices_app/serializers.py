from rest_framework import serializers
from .models import Advice, ContextWord

class ContextWordSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContextWord
        fields = ['id', 'word']

class AdviceSerializer(serializers.ModelSerializer):
    context = ContextWordSerializer(many=True, read_only=True)
    context_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=ContextWord.objects.all(),
        write_only=True
    )

    class Meta:
        model = Advice
        fields = ['id', 'message', 'context', 'context_ids']

    def create(self, validated_data):
        context_words = validated_data.pop('context_ids', [])
        advice = Advice.objects.create(**validated_data)
        advice.context.set(context_words)
        return advice
