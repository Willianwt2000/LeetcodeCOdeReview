from django.http import HttpResponse, HttpResponseNotFound,Http404
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




def day_quote(request, day):
    try:
        message = days_of_weeks[day]  # acceso directo
        return HttpResponse(f"<h1>{message}</h1>")
    except KeyError:
        return render(request, "dayweek/404.html", {
            "days": days_of_weeks
        }, status=404 )


def month_of_year(request, month):
    month = month.lower()  # normaliza el parámetro

    try:
        month_year = months[month]
        return render(request, "dayweek/yearmonths.html", {
            "month_name": month_year
        })
    except KeyError:
        return render(request, "dayweek/404.html", status=404)



def home(request):
    print("✅ Todo bien aqui")
    return render(request, "dayweek/dayweek.html", {
        "days": days_of_weeks
    })



def day_details(request, dia_detalles):
    print("✅ Detalles del día accedidos")
    return HttpResponse(f"<h1>{dia_detalles}</h1>")


def is_2026(request, anio_detalles):
    print("✅ Detalles del año 2026")
    if anio_detalles != "2026":
        return render(request, "dayweek/404.html", status=404)
    else:
        print(anio_detalles)
        return render(request, "dayweek/2026.html")


def prueba(request,prueba):
    try:
        if prueba != "boton":
            print(prueba)
            return HttpResponse(prueba)
    except AttributeError:
        return render(request, "dayweek/prueba.html")


