from django.http import HttpResponse, HttpResponseNotFound
from django.urls import reverse

days_of_weeks = {
    "lunes": "Hoy es Lunes",
    "martes": "Hoy es Martes",
    "miercoles": "Hoy es Miércoles",
    "jueves": "Hoy es Jueves",
    "viernes": "Hoy es Viernes",
    "sabado": "Hoy es Sábado",
    "domingo": "Hoy es Domingo"
}

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

def index(request):
    list_items = ""
    for day in days_of_weeks.keys():
        day_path = reverse("day-quote", args=[day])
        list_items += f'<li><a href="{day_path}">{day}</a></li>'
    return HttpResponse(f"<ul>{list_items}</ul>")


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
