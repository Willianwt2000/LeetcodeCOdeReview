import os
import subprocess
import sys

def reset_database():
    """Resetea completamente la base de datos y migraciones"""
    
    print("=" * 60)
    print("🔄 RESETEO COMPLETO DE BASE DE DATOS Y MIGRACIONES")
    print("=" * 60)
    
    # 1. Eliminar migraciones
    print("\n🗑️  1. Eliminando migraciones...")
    migrations = [
        "find . -path '*/migrations/*.py' -not -name '__init__.py' -delete",
        "find . -path '*/migrations/*.pyc' -delete",
    ]
    
    for cmd in migrations:
        subprocess.run(cmd, shell=True, check=True)
    
    print("✅ Migraciones eliminadas")
    
    # 2. Resetear base de datos PostgreSQL
    print("\n🗑️  2. Limpiando base de datos PostgreSQL...")
    
    import psycopg2
    from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
    
    try:
        conn = psycopg2.connect(
            host="dpg-d5torm0gjchc73ca8t50-a.oregon-postgres.render.com",
            database="djangodb_ypzl",
            user="willian",
            password="GgdNvaC8Q5iVPHyJFA0zGKW294LRuCJm",
            port=5432
        )
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cursor = conn.cursor()
        
        # Obtener todas las tablas
        cursor.execute("""
            SELECT tablename 
            FROM pg_tables 
            WHERE schemaname = 'public';
        """)
        
        tables = cursor.fetchall()
        
        if tables:
            # Eliminar tablas una por una
            for table in tables:
                cursor.execute(f'DROP TABLE IF EXISTS "{table[0]}" CASCADE;')
                print(f"   Eliminada tabla: {table[0]}")
        
        # Reiniciar secuencias
        cursor.execute("""
            SELECT sequence_name 
            FROM information_schema.sequences 
            WHERE sequence_schema = 'public';
        """)
        
        sequences = cursor.fetchall()
        for seq in sequences:
            cursor.execute(f'DROP SEQUENCE IF EXISTS "{seq[0]}" CASCADE;')
        
        cursor.close()
        conn.close()
        print("✅ Base de datos PostgreSQL limpiada")
        
    except Exception as e:
        print(f"⚠️  Error limpiando PostgreSQL: {e}")
        print("Intentando continuar...")
    
    # 3. Crear nuevas migraciones
    print("\n🔄 3. Creando nuevas migraciones...")
    subprocess.run([sys.executable, "manage.py", "makemigrations"], check=True)
    print("✅ Migraciones creadas")
    
    # 4. Aplicar migraciones
    print("\n📦 4. Aplicando migraciones...")
    subprocess.run([sys.executable, "manage.py", "migrate"], check=True)
    print("✅ Migraciones aplicadas")
    
    # 5. Crear superusuario
    print("\n👑 5. Creando superusuario...")
    create_superuser = input("¿Crear superusuario? (s/n): ").lower()
    
    if create_superuser == 's':
        subprocess.run([sys.executable, "manage.py", "createsuperuser"])
    
    print("\n" + "=" * 60)
    print("✅ RESETEO COMPLETADO EXITOSAMENTE!")
    print("=" * 60)
    
    print("\n🎯 Para poblar con datos de anime, ejecuta:")
    print("   python populate_anime.py")

if __name__ == "__main__":
    reset_database()