-- ============================================================
-- SCRIPT SQL PARA POBLAR BIBLIOTECA DE ANIME (CORREGIDO)
-- ============================================================

-- NOTA: Primero elimina todos los datos si ya los insertaste
TRUNCATE TABLE 
    minilibrary_loan, 
    minilibrary_review, 
    minilibrary_bookdetails, 
    minilibrary_book_genres,
    minilibrary_book, 
    minilibrary_genre, 
    minilibrary_author 
CASCADE;

-- ============================================================
-- 1. INSERTAR AUTORES
-- ============================================================
INSERT INTO minilibrary_author (id, name, birth_date, country, biography) VALUES
(1, 'Eiichiro Oda', '1975-01-01', 'Japón', 'Creador de One Piece, el manga más vendido de la historia con más de 500 millones de copias. Conocido por su creatividad y mundo expansivo.'),
(2, 'Masashi Kishimoto', '1974-11-08', 'Japón', 'Creador de Naruto, una de las series de manga más influyentes de todos los tiempos. Su trabajo inspiró a toda una generación.'),
(3, 'Hajime Isayama', '1986-08-29', 'Japón', 'Creador de Attack on Titan, conocido por su trama compleja y giros sorprendentes. La serie explora temas profundos de libertad y opresión.'),
(4, 'Kohei Horikoshi', '1986-11-20', 'Japón', 'Creador de My Hero Academia, que revitalizó el género de superhéroes en el manga. Inspirado en cómics occidentales.'),
(5, 'Akira Toriyama', '1955-04-05', 'Japón', 'Creador de Dragon Ball, icono cultural que definió el shonen moderno. También creador de Dr. Slump y diseñador de personajes para Dragon Quest.'),
(6, 'Hirohiko Araki', '1960-06-07', 'Japón', 'Creador de JoJo''s Bizarre Adventure, famoso por su estilo artístico único y referencias culturales. La serie lleva más de 30 años en publicación.'),
(7, 'Takehiko Inoue', '1967-01-12', 'Japón', 'Creador de Slam Dunk y Vagabond. Conocido por su arte detallado y realista, así como por su profundo desarrollo de personajes.'),
(8, 'Yoshihiro Togashi', '1966-04-27', 'Japón', 'Creador de Yu Yu Hakusho y Hunter x Hunter. Reconocido por sus sistemas de poder complejos y personajes memorables.'),
(9, 'Koyoharu Gotouge', '1989-05-05', 'Japón', 'Creador de Demon Slayer: Kimetsu no Yaiba. Logró un éxito fenomenal en poco tiempo, rompiendo récords de ventas.'),
(10, 'Gege Akutami', '1992-02-26', 'Japón', 'Creador de Jujutsu Kaisen, una de las series shonen más populares de la nueva generación.');

-- ============================================================
-- 2. INSERTAR GÉNEROS
-- ============================================================
INSERT INTO minilibrary_genre (id, name, description) VALUES
(1, 'Shonen', 'Manga dirigido principalmente a adolescentes varones. Caracterizado por acción, amistad y superación personal.'),
(2, 'Shojo', 'Manga dirigido principalmente a adolescentes mujeres. Enfocado en romance, relaciones y emociones.'),
(3, 'Seinen', 'Manga para hombres adultos. Temas más maduros, complejos y a menudo violentos o psicológicos.'),
(4, 'Fantasy', 'Obras con elementos mágicos, mundos imaginarios y seres sobrenaturales.'),
(5, 'Adventure', 'Historias de viajes, descubrimientos y exploración de nuevos lugares.'),
(6, 'Drama', 'Narrativas emocionales intensas con conflictos personales y desarrollo profundo de personajes.'),
(7, 'Comedy', 'Contenido humorístico diseñado para entretener y provocar risas.'),
(8, 'Sci-Fi', 'Ciencia ficción con elementos tecnológicos, futuristas o especulativos.'),
(9, 'Horror', 'Terror y suspenso diseñados para asustar o crear tensión.'),
(10, 'Romance', 'Historias centradas en relaciones amorosas y desarrollo romántico.'),
(11, 'Mystery', 'Historias con elementos detectivescos, secretos y resolución de enigmas.'),
(12, 'Supernatural', 'Elementos sobrenaturales, poderes especiales y fenómenos inexplicables.'),
(13, 'Sports', 'Historias centradas en deportes, competencias y superación atlética.'),
(14, 'Slice of Life', 'Historias cotidianas sobre la vida normal, relaciones y experiencias diarias.');

-- ============================================================
-- 3. INSERTAR LIBROS/MANGAS (SOLO 15 LIBROS PARA COINCIDIR)
-- ============================================================
INSERT INTO minilibrary_book (id, title, publication_date, author_id, pages, isbn, price, stock) VALUES
-- One Piece (Eiichiro Oda - ID 1)
(1, 'One Piece Vol. 1: Romance Dawn', '1997-12-24', 1, 208, '9781569319017', 9.99, 15),
(2, 'One Piece Vol. 2: Buggy the Clown', '1998-04-03', 1, 192, '9781569319024', 9.99, 12),
(3, 'One Piece Vol. 100: Kingdom of the World', '2021-09-03', 1, 216, '9784088827567', 12.99, 8),

-- Naruto (Masashi Kishimoto - ID 2)
(4, 'Naruto Vol. 1: Uzumaki Naruto', '1999-09-21', 2, 192, '9781569319000', 8.99, 10),
(5, 'Naruto Vol. 2: The Worst Client', '2000-03-03', 2, 192, '9781569319014', 8.99, 9),
(6, 'Naruto Vol. 72: Uzumaki Naruto', '2014-11-04', 2, 192, '9781421576841', 10.99, 6),

-- Attack on Titan (Hajime Isayama - ID 3)
(7, 'Attack on Titan Vol. 1', '2009-09-09', 3, 200, '9781612620244', 11.99, 7),
(8, 'Attack on Titan Vol. 2', '2009-12-09', 3, 200, '9781612620251', 11.99, 7),

-- My Hero Academia (Kohei Horikoshi - ID 4)
(9, 'My Hero Academia Vol. 1', '2014-11-04', 4, 192, '9781421582699', 9.99, 14),
(10, 'My Hero Academia Vol. 2', '2015-01-06', 4, 192, '9781421582705', 9.99, 11),

-- Dragon Ball (Akira Toriyama - ID 5)
(11, 'Dragon Ball Vol. 1', '1985-09-10', 5, 192, '9781569319208', 7.99, 20),

-- JoJo's Bizarre Adventure (Hirohiko Araki - ID 6)
(12, 'JoJo''s Bizarre Adventure Part 1: Phantom Blood Vol. 1', '1987-01-01', 6, 400, '9781421550810', 19.99, 6),

-- Slam Dunk (Takehiko Inoue - ID 7)
(13, 'Slam Dunk Vol. 1', '1991-02-08', 7, 192, '9781421501683', 9.99, 9),

-- Hunter x Hunter (Yoshihiro Togashi - ID 8)
(14, 'Hunter x Hunter Vol. 1', '1998-03-03', 8, 192, '9781569319048', 9.99, 10),

-- Demon Slayer (Koyoharu Gotouge - ID 9)
(15, 'Demon Slayer: Kimetsu no Yaiba Vol. 1', '2016-06-03', 9, 192, '9781974700523', 9.99, 18);

-- ============================================================
-- 4. ASIGNAR GÉNEROS A LOS LIBROS (Solo para los 15 libros que existen)
-- ============================================================
INSERT INTO minilibrary_book_genres (book_id, genre_id) VALUES
-- One Piece Vol. 1 (ID: 1)
(1, 1), (1, 5), (1, 6),
-- One Piece Vol. 2 (ID: 2)
(2, 1), (2, 5), (2, 7),
-- One Piece Vol. 100 (ID: 3)
(3, 1), (3, 5), (3, 12),
-- Naruto Vol. 1 (ID: 4)
(4, 1), (4, 5), (4, 12),
-- Naruto Vol. 2 (ID: 5)
(5, 1), (5, 5), (5, 7),
-- Naruto Vol. 72 (ID: 6)
(6, 1), (6, 5), (6, 6),
-- Attack on Titan Vol. 1 (ID: 7)
(7, 1), (7, 9), (7, 11),
-- Attack on Titan Vol. 2 (ID: 8)
(8, 1), (8, 9), (8, 6),
-- My Hero Academia Vol. 1 (ID: 9)
(9, 1), (9, 4), (9, 12),
-- My Hero Academia Vol. 2 (ID: 10)
(10, 1), (10, 4), (10, 13),
-- Dragon Ball Vol. 1 (ID: 11)
(11, 1), (11, 5), (11, 7),
-- JoJo's Vol. 1 (ID: 12)
(12, 1), (12, 5), (12, 12),
-- Slam Dunk Vol. 1 (ID: 13)
(13, 13), (13, 7), (13, 6),
-- Hunter x Hunter Vol. 1 (ID: 14)
(14, 1), (14, 5), (14, 4),
-- Demon Slayer Vol. 1 (ID: 15)
(15, 1), (15, 4), (15, 9);

-- ============================================================
-- 5. INSERTAR DETALLES DE LOS LIBROS (Solo para algunos libros)
-- ============================================================
INSERT INTO minilibrary_bookdetails (book_id, summary, cover_url, language, publisher, edition) VALUES
(1, 'Monkey D. Luffy sueña con convertirse en el Rey de los Piratas. Tras comer la Fruta del Diablo Gomu Gomu, obtiene poderes de goma. En su primer viaje, recluta a Roronoa Zoro como su primer miembro de tripulación.', 'https://m.media-amazon.com/images/I/81N8JYMB8zL.jpg', 'en', 'VIZ Media', 'Shonen Jump'),
(4, 'Naruto Uzumaki es un ninja adolescente que tiene encerrado en su interior al Zorro de Nueve Colas. Su sueño es convertirse en Hokage para que todos lo reconozcan.', 'https://m.media-amazon.com/images/I/71oEG2N-4aL.jpg', 'en', 'VIZ Media', 'Shonen Jump'),
(7, 'La humanidad vive encerrada dentro de ciudades rodeadas por enormes muros que los protegen de los Titanes, seres gigantes que devoran humanos. Eren Jaeger sueña con ver el mundo exterior.', 'https://m.media-amazon.com/images/I/81JZAG6NJ9L.jpg', 'en', 'Kodansha Comics', '1st Edition'),
(9, 'En un mundo donde casi todo el mundo tiene un "Quirk" (superpoder), Izuku Midoriya es parte del pequeño porcentaje sin poderes. Su sueño de ser héroe parece imposible hasta que conoce a All Might.', 'https://m.media-amazon.com/images/I/81DQ4Kq-1dL.jpg', 'en', 'VIZ Media', 'Shonen Jump'),
(11, 'Son Goku es un niño con cola de mono y fuerza sobrehumana que vive solo en las montañas. Su encuentro con Bulma lo lleva a una búsqueda de las Esferas del Dragón.', 'https://m.media-amazon.com/images/I/81B7K2GGeML.jpg', 'en', 'VIZ Media', 'Shonen Jump'),
(15, 'Tanjiro Kamado regresa a casa para encontrar a su familia masacrada por demonios. Solo su hermana Nezuko sobrevive, pero se ha convertido en demonio. Tanjiro se convierte en cazador de demonios para encontrar una cura.', 'https://m.media-amazon.com/images/I/71mGjiSwkPL.jpg', 'en', 'VIZ Media', 'Shonen Jump');

-- ============================================================
-- 6. CREAR ALGUNOS USUARIOS PARA RESEÑAS Y PRÉSTAMOS
-- ============================================================
-- NOTA: Esto depende de tu sistema de autenticación
-- Si usas el sistema por defecto de Django:
INSERT INTO auth_user (password, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) VALUES
('pbkdf2_sha256$600000$abc123$...', false, 'animefan', 'Carlos', 'Gómez', 'carlos@email.com', false, true, NOW()),
('pbkdf2_sha256$600000$def456$...', false, 'mangalover', 'Ana', 'Rodríguez', 'ana@email.com', false, true, NOW()),
('pbkdf2_sha256$600000$ghi789$...', false, 'otakuboy', 'Luis', 'Fernández', 'luis@email.com', false, true, NOW());

-- ============================================================
-- 7. INSERTAR ALGUNAS RESEÑAS
-- ============================================================
INSERT INTO minilibrary_review (user_id, book_id, rating, comment, created_at, updated_at) VALUES
(1, 1, 5, '¡Increíble inicio de una epopeya! Luffy es un protagonista carismático y el mundo de One Piece es fascinante desde el primer momento.', NOW(), NOW()),
(2, 4, 4, 'Naruto me trae muchos recuerdos. La historia de superación es inspiradora, aunque los primeros volúmenes son un poco lentos.', NOW(), NOW()),
(3, 7, 5, 'Attack on Titan te atrapa desde la primera página. El misterio de los titanes y la atmósfera opresiva son excelentes.', NOW(), NOW()),
(1, 9, 4, 'My Hero Academia tiene un concepto fresco en el género de superhéroes. Izuku es un protagonista muy identificable.', NOW(), NOW());

-- ============================================================
-- 8. INSERTAR ALGUNOS PRÉSTAMOS
-- ============================================================
INSERT INTO minilibrary_loan (user_id, book_id, loan_date, due_date, return_date, status, notes) VALUES
(1, 1, NOW() - INTERVAL '10 days', NOW() - INTERVAL '3 days', NULL, 'active', 'Préstamo regular'),
(2, 4, NOW() - INTERVAL '5 days', NOW() + INTERVAL '2 days', NULL, 'active', 'Para proyecto escolar'),
(3, 7, NOW() - INTERVAL '15 days', NOW() - INTERVAL '5 days', NOW() - INTERVAL '2 days', 'returned', 'Devuelto con ligero desgaste');