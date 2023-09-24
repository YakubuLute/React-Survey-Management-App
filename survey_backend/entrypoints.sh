#!/bin/bash

set -o errexit

python manage.py makemigrations
python manage.py migrate 
gunicorn survey_project.wsgi:application --bind 0.0.0.0:8000