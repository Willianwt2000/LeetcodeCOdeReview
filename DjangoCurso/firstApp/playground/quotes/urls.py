from django.urls import path
from . import views

urlpatterns = [
    path("home/", views.home, name="days-home"),
    path("dias_detalles/<str:dia_detalles>/", views.day_details, name="days_details"),
    path("days/<str:day>/", views.day_quote, name="day-quote"),
    path("months/<str:month>/", views.month_of_year, name="month"),
]
