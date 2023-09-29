from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.viewsets import ReadOnlyModelViewSet, ModelViewSet
from rest_framework import permissions

from ..serializers import SurveySerializer,PublishedSurveySerializer, AnswersSerializer
from django.contrib.auth.models import User
from ..models import Survey, SurveyResponse
from django.contrib.auth.models import User
from django.http import JsonResponse



# function views
@api_view(['GET'])
def surveyList(request):
	surveys = Survey.objects.all()
	serializer = SurveySerializer(surveys, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def surveyDetail(request, pk):
	survey = Survey.objects.get(id=pk)
	serializer = SurveySerializer(survey, many=False)
	return Response(serializer.data)


@api_view(['POST'])
def surveyCreate(request):
	serializer = SurveySerializer(data=request.data)
	if serializer.is_valid():
		serializer.create(serializer.data)

	return Response({"status": "success", "data": serializer.data})

@api_view(['POST'])
def surveyUpdate(request, pk):
	survey = Survey.objects.get(id=pk)
	serializer = SurveySerializer(instance=survey, data=request.data)
	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)


@api_view(['DELETE'])
def surveyDelete(request, pk):
	survey = Survey.objects.get(id=pk)
	survey.delete()
	return Response('Item succsesfully delete!')

# Class views 
class AnswersViewset(ModelViewSet):
    serializer_class = AnswersSerializer
    def get_queryset(self):
        return Survey.objects.all()
	

# Submit a response to a survey
class SubmitSurveyResponseView(APIView):
    permission_classes = (permissions.AllowAny)
    def post(self, request, survey_id):
        try:
            survey = Survey.objects.get(id=survey_id)
        except Survey.DoesNotExist:
            return Response({"error": "Survey not found"})

        response_data = {
            "survey": survey.id,
            "participant": request.user.id, 
            "data": request.data 
        }

        serializer = AnswersSerializer(data=response_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
