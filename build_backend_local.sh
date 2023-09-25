#!/bin/bash
# to run the backend locally without docker 
PWDIR="${PWD}"
cd survey_backend

pip install -r requirements.txt 
python manage.py makemigrations
python manage.py migrate
python manage.py runserver 
