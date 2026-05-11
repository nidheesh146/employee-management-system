from rest_framework import serializers
from .models import DynamicForm, FormField


class FormFieldSerializer(serializers.ModelSerializer):

    class Meta:
        model = FormField
        exclude = ['form']


class DynamicFormSerializer(serializers.ModelSerializer):

    fields = FormFieldSerializer(many=True)

    class Meta:
        model = DynamicForm
        fields = ['id', 'title', 'fields']

    def create(self, validated_data):

        fields_data = validated_data.pop('fields')

        form = DynamicForm.objects.create(**validated_data)

        for field in fields_data:

            FormField.objects.create(
                form=form,
                **field
            )

        return form
    
    
from .models import Employee, EmployeeFieldValue


class EmployeeFieldValueSerializer(serializers.ModelSerializer):

    label = serializers.CharField(
        source='field.label',
        read_only=True
    )

    class Meta:
        model = EmployeeFieldValue
        fields = ['field', 'label', 'value']

class EmployeeSerializer(serializers.ModelSerializer):

    values = EmployeeFieldValueSerializer(many=True)

    class Meta:
        model = Employee
        fields = ['id', 'values']

    def create(self, validated_data):

        values_data = validated_data.pop('values')

        user = self.context['request'].user

        employee = Employee.objects.create()

        for item in values_data:

            EmployeeFieldValue.objects.create(
                employee=employee,
                field=item['field'],
                value=item['value']
            )

        return employee
    
    def update(self, instance, validated_data):

        values_data = validated_data.pop('values')

        for item in values_data:

            field = item['field']

            value = item['value']

            employee_value = EmployeeFieldValue.objects.filter(
                employee=instance,
                field=field
            ).first() 

            if employee_value:

                employee_value.value = value
                employee_value.save()

        return instance