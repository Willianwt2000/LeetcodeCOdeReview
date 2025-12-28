from django.urls import path
from . import views

urlpatterns = [
    path('home/', views.home, name='home'),
    path('stack/<str:tools>/',views.stack_detail, name="stacks"),
]
