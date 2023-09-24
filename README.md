# Survey Manager App with Django and React Js

#

This project is a Django web application that allows users (Survey Admin - SA) to create surveys for other users (Survey participant - SP) to complete.

- Each survey have a unique name, creation and update timestamps.
- Each Survey have at least one field under it, which will be rendered as input fields to the SP.
- For a given survey, each field added has a label and
- an attribute indicating whether the SP is required to provide an input or not.

## Final Project UI

path: `/survey_c![survey list page](https://github.com/YakubuLute/SM-TEST/assets/25339037/7228fe62-6ba4-46d0-a61f-83c72367fd5a)
![register page](https://github.com/YakubuLute/SM-TEST/assets/25339037/917773ed-b368-4a93-9afa-be19b43df332)
![login page](https://github.com/YakubuLute/SM-TEST/assets/25339037/38b95e78-72ab-4486-acbc-61f48f3ab491)
![completed survey](https://github.com/YakubuLute/SM-TEST/assets/25339037/3ae008a2-3a3f-44bc-819a-88f24f4c0c95)
![add a survey](https://github.com/YakubuLute/SM-TEST/assets/25339037/63b3c403-f9a0-422d-966c-b5211896ca55)
![take a survey](https://github.com/YakubuLute/SM-TEST/assets/25339037/e42e5b1d-54b9-4aca-8dc8-020cb639d613)
![survey list](https://github.com/YakubuLute/SM-TEST/assets/25339037/2a5b5c0a-b92a-41af-8913-5695538d8b91)
lient/final ui/`


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
