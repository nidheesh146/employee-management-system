from django.urls import path
from  . import views 
from .views import DynamicFormView,EmployeeView

urlpatterns = [
    path('forms/',DynamicFormView.as_view()),
    path('',EmployeeView.as_view()),
    path('<int:pk>/', EmployeeView.as_view()),

]
