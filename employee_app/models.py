from django.db import models

from django.contrib.auth.models import User


class DynamicForm(models.Model):
    title = models.CharField(max_length=200)

    def __str__(self):
        return self.title


class FormField(models.Model):

    FIELD_TYPES = (
        ('text', 'Text'),
        ('number', 'Number'),
        ('date', 'Date'),
        ('password', 'Password'),
    )

    form = models.ForeignKey(
        DynamicForm,
        on_delete=models.CASCADE,
        related_name='fields'
    )

    label = models.CharField(max_length=200)

    field_type = models.CharField(
        max_length=50,
        choices=FIELD_TYPES
    )

    order = models.IntegerField(default=0)

    def __str__(self):
        return self.label


class Employee(models.Model):

    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,null=True,blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Employee {self.id}"


class EmployeeFieldValue(models.Model):

    employee = models.ForeignKey(
        Employee,
        on_delete=models.CASCADE,
        related_name='values'
    )

    field = models.ForeignKey(
        FormField,
        on_delete=models.CASCADE
    )

    value = models.TextField()

    def __str__(self):
        return self.value