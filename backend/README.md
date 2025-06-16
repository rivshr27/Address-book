# Address Book API

A RESTful API for managing contacts built with FastAPI and PostgreSQL.

## Features

- User authentication with JWT
- CRUD operations for contacts
- PostgreSQL database
- Input validation
- Swagger documentation

## Prerequisites

- Python 3.8+
- PostgreSQL
- pip (Python package manager)

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file in the backend directory with the following content:
```
POSTGRES_SERVER=localhost
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DB=addressbook
```

4. Create the database:
```bash
createdb addressbook
```

5. Run the application:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the application is running, you can access:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/token` - Login and get access token

### Contacts
- GET `/api/contacts` - List all contacts
- POST `/api/contacts` - Create a new contact
- GET `/api/contacts/{contact_id}` - Get a specific contact
- PUT `/api/contacts/{contact_id}` - Update a contact
- DELETE `/api/contacts/{contact_id}` - Delete a contact

## Security

- All endpoints except registration and login require authentication
- Passwords are hashed using bcrypt
- JWT tokens are used for authentication
- Input validation is performed using Pydantic 