import os
import sys

print("DEBUG 1: Script iniciando")
print(f"Directorio actual: {os.getcwd()}")

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'playground.settings')

print("DEBUG 2: Intentando importar Django")
try:
    import django
    django.setup()
    print("DEBUG 3: Django configurado")
except Exception as e:
    print(f"DEBUG 3 ERROR: {e}")
    sys.exit(1)

print("DEBUG 4: Intentando importar modelos")
try:
    from django.contrib.auth import get_user_model
    from minilibrary.models import Book, Author, Review
    
    User = get_user_model()
    print(f"DEBUG 5: Modelos importados. User model: {User.__name__}")
    
    # Verificar si ya hay datos
    print(f"\nDEBUG 6: Conteo actual:")
    print(f"  Usuarios: {User.objects.count()}")
    print(f"  Libros: {Book.objects.count()}")
    print(f"  Autores: {Author.objects.count()}")
    print(f"  Reseñas: {Review.objects.count()}")
    
    # Crear un dato de prueba MUY simple
    print("\nDEBUG 7: Creando dato de prueba...")
    
    # Primero crear un autor
    author, created = Author.objects.get_or_create(
        name="Autor de Prueba Debug",
        defaults={'birth_date': '2000-01-01'}
    )
    print(f"  Autor: {'Creado' if created else 'Ya existía'} - {author.name}")
    
    # Crear un libro
    book, created = Book.objects.get_or_create(
        title="Libro de Prueba Debug",
        defaults={
            'author': author,
            'pages': 100,
            'isbn': 'DEBUG-123'
        }
    )
    print(f"  Libro: {'Creado' if created else 'Ya existía'} - {book.title}")
    
    # Verificar nuevamente
    print(f"\nDEBUG 8: Conteo después de crear:")
    print(f"  Autores: {Author.objects.count()}")
    print(f"  Libros: {Book.objects.count()}")
    
except Exception as e:
    print(f"DEBUG ERROR: {e}")
    import traceback
    traceback.print_exc()

print("\n" + "="*50)
print("FIN DEL DEBUG SCRIPT")
print("="*50)
