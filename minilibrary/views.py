from django.shortcuts import render
from django.http import HttpResponse
from .models import Book
from django.db.models import Q
from django.core.paginator import Paginator


def index(request):
    try:
        # filtrando desde el path con query params
        books = Book.objects.all()
        # obteniendo el valor del query param "query_search"
        query = request.GET.get("query_search")
        date_start = request.GET.get("start")
        date_end = request.GET.get("end")

        if query:
            books = books.filter(
                Q(title__icontains=query) |
                Q(author__name__icontains=query) 
            )

        if date_start and date_end:
            books = books.filter(publication_date__range=[date_start, date_end])
        paginator = Paginator(books, 2)  # 3 libros por página
        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)

        return render(
            request,
            'minilibrary/minilibrary.html',
            {
                'page_obj': page_obj,
                'query': query,
            }
        )

    except Exception as e:
        return HttpResponse(f"Pagina no encontrada: {str(e)}", status=404)
