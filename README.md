# Survey Manager App with Django and React Js

#

This project is a Django web application that allows users (Survey Admin - SA) to create surveys for other users (Survey participant - SP) to complete.

- Each survey have a unique name, creation and update timestamps.
- Each Survey have at least one field under it, which will be rendered as input fields to the SP.
- For a given survey, each field added has a label and
- an attribute indicating whether the SP is required to provide an input or not.


frontend script: build_frontend_local.sh
backend script: build_backend_local.sh

`


## Final Project UI

![completed survey](https://github.com/YakubuLute/Survey-Manager/assets/25339037/0393d27b-5e27-4d0c-9d74-750ab30d92b3)
![add a survey](https://github.com/YakubuLute/Survey-Manager/assets/25339037/4ecee705-b0db-4223-87da-722c70c1bc82)
![take a survey](https://github.com/YakubuLute/Survey-Manager/assets/25339037/2d0d0393-6a72-40e8-94ac-171689c60c50)
![survey list](https://github.com/YakubuLute/Survey-Manager/assets/25339037/12d3a8af-3c60-48fb-a09f-e1a7c0b999e3)
![survey list page](https://github.com/YakubuLute/Survey-Manager/assets/25339037/c0a48aa1-5e0b-4202-85fb-511494632625)
![register page](https://github.com/YakubuLute/Survey-Manager/assets/25339037/42167076-dcf0-408a-a048-5a9995c13aed)
![login page](https://github.com/YakubuLute/Survey-Manager/assets/25339037/06653091-2a85-48aa-9741-7f8a03a85673)



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
