# Survey Manager App with Django and React Js

#

This project is a Django web application that allows users (Survey Admin - SA) to create surveys for other users (Survey participant - SP) to complete.

- Each survey have a unique name, creation and update timestamps.
- Each Survey have at least one field under it, which will be rendered as input fields to the SP.
- For a given survey, each field added has a label and
- an attribute indicating whether the SP is required to provide an input or not.

## Final Project UI

path: `/survey_client/final ui/`

## Technologies/Programming Languages Used (Backend)

- Python
- Django
- Django rest framework.
- Postgres
- django-cors-headers

# Check the requirement.txt file to know the exact versions and packages used

## Technologies/Programming Languages Used (FrontEnd)

- React JS
- axios
- styledcomponents
- react-toastify
- use-state-with-callback
- materialize-css
- react-fetch-hook

# Check the package.json file to know the exact versions and packages used

## Run Application

Exexute this command to get app running in a docker

```
docker-compose build
docker-compose up
```

## Run The Backend App

To run the backend, `cd` into the project directory and run the commands below:

```
virtualenv -p python env
source env/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

 -- `cd` to the survey_client
 run this commands
 1. npm install
 2. npm start

```

# DJANGO URLS TO ACCESS THE BACKEND

BASE_URL = http://localhost:8000/api

1. To register an account

- URL = `{BASE_URL}/auth/register`
- Method = POST
- Body Params =
  { "username": "username", "email":"email", "password" : "password", "password2" : "password2" }

2. To login

   - URL = `{BASE_URL}/auth/login`
   - Method = POST
   - Body Params =
     { "username": "username", "email":"email", "password" : "password" }

3. To Fetch all available surveys

   - URL = `{BASE_URL}/survey-list`
   - Method = GET

4. To Add a survey

   - URL = `{BASE_URL}/add-survey`
   - Method = POST
   - Body Params =
     {
     " survey_title":"Survey Ttitle",
     " detail" :"Survey Details",
     "isActive": "Bolean e.g True",
     "date_create":"10-10-10",
     "time_created":" "
     "choices" : "text, number, Option, CheckBox, File, image" }

5. To delete a particular survey

   - URL = `{BASE_URL}/delete-survey/survey_id_here`
   - Method = DELETE
   - Body Params = {survey_id = survey id }

6. To edit a particular survey

   - URL = `{BASE_URL}/edit-survey/survey_id_here`
   - Method = POST
   - Body Params = {survey_id = survey id }

7. To list a response from a particular survey

   - URL = `{BASE_URL}/survey-response/survey_id_here`
   - Method = GET

8. To get a detail on a particular survey

   - URL = `{BASE_URL}/survey-details/survey_id_here`
   - Method = GET
