import os
import django
import random
from datetime import date, timedelta

# 1. Indicamos dónde está la configuración (esto está bien)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'playground.settings')
django.setup()

# 2. IMPORTACIÓN CORREGIDA: Tus modelos viven en 'minilibrary'
from django.contrib.auth import get_user_model
from minilibrary.models import Author, Genre, Book, BookDetails, review 

User = get_user_model()

def run_seed():
    print("🚀 Iniciando carga masiva en Render...")

    # Crear Géneros
    genre_names = ['Shonen', 'Seinen', 'Shojo', 'Isekai', 'Mecha', 'Psychological', 'Fantasy']
    genres = [Genre.objects.get_or_create(name=name)[0] for name in genre_names]

    # Crear Autores
    authors_data = [
        ('Akira Toriyama', '1955-04-05'), ('Eiichiro Oda', '1975-01-01'),
        ('Hajime Isayama', '1986-08-29'), ('Tsugumi Ohba', '1962-11-30'),
        ('Kentaro Miura', '1966-07-11'), ('Sui Ishida', '1986-12-28')
    ]
    author_objs = [Author.objects.get_or_create(name=n, birth_date=d)[0] for n, d in authors_data]

    # Crear un usuario para las reseñas
    user, _ = User.objects.get_or_create(username='usuario_demo', email='demo@test.com')

    anime_titles = ["One Piece", "Naruto", "Bleach", "Attack on Titan", "Death Note", "Berserk"]

    for i in range(1, 101):
        base_title = random.choice(anime_titles)
        # Crear Libro
        book = Book.objects.create(
            title=f"{base_title} - Vol. {i}",
            publication_date=date.today() - timedelta(days=random.randint(0, 3000)),
            author=random.choice(author_objs),
            pages=random.randint(150, 450),
            isbn=f"978-{random.randint(1000000, 9999999)}"
        )
        
        # M2M: Géneros
        book.genres.add(*random.sample(genres, 2))

        # OneToOne: Detalles
        BookDetails.objects.create(
            book=book,
            summary=f"Resumen del volumen {i}: Una batalla épica comienza.",
            cover_url=f"https://api.anime.com/covers/img_{i}.jpg",
            language="Spanish"
        )

        # Reseña (Usando tus nombres de campo: user_id y book_id)
        review.objects.create(
            user_id=user,
            book_id=book,
            rating=random.randint(4, 5),
            comment="¡Excelente calidad de dibujo y trama!"
        )

    print(f"✅ ¡Éxito! Se han creado 100 libros con sus detalles y reseñas en {book.author.name}")

if __name__ == '__main__':
    run_seed()