from django.contrib import admin
from .models import Author, Genre, Book, BookDetails, Review, Loan
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

# Register your models here.

admin.site.site_header = "Adminstración de la Mini Biblioteca"
admin.site.site_title = "Mini Biblioteca"
admin.site.index_title = "Panel de Administración"

class ReviewInline(admin.TabularInline):
    model = Review
    extra = 1

class BookDetailsInline(admin.StackedInline):
    model = BookDetails
    extra = 1
    can_delete = False
    verbose_name_plural = 'Detalles del Libro'
    

@admin.action(description='Marcar como devuelto')
def mark_as_returned(modeladmin, request, queryset):
        for loan in queryset:
            loan.status = 'returned'
            loan.save()

class LoanInline(admin.TabularInline):
    model = Loan
    extra = 1
    can_delete = False
    verbose_name_plural = 'Préstamos'

class CustomUserAdmin(BaseUserAdmin):
    inlines = [LoanInline]
    list_display = ('username', 'email', 'is_staff', 'is_active')

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    readonly_fields = ('pages',)
    inlines = [ReviewInline, BookDetailsInline, LoanInline]
    list_display = ('title', 'author', 'pages', 'publication_date')
    search_fields = ('title', 'author__name')
    list_filter = ('author', 'genres', 'publication_date')
    ordering = ['-publication_date']
    date_hierarchy = 'publication_date'
    autocomplete_fields = ['author', 'genres']

    fieldsets = (
        ('Información general', {
            'fields': ('title', 'author', 'genres', 'publication_date')
        }),
        ('Detalles', {
            'fields': ('isbn', 'pages'),
            'classes': ('collapse',),
        }),
    )
    

    # crear permisos permitidos para agregar y cambiar libros
    def has_add_permission(self, request):
        return request.user.is_superuser
    
    def has_change_permission(self, request, obj=None):
        return request.user.is_staff

@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    search_fields = ['name']
    list_display = ('name', 'birth_date', 'country')
    search_fields = ('name',)
    list_filter = ('country',)
    ordering = ['name']
    
@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    search_fields = ['name']

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('book', 'user', 'rating', 'created_at')
    search_fields = ('book__title', 'user__username')
    list_filter = ('rating', 'created_at')
    ordering = ['-created_at']

@admin.register(BookDetails)
class BookDetailsAdmin(admin.ModelAdmin):
    list_display = ('book', 'summary', 'language', 'publisher')
    search_fields = ('book__title', 'publisher')
    list_filter = ('language',)
    ordering = ['book__title']

@admin.register(Loan)
class LoanAdmin(admin.ModelAdmin):
    readonly_fields = ('loan_date',)
    list_display = ('user', 'book', 'loan_date', 'return_date', 'status')
    search_fields = ('book__title', 'user__username')
    list_filter = ('loan_date', 'return_date', 'status')
    actions = [mark_as_returned]
    raw_id_fields = ['user', 'book']
    ordering = ['-loan_date']
    

# admin.site.register(Genre)

try:
    admin.site.unregister(User)
except admin.sites.NotRegistered:
    pass

admin.site.register(User, CustomUserAdmin)