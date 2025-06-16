import pymysql
from app.core.config import settings

def create_database():
    # Connect to MySQL server
    conn = pymysql.connect(
        host=settings.MYSQL_HOST,
        port=int(settings.MYSQL_PORT),
        user=settings.MYSQL_USER,
        password=settings.MYSQL_PASSWORD
    )
    
    try:
        with conn.cursor() as cursor:
            # Create database if it doesn't exist
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS {settings.MYSQL_DB}")
            print(f"Database '{settings.MYSQL_DB}' created or already exists")
    finally:
        conn.close()

if __name__ == "__main__":
    create_database() 