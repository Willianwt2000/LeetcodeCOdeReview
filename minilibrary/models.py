from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone

# Create your models here.
class Author(models.Model):
    name = models.CharField(max_length=100, verbose_name="Nombre")
    birth_date = models.DateField(null=True, blank=True, verbose_name="Fecha de Nacimiento")
    biography = models.TextField(blank=True, null=True, verbose_name="Biografía")
    country = models.CharField(max_length=50, blank=True, null=True, verbose_name="País")

    class Meta:
        verbose_name = "Autor"
        verbose_name_plural = "Autores"
        ordering = ['name']

    def __str__(self):
        return self.name


class Genre(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name="Nombre")
    description = models.TextField(blank=True, null=True, verbose_name="Descripción")

    class Meta:
        verbose_name = "Género"
        verbose_name_plural = "Géneros"
        ordering = ['name']

    def __str__(self):
        return self.name


class Book(models.Model):
    title = models.CharField(max_length=200, verbose_name="Título")
    publication_date = models.DateField(null=True, blank=True, verbose_name="Fecha de Publicación")
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='books', verbose_name="Autor")
    pages = models.IntegerField(validators=[MinValueValidator(1)], verbose_name="Páginas")
    isbn = models.CharField(max_length=13, unique=True, verbose_name="ISBN")
    genres = models.ManyToManyField(Genre, related_name='books', verbose_name="Géneros")
    price = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True, verbose_name="Precio")
    stock = models.IntegerField(default=1, validators=[MinValueValidator(0)], verbose_name="Cantidad en Stock")

    class Meta:
        verbose_name = "Libro"
        verbose_name_plural = "Libros"
        ordering = ['title']
        indexes = [
            models.Index(fields=['title']),
            models.Index(fields=['author']),
            models.Index(fields=['publication_date']),
        ]

    def __str__(self):
        return self.title

    @property
    def available(self):
        return self.stock > 0


class BookDetails(models.Model):
    LANGUAGES = [
        ('es', 'Español'),
        ('en', 'Inglés'),
        ('jp', 'Japonés'),
        ('fr', 'Francés'),
        ('de', 'Alemán'),
    ]

    book = models.OneToOneField(Book, on_delete=models.CASCADE, related_name='details', verbose_name="Libro")
    summary = models.TextField(verbose_name="Resumen")
    cover_url = models.URLField(max_length=500, blank=True, null=True, verbose_name="URL de Portada")
    language = models.CharField(max_length=2, choices=LANGUAGES, default='es', verbose_name="Idioma")
    publisher = models.CharField(max_length=100, blank=True, null=True, verbose_name="Editorial")
    edition = models.CharField(max_length=50, blank=True, null=True, verbose_name="Edición")

    class Meta:
        verbose_name = "Detalle de Libro"
        verbose_name_plural = "Detalles de Libros"

    def __str__(self):
        return f"Detalles de {self.book.title}"


class Review(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='reviews', verbose_name="Usuario")
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='reviews', verbose_name="Libro")
    rating = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        verbose_name="Calificación"
    )
    comment = models.TextField(verbose_name="Comentario")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de Creación")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Fecha de Actualización")

    class Meta:
        verbose_name = "Reseña"
        verbose_name_plural = "Reseñas"
        ordering = ['-created_at']
        unique_together = ['user', 'book']

    def __str__(self):
        return f"{self.user.username} → {self.book.title} ({self.rating}/5)"


class Loan(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pendiente'),
        ('active', 'Activo'),
        ('returned', 'Devuelto'),
        ('overdue', 'Vencido'),
    ]

    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='loans', verbose_name="Usuario")
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='loans', verbose_name="Libro")
    loan_date = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de Préstamo")
    due_date = models.DateTimeField(verbose_name="Fecha de Devolución")
    return_date = models.DateTimeField(null=True, blank=True, verbose_name="Fecha de Devolución Real")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending', verbose_name="Estado")
    notes = models.TextField(blank=True, null=True, verbose_name="Notas")

    class Meta:
        verbose_name = "Préstamo"
        verbose_name_plural = "Préstamos"
        ordering = ['-loan_date']

    def __str__(self):
        return f"{self.user.username} → {self.book.title} ({self.get_status_display()})"

    def save(self, *args, **kwargs):
        # Actualizar stock del libro
        if self.status == 'active' and self.pk is None:
            self.book.stock -= 1
            self.book.save()
        elif self.status == 'returned' and self.return_date is None:
            self.return_date = timezone.now()
            self.book.stock += 1
            self.book.save()
        super().save(*args, **kwargs)