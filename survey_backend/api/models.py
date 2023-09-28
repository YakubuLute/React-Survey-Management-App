from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import User
import uuid
from django.utils.text import slugify
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
import logging

LOGGER = logging.getLogger(__name__)

class Survey(models.Model):
    isActive = models.BooleanField(default=False)
    isClosed = models.BooleanField(default=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, default="master")
    survey_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    survey_title = models.CharField(max_length=255)
    date_created = models.DateTimeField(auto_now_add=True)
    time_created = models.TimeField(auto_now=True)
    detail = models.TextField()
    class Meta:
        verbose_name_plural = "Surveys"
        ordering = ['-date_created']

    def __str__(self):
        return  self.survey_title[0:10]+ "... created by " + self.owner.username


class SurveyResponse(models.Model):
    survey_id = models.ForeignKey(Survey, on_delete=models.CASCADE)
    date = models.DateField(default=timezone.now)
    time = models.TimeField(default=timezone.now)
    data = models.TextField(max_length=400)
    user=models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    # FOr users who have not register we will use the ip address as the user
    unregistered_user=models.URLField(null=True, blank=True)
    
    class Meta:
        verbose_name_plural = "Survey Responses"
        ordering = ('-date',)

    def __str__(self):
        return str(self.data)[0:3]


# FOr survey questions questions

CHOICES_HELP_TEXT = _(
    """The choices field is only used if the question type
      is 'radio', 'select', or
'select multiple' provide a comma-separated list of
options for this question ."""
)


def validate_choices(choices):
    """Verifies that there is at least two choices in choices
    :param String choices: The string representing the user choices.
    """
    values = choices.split(settings.CHOICES_SEPARATOR)
    empty = 0
    for value in values:
        if value.replace(" ", "") == "":
            empty += 1
    if len(values) < 2 + empty:
        msg = "The selected field requires an associated list of choices."
        msg += " Choices must contain more than one item."
        raise ValidationError(msg)


class Question(models.Model):
    TEXT = "text"
    SHORT_TEXT = "textarea"
    RADIO = "radio"
    SELECT = "select"
    SELECT_IMAGE = "File[type='image']"
    FILE = "File"
    SELECT_MULTIPLE = "select-multiple"
    NUMBER = "number"
    DATE = "date"

    QUESTION_TYPES = (
        (TEXT, _("text (multiple line)")),
        (SHORT_TEXT, _("short text (one line)")),
        (RADIO, _("radio")),
        (SELECT, _("select")),
        (SELECT_MULTIPLE, _("Select Multiple")),
        (SELECT_IMAGE, _("Select Image")),
        (FILE, _("File")),
        (NUMBER, _("number")),
        (DATE, _("date")),
    )

    text = models.TextField(_("Text"))
    required = models.BooleanField(_("Required"))
    survey = models.ForeignKey(Survey, on_delete=models.CASCADE, verbose_name=_("Survey"), related_name="questions")
    type = models.CharField(_("Type"), max_length=200, choices=QUESTION_TYPES, default=TEXT)
    choices = models.TextField(_("Choices"), blank=True, null=True, help_text=CHOICES_HELP_TEXT)

    class Meta:
        verbose_name = "Question"
        verbose_name_plural = "Questions"
        

    def save(self, *args, **kwargs):
        if self.type in [Question.RADIO, Question.SELECT, Question.SELECT_MULTIPLE]:
            validate_choices(self.choices)
        super().save(*args, **kwargs)

    def get_clean_choices(self):
        """Return split and stripped list of choices with no null values."""
        if self.choices is None:
            return []
        choices_list = []
        for choice in self.choices.split(settings.CHOICES_SEPARATOR):
            choice = choice.strip()
            if choice:
                choices_list.append(choice)
        return choices_list

    @property
    def answers_as_text(self):
        """Return answers as a list of text.

        :rtype: List"""
        answers_as_text = []
        for answer in self.answers.all():
            for value in answer.values:
                answers_as_text.append(value)
        return answers_as_text
    

    def __str__(self):
        return self.text[0:20]


class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, verbose_name=_("Question"), related_name="answers")
    response = models.ForeignKey(SurveyResponse, on_delete=models.CASCADE, verbose_name=_("Response"), related_name="answers")
    created = models.DateTimeField(_("Creation date"), auto_now_add=True)
    updated = models.DateTimeField(_("Update date"), auto_now=True)
    body = models.TextField(_("Content"), blank=True, null=True)

    def __init__(self, *args, **kwargs):
        try:
            question = Question.objects.get(pk=kwargs["question_id"])
        except KeyError:
            question = kwargs.get("question")
        body = kwargs.get("body")
        if question and body:
            self.check_answer_body(question, body)
        super().__init__(*args, **kwargs)

    @property
    def values(self):
        if self.body is None:
            return [None]
        if len(self.body) < 3 or self.body[0:3] != "[u'":
            return [self.body]
        values = []
        raw_values = self.body.split("', u'")
        nb_values = len(raw_values)
        for i, value in enumerate(raw_values):
            if i == 0:
                value = value[3:]
            if i + 1 == nb_values:
                value = value[:-2]
            values.append(value)
        return values

    def check_answer_body(self, question, body):
        if question.type in [Question.RADIO, Question.SELECT, Question.SELECT_MULTIPLE]:
            choices = question.get_clean_choices()
            self.check_answer_for_select(choices, body)
        if question.type == Question.INTEGER and body and body != "":
            try:
                body = int(body)
            except ValueError:
                msg = "Answer is not an integer"
                raise ValidationError(msg)
        if question.type == Question.FLOAT and body and body != "":
            try:
                body = float(body)
            except ValueError:
                msg = "Answer is not a number"
                raise ValidationError(msg)

    def check_answer_for_select(self, choices, body):
        answers = []
        if body:
            if body[0] == "[":
                for i, part in enumerate(body.split("'")):
                    if i % 2 == 1:
                        answers.append(part)
            else:
                answers = [body]
        for answer in answers:
            if answer not in choices:
                msg = f"Wrong Answer '{body}'"
                msg += f" should be in {choices} "
                raise ValidationError(msg)

    def __str__(self):
        return f"{self.__class__.__name__} to '{self.question}' : '{self.body}'"


