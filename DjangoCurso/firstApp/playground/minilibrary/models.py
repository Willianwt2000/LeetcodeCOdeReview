from django.db import models

# Create your models here.
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


    def __str__(self):
        return self.title
    
class BookDetails(models.Model):
    book = models.OneToOneField(Book, on_delete=models.CASCADE, related_name='details')
    summary = models.TextField()
    cover_url = models.CharField(max_length=200)
    language = models.CharField(max_length=50)
    
    def __str__(self):
        return f"Details of {self.book.title}"

class Test_table(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'test_table' 

    def __str__(self):
        return self.name

# End of models.py
