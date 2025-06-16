from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import auth, contacts
from app.core.config import settings
from app.db.init_db import init_db, create_initial_data
from app.db.session import SessionLocal

app = FastAPI(
    title="Address Book API",
    description="A RESTful API for managing contacts",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(contacts.router, prefix="/api/contacts", tags=["Contacts"])

@app.on_event("startup")
async def startup_event():
    # Initialize database
    init_db()
    # Create initial data
    db = SessionLocal()
    try:
        create_initial_data(db)
    finally:
        db.close()

@app.get("/")
async def root():
    return {"message": "Welcome to Address Book API"} 