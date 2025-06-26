from rest_framework import serializers
from .models import ConstraintField, SportProfile
from user_account.models import CustomUser


class ConstraintFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConstraintField
        fields = ['id', 'name', 'slug']
        read_only_fields = ['slug']


class SportProfileSerializer(serializers.ModelSerializer):
    display_constraints = ConstraintFieldSerializer(source='constraints', many=True, read_only=True)
    constraints = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=ConstraintField.objects.all(),
        write_only=True
    )
    user_username = serializers.CharField(source='user.user_name', read_only=True)

    class Meta:
        model = SportProfile
        fields = [
            'id', 'user', 'user_username', 'age', 'goals', 'level_user',
            'constraints', 'display_constraints'
        ]
        read_only_fields = ['user']