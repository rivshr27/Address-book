# Address Book API

A RESTful API for managing contacts built with FastAPI and MySQL.

## Features

- User authentication with JWT
- CRUD operations for contacts
- MySQL database
- Input validation
- Swagger documentation

## Prerequisites

- Python 3.8+
- MySQL
- pip (Python package manager)

## Setup

1. Create a virtual environment:

bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate


2. Install dependencies:

bash
pip install -r requirements.txt


3. Create a .env file in the backend directory with the following content:


MYSQL_SERVER=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DB=addressbook


4. Create the database:

bash
# Using MySQL command line
mysql -u root -p
CREATE DATABASE addressbook;


5. Run the application:

bash
uvicorn app.main:app --reload


The API will be available at http://localhost:8000

## API Documentation

Once the application is running, you can access:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## API Endpoints

### Authentication

- POST /api/auth/register - Register a new user
- POST /api/auth/token - Login and get access token

### Contacts

- GET /api/contacts - List all contacts
- POST /api/contacts - Create a new contact
- GET /api/contacts/{contact_id} - Get a specific contact
- PUT /api/contacts/{contact_id} - Update a contact
- DELETE /api/contacts/{contact_id} - Delete a contact

## Security

- All endpoints except registration and login require authentication
- Passwords are hashed using bcrypt
- JWT tokens are used for authentication
- Input validation is performed using Pydantic
