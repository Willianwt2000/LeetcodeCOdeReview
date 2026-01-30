import os
import django
import random
from datetime import date, timedelta

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tu_proyecto.settings')  # Cambia por tu proyecto
django.setup()

from django.contrib.auth.models import User
from minilibrary.models import Author, Genre, Book, BookDetails, Review, Loan, Recommendation

def create_superuser():
    """Crear superusuario si no existe"""
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@animebiblio.com', 'admin123')
        print("✅ Superusuario creado: admin / admin123")

def create_users():
    """Crear usuarios normales"""
    users_data = [
        {'username': 'sakura', 'email': 'sakura@konoha.com', 'password': 'password123'},
        {'username': 'naruto', 'email': 'naruto@hokage.com', 'password': 'rasengan456'},
        {'username': 'goku', 'email': 'goku@saiyan.com', 'password': 'kamehameha'},
        {'username': 'luffy', 'email': 'luffy@onepiece.com', 'password': 'gomugomu'},
        {'username': 'eren', 'email': 'eren@titan.com', 'password': 'rumbling789'},
        {'username': 'nezuko', 'email': 'nezuko@demon.com', 'password': 'demonslayer'},
        {'username': 'levi', 'email': 'levi@clean.com', 'password': 'cleanfreak'},
        {'username': 'mikasa', 'email': 'mikasa@ackerman.com', 'password': 'scarf123'},
        {'username': 'zenitsu', 'email': 'zenitsu@thunder.com', 'password': 'thunder123'},
        {'username': 'tanjiro', 'email': 'tanjiro@water.com', 'password': 'hinokami'},
    ]
    
    users = []
    for data in users_data:
        user, created = User.objects.get_or_create(
            username=data['username'],
            defaults={'email': data['email']}
        )
        if created:
            user.set_password(data['password'])
            user.save()
        users.append(user)
    
    print(f"✅ {len(users)} usuarios creados")
    return users

def create_genres():
    """Crear géneros de anime/manga"""
    genres = [
        # Géneros principales
        'Shonen', 'Shojo', 'Seinen', 'Josei', 'Kodomo',
        # Géneros temáticos
        'Acción', 'Aventura', 'Comedia', 'Drama', 'Fantasía',
        'Ciencia Ficción', 'Misterio', 'Horror', 'Psicológico',
        'Romance', 'Slice of Life', 'Deportes', 'Mecha',
        'Isekai', 'Magical Girl', 'Cyberpunk', 'Steampunk',
        'Histórico', 'Militar', 'Musical', 'Parodia',
        # Géneros específicos
        'Artes Marciales', 'Superpoderes', 'Vampiros', 'Zombies',
        'Viajes en el Tiempo', 'Realidad Virtual', 'Apocalíptico',
        'Post-Apocalíptico', 'Gore', 'Ecchi', 'Harem', 'Reverse Harem',
        'Yaoi', 'Yuri', 'Tragedia', 'Suspenso', 'Thriller'
    ]
    
    genre_objects = []
    for genre_name in genres:
        genre, created = Genre.objects.get_or_create(name=genre_name)
        genre_objects.append(genre)
    
    print(f"✅ {len(genre_objects)} géneros creados")
    return genre_objects

def create_authors():
    """Crear autores famosos de manga/anime"""
    authors_data = [
        # Autores legendarios
        {'name': 'Eiichiro Oda', 'birth_date': '1975-01-01'},
        {'name': 'Masashi Kishimoto', 'birth_date': '1974-11-08'},
        {'name': 'Akira Toriyama', 'birth_date': '1955-04-05'},
        {'name': 'Hajime Isayama', 'birth_date': '1986-08-29'},
        {'name': 'Koyoharu Gotouge', 'birth_date': '1989-05-05'},
        {'name': 'Tite Kubo', 'birth_date': '1977-06-26'},
        {'name': 'Hiromu Arakawa', 'birth_date': '1973-05-08'},
        {'name': 'Naoko Takeuchi', 'birth_date': '1967-03-15'},
        {'name': 'Rumiko Takahashi', 'birth_date': '1957-10-10'},
        {'name': 'Yoshihiro Togashi', 'birth_date': '1966-04-27'},
        {'name': 'Kōhei Horikoshi', 'birth_date': '1986-11-20'},
        {'name': 'Gege Akutami', 'birth_date': '1992-02-26'},
        {'name': 'Sui Ishida', 'birth_date': '1986-12-28'},
        {'name': 'Tsugumi Ohba', 'birth_date': None},  # Identidad desconocida
        {'name': 'Takeshi Obata', 'birth_date': '1969-02-11'},
        {'name': 'Hiro Mashima', 'birth_date': '1977-05-03'},
        {'name': 'Yuki Tabata', 'birth_date': '1984-07-28'},
        {'name': 'Yana Toboso', 'birth_date': '1984-01-24'},
        {'name': 'CLAMP', 'birth_date': None},  # Grupo
        {'name': 'Junji Ito', 'birth_date': '1963-07-31'},
        {'name': 'Makoto Shinkai', 'birth_date': '1973-02-09'},
        {'name': 'Hayao Miyazaki', 'birth_date': '1941-01-05'},
        {'name': 'Satoshi Kon', 'birth_date': '1963-10-12'},
        {'name': 'Mamoru Hosoda', 'birth_date': '1967-09-19'},
        {'name': 'Shinichiro Watanabe', 'birth_date': '1965-05-24'},
        {'name': 'Gen Urobuchi', 'birth_date': '1972-12-20'},
        {'name': 'Mari Okada', 'birth_date': '1976-08-28'},
        {'name': 'Kentaro Miura', 'birth_date': '1966-07-11'},
        {'name': 'Takehiko Inoue', 'birth_date': '1967-01-12'},
        {'name': 'Katsuhiro Otomo', 'birth_date': '1954-04-14'},
    ]
    
    author_objects = []
    for author_data in authors_data:
        birth_date = author_data['birth_date']
        author, created = Author.objects.get_or_create(
            name=author_data['name'],
            defaults={'birth_date': birth_date if birth_date else None}
        )
        author_objects.append(author)
    
    print(f"✅ {len(author_objects)} autores creados")
    return author_objects

def create_books(authors, genres):
    """Crear libros/manga con datos detallados"""
    books_data = [
        # ONE PIECE Saga
        {
            'title': 'One Piece Vol. 1: Romance Dawn',
            'author': 'Eiichiro Oda',
            'pages': 208,
            'isbn': '9781591160575',
            'publication_date': '1997-12-24',
            'genres': ['Shonen', 'Aventura', 'Comedia', 'Fantasía'],
            'summary': 'La historia de Monkey D. Luffy y su sueño de convertirse en el Rey de los Piratas.',
            'language': 'Japonés'
        },
        {
            'title': 'One Piece Vol. 61: Romance Dawn for the New World',
            'author': 'Eiichiro Oda',
            'pages': 216,
            'isbn': '9781421542799',
            'publication_date': '2011-02-01',
            'genres': ['Shonen', 'Aventura', 'Acción', 'Drama'],
            'summary': 'La tripulación de Sombrero de Paja entra al Nuevo Mundo.',
            'language': 'Japonés'
        },
        
        # NARUTO Saga
        {
            'title': 'Naruto Vol. 1: Uzumaki Naruto',
            'author': 'Masashi Kishimoto',
            'pages': 192,
            'isbn': '9781569319000',
            'publication_date': '1999-08-03',
            'genres': ['Shonen', 'Acción', 'Artes Marciales', 'Comedia'],
            'summary': 'La historia de Naruto Uzumaki, un ninja adolescente que busca reconocimiento.',
            'language': 'Japonés'
        },
        {
            'title': 'Naruto: Shippuden Vol. 28',
            'author': 'Masashi Kishimoto',
            'pages': 200,
            'isbn': '9781421539935',
            'publication_date': '2011-07-05',
            'genres': ['Shonen', 'Acción', 'Drama', 'Superpoderes'],
            'summary': 'La Cuarta Gran Guerra Ninja se intensifica.',
            'language': 'Japonés'
        },
        
        # DRAGON BALL
        {
            'title': 'Dragon Ball Vol. 1: The Monkey King',
            'author': 'Akira Toriyama',
            'pages': 192,
            'isbn': '9781569319208',
            'publication_date': '1985-06-10',
            'genres': ['Shonen', 'Acción', 'Comedia', 'Artes Marciales'],
            'summary': 'Las aventuras de Son Goku en su búsqueda de las Esferas del Dragón.',
            'language': 'Japonés'
        },
        {
            'title': 'Dragon Ball Z Vol. 1: The World\'s Greatest Team',
            'author': 'Akira Toriyama',
            'pages': 200,
            'isbn': '9781569319307',
            'publication_date': '1989-10-10',
            'genres': ['Shonen', 'Acción', 'Ciencia Ficción', 'Superpoderes'],
            'summary': 'Goku descubre que es un Saiyajin y debe proteger la Tierra.',
            'language': 'Japonés'
        },
        
        # ATTACK ON TITAN
        {
            'title': 'Attack on Titan Vol. 1',
            'author': 'Hajime Isayama',
            'pages': 192,
            'isbn': '9781612620244',
            'publication_date': '2010-03-17',
            'genres': ['Seinen', 'Acción', 'Horror', 'Post-Apocalíptico'],
            'summary': 'La humanidad al borde de la extinción por los Titanes.',
            'language': 'Japonés'
        },
        {
            'title': 'Attack on Titan Vol. 34: The Final Chapter',
            'author': 'Hajime Isayama',
            'pages': 208,
            'isbn': '9781646511948',
            'publication_date': '2021-06-09',
            'genres': ['Seinen', 'Drama', 'Tragedia', 'Psicológico'],
            'summary': 'El desenlace final de la batalla por la libertad.',
            'language': 'Japonés'
        },
        
        # DEMON SLAYER
        {
            'title': 'Demon Slayer: Kimetsu no Yaiba Vol. 1',
            'author': 'Koyoharu Gotouge',
            'pages': 192,
            'isbn': '9781974700523',
            'publication_date': '2016-02-04',
            'genres': ['Shonen', 'Acción', 'Supernatural', 'Histórico'],
            'summary': 'Tanjiro Kamado se convierte en cazador de demonios para salvar a su hermana.',
            'language': 'Japonés'
        },
        
        # BLEACH
        {
            'title': 'Bleach Vol. 1: Strawberry and the Soul Reapers',
            'author': 'Tite Kubo',
            'pages': 200,
            'isbn': '9781591164418',
            'publication_date': '2001-08-07',
            'genres': ['Shonen', 'Acción', 'Supernatural', 'Aventura'],
            'summary': 'Ichigo Kurosaki obtiene poderes de Shinigami.',
            'language': 'Japonés'
        },
        
        # FULLMETAL ALCHEMIST
        {
            'title': 'Fullmetal Alchemist Vol. 1',
            'author': 'Hiromu Arakawa',
            'pages': 192,
            'isbn': '9781591169208',
            'publication_date': '2002-01-22',
            'genres': ['Shonen', 'Aventura', 'Steampunk', 'Drama'],
            'summary': 'Los hermanos Elric buscan la Piedra Filosofal.',
            'language': 'Japonés'
        },
        
        # SAILOR MOON
        {
            'title': 'Sailor Moon Vol. 1',
            'author': 'Naoko Takeuchi',
            'pages': 240,
            'isbn': '9781612620008',
            'publication_date': '1992-07-06',
            'genres': ['Shojo', 'Magical Girl', 'Romance', 'Fantasía'],
            'summary': 'Usagi Tsukino se convierte en Sailor Moon.',
            'language': 'Japonés'
        },
        
        # MY HERO ACADEMIA
        {
            'title': 'My Hero Academia Vol. 1',
            'author': 'Kōhei Horikoshi',
            'pages': 192,
            'isbn': '9781421582696',
            'publication_date': '2014-11-04',
            'genres': ['Shonen', 'Superpoderes', 'Acción', 'Comedia'],
            'summary': 'Izuku Midoriya en la academia para héroes.',
            'language': 'Japonés'
        },
        
        # JUJUTSU KAISEN
        {
            'title': 'Jujutsu Kaisen Vol. 1',
            'author': 'Gege Akutami',
            'pages': 192,
            'isbn': '9781974710027',
            'publication_date': '2018-07-04',
            'genres': ['Shonen', 'Acción', 'Horror', 'Supernatural'],
            'summary': 'Yuji Itadori se convierte en anfitrión de Sukuna.',
            'language': 'Japonés'
        },
        
        # TOKYO GHOUL
        {
            'title': 'Tokyo Ghoul Vol. 1',
            'author': 'Sui Ishida',
            'pages': 224,
            'isbn': '9781421580364',
            'publication_date': '2011-09-16',
            'genres': ['Seinen', 'Horror', 'Psicológico', 'Supernatural'],
            'summary': 'Ken Kaneki se convierte en mitad ghoul.',
            'language': 'Japonés'
        },
        
        # DEATH NOTE
        {
            'title': 'Death Note Vol. 1',
            'author': 'Tsugumi Ohba',
            'pages': 200,
            'isbn': '9781421501680',
            'publication_date': '2003-12-01',
            'genres': ['Shonen', 'Misterio', 'Psicológico', 'Suspenso'],
            'summary': 'Light Yagami encuentra un cuaderno que mata personas.',
            'language': 'Japonés'
        },
        
        # BERSERK
        {
            'title': 'Berserk Vol. 1',
            'author': 'Kentaro Miura',
            'pages': 224,
            'isbn': '9781593070205',
            'publication_date': '1989-08-25',
            'genres': ['Seinen', 'Fantasía Oscura', 'Horror', 'Drama'],
            'summary': 'La historia de Guts, el Espadachín Negro.',
            'language': 'Japonés'
        },
        
        # VAGABOND
        {
            'title': 'Vagabond Vol. 1',
            'author': 'Takehiko Inoue',
            'pages': 296,
            'isbn': '9781591168775',
            'publication_date': '1999-03-19',
            'genres': ['Seinen', 'Histórico', 'Artes Marciales', 'Drama'],
            'summary': 'La vida del legendario espadachín Miyamoto Musashi.',
            'language': 'Japonés'
        },
        
        # AKIRA
        {
            'title': 'Akira Vol. 1',
            'author': 'Katsuhiro Otomo',
            'pages': 368,
            'isbn': '9781935429005',
            'publication_date': '1982-12-06',
            'genres': ['Seinen', 'Ciencia Ficción', 'Cyberpunk', 'Acción'],
            'summary': 'Neo-Tokyo después de una explosión psíquica.',
            'language': 'Japonés'
        },
        
        # ONE-PUNCH MAN
        {
            'title': 'One-Punch Man Vol. 1',
            'author': 'ONE',
            'pages': 200,
            'isbn': '9781421585642',
            'publication_date': '2012-06-14',
            'genres': ['Shonen', 'Comedia', 'Acción', 'Parodia'],
            'summary': 'Saitama, un héroe que derrota enemigos de un golpe.',
            'language': 'Japonés'
        },
        
        # MOB PSYCHO 100
        {
            'title': 'Mob Psycho 100 Vol. 1',
            'author': 'ONE',
            'pages': 180,
            'isbn': '9781632364784',
            'publication_date': '2012-04-18',
            'genres': ['Shonen', 'Comedia', 'Superpoderes', 'Psicológico'],
            'summary': 'Shigeo Kageyama, un poderoso psíquico.',
            'language': 'Japonés'
        },
        
        # HUNTER x HUNTER
        {
            'title': 'Hunter x Hunter Vol. 1',
            'author': 'Yoshihiro Togashi',
            'pages': 192,
            'isbn': '9781569319048',
            'publication_date': '1998-03-03',
            'genres': ['Shonen', 'Aventura', 'Acción', 'Fantasía'],
            'summary': 'Gon Freecss se convierte en Hunter.',
            'language': 'Japonés'
        },
        
        # YU YU HAKUSHO
        {
            'title': 'Yu Yu Hakusho Vol. 1',
            'author': 'Yoshihiro Togashi',
            'pages': 184,
            'isbn': '9781591168096',
            'publication_date': '1990-12-12',
            'genres': ['Shonen', 'Acción', 'Supernatural', 'Comedia'],
            'summary': 'Yusuke Urameshi se convierte en detective espiritual.',
            'language': 'Japonés'
        },
        
        # INUYASHA
        {
            'title': 'Inuyasha Vol. 1',
            'author': 'Rumiko Takahashi',
            'pages': 192,
            'isbn': '9781591162278',
            'publication_date': '1996-11-13',
            'genres': ['Shonen', 'Fantasía', 'Romance', 'Aventura'],
            'summary': 'Kagome viaja al Japón feudal con Inuyasha.',
            'language': 'Japonés'
        },
        
        # RANMA ½
        {
            'title': 'Ranma ½ Vol. 1',
            'author': 'Rumiko Takahashi',
            'pages': 200,
            'isbn': '9781569310915',
            'publication_date': '1987-09-10',
            'genres': ['Shonen', 'Comedia', 'Romance', 'Artes Marciales'],
            'summary': 'Ranma Saotome se transforma en mujer con agua fría.',
            'language': 'Japonés'
        },
        
        # FAIRY TAIL
        {
            'title': 'Fairy Tail Vol. 1',
            'author': 'Hiro Mashima',
            'pages': 200,
            'isbn': '9780345501346',
            'publication_date': '2006-08-15',
            'genres': ['Shonen', 'Fantasía', 'Acción', 'Comedia'],
            'summary': 'Lucy se une al gremio de magos Fairy Tail.',
            'language': 'Japonés'
        },
        
        # BLACK CLOVER
        {
            'title': 'Black Clover Vol. 1',
            'author': 'Yuki Tabata',
            'pages': 192,
            'isbn': '9781421592671',
            'publication_date': '2015-04-03',
            'genres': ['Shonen', 'Fantasía', 'Acción', 'Aventura'],
            'summary': 'Asta sueña con convertirse en el Rey Mago.',
            'language': 'Japonés'
        },
        
        # BLACK BUTLER
        {
            'title': 'Black Butler Vol. 1',
            'author': 'Yana Toboso',
            'pages': 176,
            'isbn': '9780316080849',
            'publication_date': '2007-02-22',
            'genres': ['Shojo', 'Misterio', 'Supernatural', 'Histórico'],
            'summary': 'Ciel Phantomhive y su mayordomo demoníaco Sebastian.',
            'language': 'Japonés'
        },
        
        # CARD CAPTOR SAKURA
        {
            'title': 'Cardcaptor Sakura Vol. 1',
            'author': 'CLAMP',
            'pages': 180,
            'isbn': '9781931514612',
            'publication_date': '1996-05-22',
            'genres': ['Shojo', 'Magical Girl', 'Fantasía', 'Romance'],
            'summary': 'Sakura Kinomoto libera las Cartas Clow.',
            'language': 'Japonés'
        },
        
        # TSUBASA RESERVOIR CHRONICLE
        {
            'title': 'Tsubasa Reservoir Chronicle Vol. 1',
            'author': 'CLAMP',
            'pages': 192,
            'isbn': '9781598160042',
            'publication_date': '2003-05-22',
            'genres': ['Shonen', 'Fantasía', 'Aventura', 'Romance'],
            'summary': 'Syaoran viaja entre dimensiones para salvar a Sakura.',
            'language': 'Japonés'
        },
        
        # UZUMAKI
        {
            'title': 'Uzumaki Vol. 1',
            'author': 'Junji Ito',
            'pages': 208,
            'isbn': '9781421505718',
            'publication_date': '1998-08-20',
            'genres': ['Horror', 'Psicológico', 'Suspenso', 'Seinen'],
            'summary': 'Un pueblo obsesionado con espirales.',
            'language': 'Japonés'
        },
        
        # GYO
        {
            'title': 'Gyo Vol. 1',
            'author': 'Junji Ito',
            'pages': 400,
            'isbn': '9781421540399',
            'publication_date': '2001-12-18',
            'genres': ['Horror', 'Ciencia Ficción', 'Zombies', 'Seinen'],
            'summary': 'Peces con patas mecánicas invaden la tierra.',
            'language': 'Japonés'
        },
        
        # YOUR NAME (Novela)
        {
            'title': 'Your Name.',
            'author': 'Makoto Shinkai',
            'pages': 224,
            'isbn': '9780316471865',
            'publication_date': '2016-06-18',
            'genres': ['Romance', 'Drama', 'Fantasía', 'Slice of Life'],
            'summary': 'Dos adolescentes intercambian cuerpos misteriosamente.',
            'language': 'Japonés'
        },
        
        # WEATHERING WITH YOU
        {
            'title': 'Weathering With You',
            'author': 'Makoto Shinkai',
            'pages': 240,
            'isbn': '9781975381676',
            'publication_date': '2019-07-19',
            'genres': ['Romance', 'Drama', 'Fantasía', 'Slice of Life'],
            'summary': 'Un chico conoce a una chica que puede controlar el clima.',
            'language': 'Japonés'
        },
        
        # SPIRITED AWAY (Artbook)
        {
            'title': 'Spirited Away Art Book',
            'author': 'Hayao Miyazaki',
            'pages': 256,
            'isbn': '9784838781885',
            'publication_date': '2002-07-19',
            'genres': ['Fantasía', 'Aventura', 'Arte', 'Kodomo'],
            'summary': 'Arte conceptual de la película El Viaje de Chihiro.',
            'language': 'Japonés'
        },
        
        # MY NEIGHBOR TOTORO
        {
            'title': 'My Neighbor Totoro Picture Book',
            'author': 'Hayao Miyazaki',
            'pages': 48,
            'isbn': '9784198600908',
            'publication_date': '1988-04-15',
            'genres': ['Fantasía', 'Kodomo', 'Aventura', 'Slice of Life'],
            'summary': 'Dos hermanas descubren espíritus del bosque.',
            'language': 'Japonés'
        },
        
        # PERFECT BLUE (Novelización)
        {
            'title': 'Perfect Blue: Complete Metamorphosis',
            'author': 'Satoshi Kon',
            'pages': 320,
            'isbn': '9781932234415',
            'publication_date': '1998-01-28',
            'genres': ['Psicológico', 'Thriller', 'Drama', 'Suspenso'],
            'summary': 'Una idol perseguida por un acosador.',
            'language': 'Japonés'
        },
        
        # PAPRIKA
        {
            'title': 'Paprika',
            'author': 'Satoshi Kon',
            'pages': 256,
            'isbn': '9781421510187',
            'publication_date': '2006-04-25',
            'genres': ['Ciencia Ficción', 'Psicológico', 'Thriller', 'Misterio'],
            'summary': 'Una máquina que permite entrar en los sueños.',
            'language': 'Japonés'
        },
        
        # THE GIRL WHO LEAPT THROUGH TIME
        {
            'title': 'The Girl Who Leapt Through Time',
            'author': 'Mamoru Hosoda',
            'pages': 208,
            'isbn': '9781421537740',
            'publication_date': '2009-11-17',
            'genres': ['Ciencia Ficción', 'Romance', 'Drama', 'Slice of Life'],
            'summary': 'Una chica descubre que puede viajar en el tiempo.',
            'language': 'Japonés'
        },
        
        # SUMMER WARS
        {
            'title': 'Summer Wars',
            'author': 'Mamoru Hosoda',
            'pages': 224,
            'isbn': '9781421538860',
            'publication_date': '2010-06-22',
            'genres': ['Ciencia Ficción', 'Comedia', 'Drama', 'Acción'],
            'summary': 'Un hacker debe salvar el mundo virtual OZ.',
            'language': 'Japonés'
        },
        
        # COWBOY BEBOP
        {
            'title': 'Cowboy Bebop Shooting Star Vol. 1',
            'author': 'Shinichiro Watanabe',
            'pages': 192,
            'isbn': '9781591820028',
            'publication_date': '1998-04-24',
            'genres': ['Ciencia Ficción', 'Acción', 'Noir', 'Drama'],
            'summary': 'Cazarrecompensas en el espacio en el año 2071.',
            'language': 'Japonés'
        },
        
        # SAMURAI CHAMPLOO
        {
            'title': 'Samurai Champloo Vol. 1',
            'author': 'Shinichiro Watanabe',
            'pages': 200,
            'isbn': '9781595328681',
            'publication_date': '2004-05-19',
            'genres': ['Histórico', 'Acción', 'Comedia', 'Aventura'],
            'summary': 'Dos samuráis y una joven buscan al samurái que huele a girasol.',
            'language': 'Japonés'
        },
        
        # MADOKA MAGICA
        {
            'title': 'Puella Magi Madoka Magica Vol. 1',
            'author': 'Gen Urobuchi',
            'pages': 180,
            'isbn': '9780316223926',
            'publication_date': '2011-08-09',
            'genres': ['Magical Girl', 'Psicológico', 'Tragedia', 'Thriller'],
            'summary': 'Chicas que hacen contratos con una criatura mágica.',
            'language': 'Japonés'
        },
        
        # PSYCHO-PASS
        {
            'title': 'Psycho-Pass Vol. 1',
            'author': 'Gen Urobuchi',
            'pages': 192,
            'isbn': '9780316349909',
            'publication_date': '2013-09-24',
            'genres': ['Ciencia Ficción', 'Policial', 'Psicológico', 'Cyberpunk'],
            'summary': 'Una sociedad controlada por el sistema Sibyl.',
            'language': 'Japonés'
        },
        
        # ANOHANA
        {
            'title': 'Anohana: The Flower We Saw That Day',
            'author': 'Mari Okada',
            'pages': 176,
            'isbn': '9780316371542',
            'publication_date': '2012-08-21',
            'genres': ['Drama', 'Slice of Life', 'Supernatural', 'Tragedia'],
            'summary': 'El fantasma de una amiga de la infancia regresa.',
            'language': 'Japonés'
        },
        
        # MAQUIA
        {
            'title': 'Maquia: When the Promised Flower Blooms',
            'author': 'Mari Okada',
            'pages': 192,
            'isbn': '9784041072108',
            'publication_date': '2018-06-22',
            'genres': ['Fantasía', 'Drama', 'Tragedia', 'Slice of Life'],
            'summary': 'Un ser inmortal cría a un niño humano.',
            'language': 'Japonés'
        },
        
        # VINLAND SAGA
        {
            'title': 'Vinland Saga Vol. 1',
            'author': 'Makoto Yukimura',
            'pages': 232,
            'isbn': '9781612624204',
            'publication_date': '2005-04-13',
            'genres': ['Seinen', 'Histórico', 'Acción', 'Drama'],
            'summary': 'Vikingos en la Inglaterra medieval.',
            'language': 'Japonés'
        },
        
        # PLANETES
        {
            'title': 'Planetes Vol. 1',
            'author': 'Makoto Yukimura',
            'pages': 224,
            'isbn': '9781591164227',
            'publication_date': '1999-01-19',
            'genres': ['Ciencia Ficción', 'Drama', 'Slice of Life', 'Realista'],
            'summary': 'Recolectores de basura espacial en el año 2075.',
            'language': 'Japonés'
        },
        
        # GANTZ
        {
            'title': 'Gantz Vol. 1',
            'author': 'Hiroya Oku',
            'pages': 224,
            'isbn': '9781593073275',
            'publication_date': '2000-06-22',
            'genres': ['Seinen', 'Ciencia Ficción', 'Acción', 'Horror'],
            'summary': 'Personas muertas son forzadas a cazar aliens.',
            'language': 'Japonés'
        },
        
        # 20th CENTURY BOYS
        {
            'title': '20th Century Boys Vol. 1',
            'author': 'Naoki Urasawa',
            'pages': 232,
            'isbn': '9781421519159',
            'publication_date': '2000-01-05',
            'genres': ['Misterio', 'Suspenso', 'Ciencia Ficción', 'Drama'],
            'summary': 'Un grupo de amigos enfrenta una conspiración apocalíptica.',
            'language': 'Japonés'
        },
        
        # MONSTER
        {
            'title': 'Monster Vol. 1',
            'author': 'Naoki Urasawa',
            'pages': 208,
            'isbn': '9781421500881',
            'publication_date': '1995-12-05',
            'genres': ['Misterio', 'Thriller', 'Psicológico', 'Drama'],
            'summary': 'Un neurocirujano persigue a un asesino que salvó.',
            'language': 'Japonés'
        },
        
        # MASTER KEATON
        {
            'title': 'Master Keaton Vol. 1',
            'author': 'Naoki Urasawa',
            'pages': 328,
            'isbn': '9784088716233',
            'publication_date': '1988-10-17',
            'genres': ['Aventura', 'Misterio', 'Slice of Life', 'Drama'],
            'summary': 'Un arqueólogo y ex-SAS resuelve misterios.',
            'language': 'Japonés'
        },
        
        # BAKUMAN
        {
            'title': 'Bakuman. Vol. 1',
            'author': 'Tsugumi Ohba',
            'pages': 200,
            'isbn': '9781421535556',
            'publication_date':'1988-10-17',
            'genres': ['Shonen', 'Drama', 'Slice of Life', 'Comedia'],
            'summary': 'Dos amigos sueñan con convertirse en mangakas profesionales.',
            'language': 'Japonés'
        },
        
        # PLATINUM END
        {
            'title': 'Platinum End Vol. 1',
            'author': 'Tsugumi Ohba',
            'pages': 200,
            'isbn': '9781421593921',
            'publication_date': '2016-01-04',
            'genres': ['Shonen', 'Psicológico', 'Suspenso', 'Supernatural'],
            'summary': 'Un joven se convierte en candidato a ser el próximo Dios.',
            'language': 'Japonés'
        },
        
        # ASSASSINATION CLASSROOM
        {
            'title': 'Assassination Classroom Vol. 1',
            'author': 'Yusei Matsui',
            'pages': 192,
            'isbn': '9781421583410',
            'publication_date': '2012-07-02',
            'genres': ['Shonen', 'Comedia', 'Acción', 'Ciencia Ficción'],
            'summary': 'Estudiantes deben matar a su maestro alienígena antes de que destruya la Tierra.',
            'language': 'Japonés'
        },
        
        # THE PROMISED NEVERLAND
        {
            'title': 'The Promised Neverland Vol. 1',
            'author': 'Kaiu Shirai',
            'pages': 192,
            'isbn': '9781421597127',
            'publication_date': '2016-08-04',
            'genres': ['Shonen', 'Misterio', 'Suspenso', 'Horror'],
            'summary': 'Niños en un orfanato descubren una terrible verdad.',
            'language': 'Japonés'
        },
        
        # CHAINSAW MAN
        {
            'title': 'Chainsaw Man Vol. 1',
            'author': 'Tatsuki Fujimoto',
            'pages': 192,
            'isbn': '9781974710028',
            'publication_date': '2019-03-04',
            'genres': ['Shonen', 'Acción', 'Horror', 'Comedia Negra'],
            'summary': 'Denji se fusiona con su mascota demonio para convertirse en Chainsaw Man.',
            'language': 'Japonés'
        },
        
        # FIRE PUNCH
        {
            'title': 'Fire Punch Vol. 1',
            'author': 'Tatsuki Fujimoto',
            'pages': 192,
            'isbn': '9781421595222',
            'publication_date': '2016-04-18',
            'genres': ['Seinen', 'Horror', 'Psicológico', 'Post-Apocalíptico'],
            'summary': 'Un hombre con poderes de regeneración busca venganza.',
            'language': 'Japonés'
        },
        
        # SPY x FAMILY
        {
            'title': 'Spy x Family Vol. 1',
            'author': 'Tatsuya Endo',
            'pages': 200,
            'isbn': '9781974721024',
            'publication_date': '2019-07-03',
            'genres': ['Shonen', 'Comedia', 'Acción', 'Slice of Life'],
            'summary': 'Un espía, una asesina y una niña telepática forman una familia falsa.',
            'language': 'Japonés'
        },
        
        # KAGUYA-SAMA: LOVE IS WAR
        {
            'title': 'Kaguya-sama: Love is War Vol. 1',
            'author': 'Aka Akasaka',
            'pages': 192,
            'isbn': '9781421599848',
            'publication_date': '2016-03-18',
            'genres': ['Seinen', 'Comedia', 'Romance', 'Psicológico'],
            'summary': 'Dos genios tratan de hacer que el otro se confiese primero.',
            'language': 'Japonés'
        },
        
        # OSHI NO KO
        {
            'title': 'Oshi no Ko Vol. 1',
            'author': 'Aka Akasaka',
            'pages': 192,
            'isbn': '9781974736165',
            'publication_date': '2020-07-17',
            'genres': ['Seinen', 'Drama', 'Misterio', 'Suspenso'],
            'summary': 'Un ginecólogo es reencarnado como el hijo de su idol favorita.',
            'language': 'Japonés'
        },
        
        # BLUE PERIOD
        {
            'title': 'Blue Period Vol. 1',
            'author': 'Tsubasa Yamaguchi',
            'pages': 192,
            'isbn': '9781646511191',
            'publication_date': '2017-08-24',
            'genres': ['Seinen', 'Drama', 'Slice of Life', 'Arte'],
            'summary': 'Un estudiante descubre su pasión por la pintura.',
            'language': 'Japonés'
        },
        
        # GRAND BLUE
        {
            'title': 'Grand Blue Dreaming Vol. 1',
            'author': 'Kenji Inoue',
            'pages': 192,
            'isbn': '9784041059062',
            'publication_date': '2014-04-07',
            'genres': ['Seinen', 'Comedia', 'Slice of Life', 'Deportes'],
            'summary': 'Un universitario se une al club de buceo lleno de excéntricos.',
            'language': 'Japonés'
        },
        
        # KINGDOM
        {
            'title': 'Kingdom Vol. 1',
            'author': 'Yasuhisa Hara',
            'pages': 400,
            'isbn': '9784088772131',
            'publication_date': '2006-01-26',
            'genres': ['Seinen', 'Histórico', 'Acción', 'Militar'],
            'summary': 'Un esclavo sueña con convertirse en el mayor general de China.',
            'language': 'Japonés'
        },
        
        # BLAME!
        {
            'title': 'Blame! Vol. 1',
            'author': 'Tsutomu Nihei',
            'pages': 200,
            'isbn': '9781595820105',
            'publication_date': '1998-06-19',
            'genres': ['Seinen', 'Ciencia Ficción', 'Cyberpunk', 'Misterio'],
            'summary': 'Un hombre busca humanos con genes no infectados en una megaestructura.',
            'language': 'Japonés'
        },
        
        # KNIGHTS OF SIDONIA
        {
            'title': 'Knights of Sidonia Vol. 1',
            'author': 'Tsutomu Nihei',
            'pages': 200,
            'isbn': '9781935654668',
            'publication_date': '2009-04-23',
            'genres': ['Seinen', 'Ciencia Ficción', 'Mecha', 'Espacio'],
            'summary': 'La última humanidad en una nave espacial lucha contra aliens.',
            'language': 'Japonés'
        },
        
        # DOROHEDORO
        {
            'title': 'Dorohedoro Vol. 1',
            'author': 'Q Hayashida',
            'pages': 224,
            'isbn': '9781421533637',
            'publication_date': '2002-11-30',
            'genres': ['Seinen', 'Horror', 'Comedia Negra', 'Fantasía'],
            'summary': 'Un hombre con cabeza de lagarto busca al mago que lo maldijo.',
            'language': 'Japonés'
        },
        
        # DAI DARK
        {
            'title': 'Dai Dark Vol. 1',
            'author': 'Q Hayashida',
            'pages': 200,
            'isbn': '9781974721253',
            'publication_date': '2019-11-21',
            'genres': ['Seinen', 'Ciencia Ficción', 'Comedia', 'Aventura'],
            'summary': 'Un esqueleto viaja por el espacio siendo perseguido por su poder.',
            'language': 'Japonés'
        },
        
        # SOLANIN
        {
            'title': 'Solanin',
            'author': 'Inio Asano',
            'pages': 426,
            'isbn': '9781421519174',
            'publication_date': '2006-03-23',
            'genres': ['Seinen', 'Drama', 'Slice of Life', 'Romance'],
            'summary': 'Jóvenes adultos enfrentan la transición a la vida laboral.',
            'language': 'Japonés'
        },
        
        # GOODNIGHT PUNPUN
        {
            'title': 'Goodnight Punpun Vol. 1',
            'author': 'Inio Asano',
            'pages': 432,
            'isbn': '9781421586205',
            'publication_date': '2007-03-30',
            'genres': ['Seinen', 'Drama', 'Psicológico', 'Tragedia'],
            'summary': 'La vida de Punpun Onodera desde la infancia hasta la adultez.',
            'language': 'Japonés'
        },
        
        # DEAD DEAD DEMON\'S DEDEDEDE DESTRUCTION
        {
            'title': 'Dead Dead Demon\'s Dededede Destruction Vol. 1',
            'author': 'Inio Asano',
            'pages': 240,
            'isbn': '9784088800230',
            'publication_date': '2014-04-28',
            'genres': ['Seinen', 'Ciencia Ficción', 'Drama', 'Slice of Life'],
            'summary': 'Adolescentes viven sus vidas mientras una nave alienígena flota sobre Tokio.',
            'language': 'Japonés'
        },
        
        # K-ON!
        {
            'title': 'K-On! Vol. 1',
            'author': 'Kakifly',
            'pages': 124,
            'isbn': '9780316084199',
            'publication_date': '2008-04-26',
            'genres': ['Slice of Life', 'Comedia', 'Música', 'Escolar'],
            'summary': 'Cuatro chicas forman un club de música ligera.',
            'language': 'Japonés'
        },
        
        # LUCKY STAR
        {
            'title': 'Lucky Star Vol. 1',
            'author': 'Kagami Yoshimizu',
            'pages': 180,
            'isbn': '9781598169540',
            'publication_date': '2004-01-26',
            'genres': ['Slice of Life', 'Comedia', 'Escolar', 'Parodia'],
            'summary': 'La vida cotidiana de cuatro chicas de preparatoria.',
            'language': 'Japonés'
        },
        
        # AZUMANGA DAIOH
        {
            'title': 'Azumanga Daioh Vol. 1',
            'author': 'Kiyohiko Azuma',
            'pages': 152,
            'isbn': '9781595329602',
            'publication_date': '2000-02-22',
            'genres': ['Slice of Life', 'Comedia', 'Escolar', 'Yonkoma'],
            'summary': 'La vida de seis chicas durante sus tres años de preparatoria.',
            'language': 'Japonés'
        },
        
        # YOTSUBA&!
        {
            'title': 'Yotsuba&! Vol. 1',
            'author': 'Kiyohiko Azuma',
            'pages': 224,
            'isbn': '9780316346342',
            'publication_date': '2003-03-21',
            'genres': ['Slice of Life', 'Comedia', 'Kodomo', 'Familiar'],
            'summary': 'Las aventuras de una niña curiosa y su padre adoptivo.',
            'language': 'Japonés'
        },
        
        # BARAKAMON
        {
            'title': 'Barakamon Vol. 1',
            'author': 'Satsuki Yoshino',
            'pages': 160,
            'isbn': '9780316345901',
            'publication_date': '2009-02-12',
            'genres': ['Slice of Life', 'Comedia', 'Drama', 'Arte'],
            'summary': 'Un calígrafo se muda a una isla remota tras un incidente.',
            'language': 'Japonés'
        },
        
        # SILENT VOICE
        {
            'title': 'A Silent Voice Vol. 1',
            'author': 'Yoshitoki Ōima',
            'pages': 192,
            'isbn': '9781632360564',
            'publication_date': '2013-08-07',
            'genres': ['Drama', 'Romance', 'Escolar', 'Discapacidad'],
            'summary': 'Un ex-bully busca redención con una chica sorda que molestaba.',
            'language': 'Japonés'
        },
        
        # TO YOUR ETERNITY
        {
            'title': 'To Your Eternity Vol. 1',
            'author': 'Yoshitoki Ōima',
            'pages': 192,
            'isbn': '9781632365712',
            'publication_date': '2016-11-09',
            'genres': ['Fantasía', 'Drama', 'Aventura', 'Tragedia'],
            'summary': 'Un ser inmortal que puede tomar cualquier forma.',
            'language': 'Japonés'
        },
        
        # HAIKYUU!!
        {
            'title': 'Haikyuu!! Vol. 1',
            'author': 'Haruichi Furudate',
            'pages': 192,
            'isbn': '9781421587660',
            'publication_date': '2012-02-20',
            'genres': ['Shonen', 'Deportes', 'Comedia', 'Drama'],
            'summary': 'Un equipo de voleibol de preparatoria busca llegar a nacionales.',
            'language': 'Japonés'
        },
        
        # KUROKO\'S BASKETBALL
        {
            'title': 'Kuroko\'s Basketball Vol. 1',
            'author': 'Tadatoshi Fujimaki',
            'pages': 192,
            'isbn': '9781421553269',
            'publication_date': '2008-12-08',
            'genres': ['Shonen', 'Deportes', 'Acción', 'Superpoderes'],
            'summary': 'Un equipo de baloncesto con miembros excepcionales.',
            'language': 'Japonés'
        },
        
        # EYESHIELD 21
        {
            'title': 'Eyeshield 21 Vol. 1',
            'author': 'Riichiro Inagaki',
            'pages': 200,
            'isbn': '9781591167570',
            'publication_date': '2002-07-01',
            'genres': ['Shonen', 'Deportes', 'Comedia', 'Acción'],
            'summary': 'Un estudiante se convierte en el corredor estrella de fútbol americano.',
            'language': 'Japonés'
        },
        
        # AO ASHI
        {
            'title': 'Ao Ashi Vol. 1',
            'author': 'Yūgo Kobayashi',
            'pages': 200,
            'isbn': '9784088812918',
            'publication_date': '2015-08-04',
            'genres': ['Shonen', 'Deportes', 'Drama', 'Slice of Life'],
            'summary': 'Un talentoso jugador de fútbol se une a un prestigioso club juvenil.',
            'language': 'Japonés'
        },
        
        # BLUE LOCK
        {
            'title': 'Blue Lock Vol. 1',
            'author': 'Muneyuki Kaneshiro',
            'pages': 192,
            'isbn': '9781646091079',
            'publication_date': '2018-08-01',
            'genres': ['Shonen', 'Deportes', 'Psicológico', 'Acción'],
            'summary': '300 delanteros compiten para convertirse en el mejor del mundo.',
            'language': 'Japonés'
        },
        
        # PRISON SCHOOL
        {
            'title': 'Prison School Vol. 1',
            'author': 'Akira Hiramoto',
            'pages': 208,
            'isbn': '9781626921259',
            'publication_date': '2011-10-04',
            'genres': ['Seinen', 'Comedia', 'Ecchi', 'Drama'],
            'summary': 'Cinco chicos son los primeros estudiantes varones en una escuela femenina.',
            'language': 'Japonés'
        },
        
        # GOLDEN KAMUY
        {
            'title': 'Golden Kamuy Vol. 1',
            'author': 'Satoru Noda',
            'pages': 192,
            'isbn': '9781421597041',
            'publication_date': '2014-08-21',
            'genres': ['Seinen', 'Histórico', 'Aventura', 'Acción'],
            'summary': 'Un veterano de guerra busca un tesoro escondido en Hokkaido.',
            'language': 'Japonés'
        },
        
        # HELL\'S PARADISE
        {
            'title': 'Hell\'s Paradise: Jigokuraku Vol. 1',
            'author': 'Yuji Kaku',
            'pages': 192,
            'isbn': '9781974710554',
            'publication_date': '2018-01-22',
            'genres': ['Seinen', 'Acción', 'Fantasía', 'Horror'],
            'summary': 'Criminales condenados buscan el elixir de la vida en una isla misteriosa.',
            'language': 'Japonés'
        },
        
        # DANDADAN
        {
            'title': 'Dandadan Vol. 1',
            'author': 'Yukinobu Tatsu',
            'pages': 216,
            'isbn': '9781974736097',
            'publication_date': '2021-04-06',
            'genres': ['Shonen', 'Acción', 'Comedia', 'Supernatural'],
            'summary': 'Un chico que cree en fantasmas y una chica que cree en aliens buscan pruebas.',
            'language': 'Japonés'
        },
        
        # KAJI
        {
            'title': 'Kaji: The Ultimate Survivor Vol. 1',
            'author': 'Nobuyuki Fukumoto',
            'pages': 200,
            'isbn': '9784088588728',
            'publication_date': '1996-08-26',
            'genres': ['Seinen', 'Drama', 'Psicológico', 'Suspenso'],
            'summary': 'Un estudiante es forzado a trabajar para pagar la deuda de sus padres.',
            'language': 'Japonés'
        },
        
        # AKAGI
        {
            'title': 'Akagi Vol. 1',
            'author': 'Nobuyuki Fukumoto',
            'pages': 220,
            'isbn': '9784088589107',
            'publication_date': '1992-04-27',
            'genres': ['Seinen', 'Juego', 'Psicológico', 'Drama'],
            'summary': 'Un genio del mahjong juega por su vida.',
            'language': 'Japonés'
        },
        
        # SANCTUARY
        {
            'title': 'Sanctuary Vol. 1',
            'author': 'Sho Fumimura',
            'pages': 350,
            'isbn': '9784088514987',
            'publication_date': '1990-10-09',
            'genres': ['Seinen', 'Política', 'Drama', 'Acción'],
            'summary': 'Dos amigos buscan cambiar Japón desde dentro de la política y la mafia.',
            'language': 'Japonés'
        },
        
        # COCCO
        {
            'title': 'Cocco Vol. 1',
            'author': 'Tochi Ueyama',
            'pages': 192,
            'isbn': '9784088740996',
            'publication_date': '1997-11-17',
            'genres': ['Seinen', 'Culinario', 'Drama', 'Slice of Life'],
            'summary': 'Un chef busca la receta perfecta de curry.',
            'language': 'Japonés'
        },
        
        # BECK
        {
            'title': 'Beck Vol. 1',
            'author': 'Harold Sakuishi',
            'pages': 192,
            'isbn': '9781591164746',
            'publication_date': '2000-02-15',
            'genres': ['Shonen', 'Música', 'Drama', 'Slice of Life'],
            'summary': 'Un adolescente descubre su pasión por la guitarra.',
            'language': 'Japonés'
        },
        
        # NANA
        {
            'title': 'Nana Vol. 1',
            'author': 'Ai Yazawa',
            'pages': 192,
            'isbn': '9781591169208',
            'publication_date': '2000-05-15',
            'genres': ['Shojo', 'Drama', 'Romance', 'Música'],
            'summary': 'Dos chicas llamadas Nana se convierten en roommates en Tokio.',
            'language': 'Japonés'
        },
        
        # PARADISE KISS
        {
            'title': 'Paradise Kiss Vol. 1',
            'author': 'Ai Yazawa',
            'pages': 192,
            'isbn': '9781569709508',
            'publication_date': '1999-08-10',
            'genres': ['Shojo', 'Romance', 'Drama', 'Moda'],
            'summary': 'Una estudiante es reclutada por diseñadores de moda.',
            'language': 'Japonés'
        },
        
        # FRUITS BASKET
        {
            'title': 'Fruits Basket Vol. 1',
            'author': 'Natsuki Takaya',
            'pages': 216,
            'isbn': '9781591826037',
            'publication_date': '1999-07-19',
            'genres': ['Shojo', 'Romance', 'Comedia', 'Supernatural'],
            'summary': 'Una chica vive con una familia maldecida que se transforma en animales del zodiaco.',
            'language': 'Japonés'
        },
        
        # OURAN HIGH SCHOOL HOST CLUB
        {
            'title': 'Ouran High School Host Club Vol. 1',
            'author': 'Bisco Hatori',
            'pages': 184,
            'isbn': '9781598165252',
            'publication_date': '2003-09-05',
            'genres': ['Shojo', 'Comedia', 'Romance', 'Parodia'],
            'summary': 'Una estudiante becada debe trabajar en un club de hosts para pagar un jarrón roto.',
            'language': 'Japonés'
        },
        
        # VAMPIRE KNIGHT
        {
            'title': 'Vampire Knight Vol. 1',
            'author': 'Matsuri Hino',
            'pages': 192,
            'isbn': '9781421510668',
            'publication_date': '2004-05-24',
            'genres': ['Shojo', 'Romance', 'Vampiros', 'Drama'],
            'summary': 'Una guardiana protege a los vampiros en una academia nocturna.',
            'language': 'Japonés'
        },
        
        # KAMISAMA HAJIMEMASHITA
        {
            'title': 'Kamisama Hajimemashita Vol. 1',
            'author': 'Julietta Suzuki',
            'pages': 180,
            'isbn': '9784757522584',
            'publication_date': '2008-07-03',
            'genres': ['Shojo', 'Romance', 'Fantasía', 'Comedia'],
            'summary': 'Una chica sin hogar se convierte en diosa de un santuario.',
            'language': 'Japonés'
        },
        
        # YONA OF THE DAWN
        {
            'title': 'Yona of the Dawn Vol. 1',
            'author': 'Mizuho Kusanagi',
            'pages': 200,
            'isbn': '9781421587819',
            'publication_date': '2009-08-05',
            'genres': ['Shojo', 'Aventura', 'Fantasía', 'Romance'],
            'summary': 'Una princesa debe reunir a los guerreros dragón para reclamar su trono.',
            'language': 'Japonés'
        },
        
        # APOTHECARY DIARIES
        {
            'title': 'The Apothecary Diaries Vol. 1',
            'author': 'Natsu Hyūga',
            'pages': 192,
            'isbn': '9781975314723',
            'publication_date': '2017-08-25',
            'genres': ['Misterio', 'Histórico', 'Drama', 'Medicina'],
            'summary': 'Una farmacéutica resuelve misterios en el palacio imperial.',
            'language': 'Japonés'
        },
        
        # ASCENDANCE OF A BOOKWORM
        {
            'title': 'Ascendance of a Bookworm Vol. 1',
            'author': 'Miya Kazuki',
            'pages': 320,
            'isbn': '9781718350009',
            'publication_date': '2015-09-27',
            'genres': ['Isekai', 'Fantasía', 'Slice of Life', 'Drama'],
            'summary': 'Una amante de los libros reencarna en un mundo sin ellos y decide crearlos.',
            'language': 'Japonés'
        },
        
        # THAT TIME I GOT REINCARNATED AS A SLIME
        {
            'title': 'That Time I Got Reincarnated as a Slime Vol. 1',
            'author': 'Fuse',
            'pages': 192,
            'isbn': '9781626923703',
            'publication_date': '2015-03-30',
            'genres': ['Isekai', 'Fantasía', 'Comedia', 'Aventura'],
            'summary': 'Un hombre reencarna como un slime en un mundo de fantasía.',
            'language': 'Japonés'
        },
        
        # RE:ZERO
        {
            'title': 'Re:Zero − Starting Life in Another World Vol. 1',
            'author': 'Tappei Nagatsuki',
            'pages': 256,
            'isbn': '9780316315305',
            'publication_date': '2014-01-24',
            'genres': ['Isekai', 'Fantasía', 'Drama', 'Psicológico'],
            'summary': 'Un chico obtiene el poder de volver en el tiempo al morir.',
            'language': 'Japonés'
        },
        
        # KONOSUBA
        {
            'title': 'KonoSuba: God\'s Blessing on This Wonderful World! Vol. 1',
            'author': 'Natsume Akatsuki',
            'pages': 256,
            'isbn': '9780316272470',
            'publication_date': '2013-10-01',
            'genres': ['Isekai', 'Comedia', 'Fantasía', 'Parodia'],
            'summary': 'Un NEET reencarna en un mundo de fantasía con una diosa inútil.',
            'language': 'Japonés'
        },
        
        # OVERLORD
        {
            'title': 'Overlord Vol. 1',
            'author': 'Kugane Maruyama',
            'pages': 256,
            'isbn': '9780316543792',
            'publication_date': '2012-07-30',
            'genres': ['Isekai', 'Fantasía', 'Acción', 'Dark Fantasy'],
            'summary': 'Un jugador queda atrapado en un MMORPG como su personaje no-muerto.',
            'language': 'Japonés'
        },
        
        # THE RISING OF THE SHIELD HERO
        {
            'title': 'The Rising of the Shield Hero Vol. 1',
            'author': 'Aneko Yusagi',
            'pages': 256,
            'isbn': '9781626923239',
            'publication_date': '2013-08-22',
            'genres': ['Isekai', 'Fantasía', 'Acción', 'Drama'],
            'summary': 'Un chico es convocado como el despreciado Héroe del Escudo.',
            'language': 'Japonés'
        },
        
        # MUSHOKU TENSEI
        {
            'title': 'Mushoku Tensei: Jobless Reincarnation Vol. 1',
            'author': 'Rifujin na Magonote',
            'pages': 256,
            'isbn': '9781718350008',
            'publication_date': '2014-01-23',
            'genres': ['Isekai', 'Fantasía', 'Drama', 'Aventura'],
            'summary': 'Un NEET reencarna en un mundo de magia y decide vivir sin arrepentimientos.',
            'language': 'Japonés'
        },
        
        # SO I\'M A SPIDER, SO WHAT?
        {
            'title': 'So I\'m a Spider, So What? Vol. 1',
            'author': 'Okina Baba',
            'pages': 256,
            'isbn': '9781975385711',
            'publication_date': '2015-12-10',
            'genres': ['Isekai', 'Fantasía', 'Comedia', 'Aventura'],
            'summary': 'Una estudiante reencarna como una araña en un calabozo.',
            'language': 'Japonés'
        },
    ]
    
    # Diccionario para mapear nombres de autores a objetos
    author_dict = {author.name: author for author in authors}
    genre_dict = {genre.name: genre for genre in genres}
    
    books_created = []
    for book_data in books_data:
        author_name = book_data['author']
        
        # Verificar si el autor existe
        if author_name not in author_dict:
            print(f"⚠️ Autor no encontrado: {author_name}")
            continue
        
        # Buscar o crear el libro
        book, created = Book.objects.get_or_create(
            title=book_data['title'],
            defaults={
                'author': author_dict[author_name],
                'pages': book_data['pages'],
                'isbn': book_data['isbn'],
                'publication_date': book_data['publication_date']
            }
        )
        
        # Asignar géneros
        for genre_name in book_data['genres']:
            if genre_name in genre_dict:
                book.genres.add(genre_dict[genre_name])
        
        # Crear detalles del libro
        BookDetails.objects.get_or_create(
            book=book,
            defaults={
                'summary': book_data['summary'],
                'cover_url': f"https://covers.example.com/{book.id}.jpg",
                'language': book_data['language']
            }
        )
        
        books_created.append(book)
        
        if created:
            print(f"📚 Creado: {book.title}")
    
    print(f"✅ {len(books_created)} libros creados")
    return books_created

def create_reviews(users, books):
    """Crear reseñas aleatorias"""
    reviews_created = 0
    
    for book in books:
        # Crear entre 3-8 reseñas por libro
        num_reviews = random.randint(3, 8)
        reviewers = random.sample(list(users), min(num_reviews, len(users)))
        
        for user in reviewers:
            # Verificar si ya existe una reseña de este usuario para este libro
            if not Review.objects.filter(user=user, book=book).exists():
                Review.objects.create(
                    user=user,
                    book=book,
                    rating=random.randint(1, 5),
                    comment=f"¡{random.choice(['Increíble', 'Genial', 'Bueno', 'Regular', 'Mal'])}! {random.choice(['Me encantó', 'Lo recomiendo', 'No está mal', 'Podría ser mejor'])}."
                )
                reviews_created += 1
    
    print(f"✅ {reviews_created} reseñas creadas")

def create_loans(users, books):
    """Crear préstamos aleatorios"""
    loans_created = 0
    
    for _ in range(150):  # Crear 150 préstamos
        user = random.choice(users)
        book = random.choice(books)
        
        # Verificar si ya existe un préstamo activo
        if not Loan.objects.filter(user=user, book=book, is_returned=False).exists():
            loan_date = date.today() - timedelta(days=random.randint(1, 90))
            
            loan = Loan.objects.create(
                user=user,
                book=book,
                loan_date=loan_date,
                is_returned=random.choice([True, False])
            )
            
            # Si está devuelto, agregar fecha de devolución
            if loan.is_returned:
                loan.return_date = loan_date + timedelta(days=random.randint(7, 30))
                loan.save()
            
            loans_created += 1
    
    print(f"✅ {loans_created} préstamos creados")

def create_recommendations(users, books):
    """Crear recomendaciones aleatorias"""
    recommendations_created = 0
    
    for _ in range(100):  # Crear 100 recomendaciones
        user = random.choice(users)
        book = random.choice(books)
        
        # Verificar si ya existe una recomendación
        if not Recommendation.objects.filter(user=user, book=book).exists():
            Recommendation.objects.create(
                user=user,
                book=book,
                note=random.choice([
                    "¡Debes leer esto!",
                    "Una obra maestra",
                    "Mi favorito personal",
                    "Te va a encantar",
                    "No te lo pierdas"
                ])
            )
            recommendations_created += 1
    
    print(f"✅ {recommendations_created} recomendaciones creadas")

def main():
    """Función principal"""
    print("=" * 50)
    print("INICIANDO POBLACIÓN DE BASE DE DATOS MINILIBRARY")
    print("=" * 50)
    
    # 1. Crear superusuario
    create_superuser()
    
    # 2. Crear usuarios normales
    users = create_users()
    
    # 3. Crear géneros
    genres = create_genres()
    
    # 4. Crear autores
    authors = create_authors()
    
    # 5. Crear libros
    books = create_books(authors, genres)
    
    # 6. Crear reseñas
    create_reviews(users, books)
    
    # 7. Crear préstamos
    create_loans(users, books)
    
    # 8. Crear recomendaciones
    create_recommendations(users, books)
    
    # 9. Mostrar estadísticas
    print("\n" + "=" * 50)
    print("ESTADÍSTICAS FINALES")
    print("=" * 50)
    print(f"📚 Libros: {Book.objects.count()}")
    print(f"👥 Usuarios: {User.objects.count()}")
    print(f"✍️ Autores: {Author.objects.count()}")
    print(f"🏷️ Géneros: {Genre.objects.count()}")
    print(f"⭐ Reseñas: {Review.objects.count()}")
    print(f"📖 Préstamos: {Loan.objects.count()}")
    print(f"💭 Recomendaciones: {Recommendation.objects.count()}")
    print("=" * 50)
    print("✅ POBLACIÓN COMPLETADA EXITOSAMENTE")
    print("=" * 50)

if __name__ == "__main__":
    main()