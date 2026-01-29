from django.shortcuts import render
from django.http import HttpResponse
from datetime import date

# Create your views here.
def home(request):
    today = date.today()
    print("✅ Landing Home Page Accessed")
    stack = [{'id': 'python', 'name': 'Python'}, {'id': 'php', 'name': 'Php'}, {'id': 'js', 'name': 'JavaScript'}, {'id': 'react', 'name': 'React'}]

    return render(request, 'landing/landing.html', {
        "name": "Ricardo",
        "today": today,
        "age": 30,
        "stacks": stack
    })

def stack_detail(request, tools):
    return HttpResponse(f"This is the detail page for the tool: {tools}")