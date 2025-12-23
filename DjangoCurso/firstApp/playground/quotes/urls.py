from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("days/<str:day>/", views.day_quote, name="day-quote"),
    path("months/<str:month>/", views.month_of_year, name="month"),
]
