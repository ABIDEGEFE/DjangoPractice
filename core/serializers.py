from rest_framework import serializers
from .models import User
# from .models import Student


# class StudentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Student
#         fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password']
        # extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            name=validated_data['name'],
            # is_licensed=validated_data.get('is_licensed', False),
            # status=validated_data.get('status', 'none'),
            # wins=validated_data.get('wins', 0)
        )
        user.set_password(validated_data['password']) # Hash the password
        user.save()
        return user