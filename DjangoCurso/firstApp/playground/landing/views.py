from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def home(request):
    print("✅ Landing Home Page Accessed")
    return HttpResponse("Welcome to the Landing Home Page!")