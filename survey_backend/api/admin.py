from django.contrib import admin
from .models import *

admin.site.register(Survey)
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(SurveyResponse)

