from rest_framework import routers, serializers, viewsets
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.models import User
from . import validations

from .models import Survey, SurveyResponse


UserModel = get_user_model()

#  Auth serializer

class UserRegisterSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = "__all__"
		
	def create(self, valid_data):
		user_obj = UserModel.objects.create_user(email=valid_data['email'], password=valid_data['password'],username = valid_data['username'])
		# user_obj.username = valid_data['username']
		user_obj.save()
		return user_obj

class UserLoginSerializer(serializers.Serializer):
	username = serializers.CharField()
	password = serializers.CharField()
	##
	def check_user(self, valid_data):
		user = authenticate(username=valid_data['username'], password=valid_data['password'])
		if not user:
			raise validations.ValidationError('user not found')
		return user

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = ('username','email')


# Serializer for survey
class SurveySerializer(serializers.ModelSerializer):
     class Meta:
        model = Survey
        fields = "__all__"


class AnswersSerializer(serializers.ModelSerializer):
    class Meta:
        model = SurveyResponse
        fields = ('survey_id', 'data')


class PublishedSurveySerializer(serializers.ModelSerializer):
    class Meta:
        model = Survey
        fields = ('survey_title', 'data', 'owner', 'isActive',)
