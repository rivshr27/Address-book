# Address Book API

A RESTful API for managing contacts, built with FastAPI and MySQL.

---

## Features

- User authentication with JWT
- CRUD operations for contacts
- MySQL database integration
- Input validation with Pydantic
- Interactive API documentation (Swagger & ReDoc)

---

## Prerequisites

- Python 3.8+
- MySQL
- pip (Python package manager)

---

## Setup Instructions

### 1. Create a Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Create a `.env` file in the `backend` directory with the following content:

```
MYSQL_SERVER=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DB=addressbook
```

### 4. Create the Database

```bash
# Using MySQL command line
mysql -u root -p
CREATE DATABASE addressbook;
```

### 5. Run the Application

```bash
uvicorn app.main:app --reload
```

The API will be available at [http://localhost:8000](http://localhost:8000)

---

## API Documentation

- **Swagger UI:** [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc:** [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## API Endpoints

### Authentication

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/token` — Login and get access token

### Contacts

- `GET /api/contacts` — List all contacts
- `POST /api/contacts` — Create a new contact
- `GET /api/contacts/{contact_id}` — Get a specific contact
- `PUT /api/contacts/{contact_id}` — Update a contact
- `DELETE /api/contacts/{contact_id}` — Delete a contact

---

## Security

- All endpoints require authentication
- Passwords are securely hashed using bcrypt
- JWT tokens are used for authentication
- Input validation is enforced using Pydantic

---

## License

MIT License
