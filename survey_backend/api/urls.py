from . import views
from django.urls import path, include
from django.contrib.auth.models import User
from .views import *
from rest_framework import routers, serializers, viewsets
from api.survey_views.views import *


# user list
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
	path('auth/register', UserRegister.as_view(), name='register'),
	path('auth/login', UserLogin.as_view(), name='login'),
	path('auth/logout', UserLogout.as_view(), name='logout'),
	path("auth/", include(router.urls)),
    # 
    # survey urls
	path('survey-list', surveyList, name='survey_listing'),
	path('add-survey', surveyCreate, name='add_survey'),
	path('delete-survey/<str:pk>', surveyDelete, name='remove_survey'),
	path('edit-survey/<str:pk>', surveyUpdate, name='edit_survey'),
	path('survey-details/<str:pk>', surveyDetail, name='survey_details'),
	path('survey-response/<str:pk>', SubmitSurveyResponseView.as_view(), name='survey_response'),
]