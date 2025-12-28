from django.http import HttpResponse, HttpResponseNotFound
from django.shortcuts import render
from django.urls import reverse

# una frase por cada día de la semana
days_of_weeks = [{'id': 'monday', 'message': 'Monday is bad'},
                 {'id': 'tuesday', 'message': 'Tuesday is better'},
                 {'id': 'wednesday', 'message': 'Wednesday is so-so'},
                 {'id': 'thursday', 'message': 'Thursday is good'},
                 {'id': 'friday', 'message': 'Friday is great'},
                 {'id': 'saturday', 'message': 'Saturday is awesome'},
                 {'id': 'sunday', 'message': 'Sunday is relaxing'}]

months = {
    "ja": "January",
    "f": "February",
    "m": "March",
    "a": "April",
    "ma": "May",
    "j": "June",
    "ju": "July",
    "ag": "August",
    "s": "September",
    "o": "October",
    "n": "November",
    "d": "December"
}

# def index(request):
#     list_items = ""
#     for day in days_of_weeks.keys():
#         day_path = reverse("day-quote", args=[day])
#         list_items += f'<li><a href="{day_path}">{day}</a></li>'
#     return HttpResponse(f"<ul>{list_items}</ul>")


def day_quote(request, day):
    message = days_of_weeks.get(day)
    if not message:
        return HttpResponseNotFound("<h1>El día no existe</h1>")
    return HttpResponse(f"<h1>{message}</h1>")


def month_of_year(request, month):
    month_year = months.get(month)
    if not month_year:
        return HttpResponseNotFound("<h1>El mes no existe</h1>")
    return HttpResponse(f"<h1>Estamos en el mes {month_year}</h1>")


def home(request):
    print("✅ Todo bien aqui")
    return render(request, "dayweek/dayweek.html", {
        "days": days_of_weeks
    })



def day_details(request, dia_detalles):
    print("✅ Detalles del día accedidos")
    return HttpResponse(f"<h1>{dia_detalles}</h1>")