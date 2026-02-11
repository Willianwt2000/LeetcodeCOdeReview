from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
def index(request):
    try:
        author_id = request.GET.get('author')
        return render(request, 'minilibrary/minilibrary.html', 
                {
                    'text': 'Bienvenido a la Mini Biblioteca', 'name': 'Usuario', 'author': author_id
                }
            )
    except Exception as e:
        return HttpResponse(f"Pagina no encontrada: {str(e)}", status=404)