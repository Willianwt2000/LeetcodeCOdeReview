from django.contrib import admin
from .models import Author,Genre,Book,BookDetails,Review,Loan
# Register your models here.
admin.site.register(Author)
admin.site.register(Genre)
admin.site.register(Book)
admin.site.register(BookDetails)
admin.site.register(Review)
admin.site.register(Loan)