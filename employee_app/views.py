from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny
from .models import DynamicForm, Employee
from .serializers import (
    DynamicFormSerializer,
    EmployeeSerializer
)


class DynamicFormView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        forms = DynamicForm.objects.all()

        serializer = DynamicFormSerializer(forms, many=True)

        return Response(serializer.data)

    def post(self, request):

        serializer = DynamicFormSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save()

            return Response({
                'message': 'Form created'
            })

        return Response(serializer.errors)


class EmployeeView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None):

        search = request.GET.get('search')

        if pk:

            employee = get_object_or_404(Employee, id=pk)

            serializer = EmployeeSerializer(employee)

            return Response(serializer.data)

        if search:

            employees = Employee.objects.filter(
                values__value__icontains=search
            ).distinct()

        else:

            employees = Employee.objects.all()

        serializer = EmployeeSerializer(
            employees,
            many=True
        )

        return Response(serializer.data)
    def post(self, request):

        serializer = EmployeeSerializer(
            data=request.data,
            context={'request': request}
        )

        if serializer.is_valid():

            serializer.save()

            return Response({
                'message': 'Employee created'
            })

        return Response(serializer.errors)
    
    def delete(self, request, pk):

        employee = get_object_or_404(Employee, id=pk)

        employee.delete()

        return Response({
            'message': 'Employee deleted'
        })
    def put(self, request, pk):

        employee = get_object_or_404(Employee, id=pk)

        serializer = EmployeeSerializer(
            employee,
            data=request.data,
            context={'request': request}
        )

        if serializer.is_valid():

            serializer.save()

            return Response({
                'message': 'Employee updated'
            })

        return Response(serializer.errors)
        
        


