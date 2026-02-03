from django.db import models
from django.contrib.auth import get_user_model

class Author(models.Model):
    name = models.CharField(max_length=100)
    birth_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.name

class Genre(models.Model):
    name = models.CharField(max_length=50, unique=True)
    
    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=200)
    publication_date = models.DateField(null=True, blank=True)
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='books')
    pages = models.IntegerField()
    isbn = models.CharField(max_length=50)
    genres = models.ManyToManyField(Genre, related_name='books')
    recommended_by = models.ManyToManyField(
        get_user_model(), 
        through="Recommendation", 
        related_name="recommended_books"
    )

    def __str__(self):
        return self.title

class BookDetails(models.Model):
    book = models.OneToOneField(Book, on_delete=models.CASCADE, related_name='details')
    summary = models.TextField()
    cover_url = models.URLField(max_length=500)  # Cambié a URLField
    language = models.CharField(max_length=50)
    
    def __str__(self):
        return f"Details of {self.book.title}"

class Review(models.Model):  # ¡Corregido: Review con mayúscula!
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='reviews')
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='reviews')
    rating = models.PositiveIntegerField()  # Cambié a PositiveIntegerField
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)  # Corregí 'create_at' a 'created_at'

    def __str__(self):
        return f"{self.user} ==> {self.book.title} ({self.rating}/5)"

# Comment to keep orbit

class Loan(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='loans')
    loan_date = models.DateTimeField(auto_now_add=True)
    return_date = models.DateTimeField(null=True, blank=True)
    is_returned = models.BooleanField(default=False)
    
    def __str__(self):
        status = 'Devuelto' if self.is_returned else 'Prestado'
        return f"{self.user} -> {self.book.title} ({status})"

class Recommendation(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    recommended_at = models.DateTimeField(auto_now_add=True)
    note = models.TextField(blank=True)
    
    class Meta:
        unique_together = ("user", "book")
    
    def __str__(self):
        return f"{self.user} recomienda {self.book.title}"
