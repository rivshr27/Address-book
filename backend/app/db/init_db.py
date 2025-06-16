from sqlalchemy.orm import Session
from app.db.session import Base, engine
from app.models.user import User
from app.models.contact import Contact
from app.core.security import get_password_hash

def init_db() -> None:
    # Create all tables
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully")

def create_initial_data(db: Session) -> None:
    try:
        # Create a test user if none exists
        user = db.query(User).first()
        if not user:
            user = User(
                email="test@example.com",
                hashed_password=get_password_hash("testpassword")
            )
            db.add(user)
            db.commit()
            db.refresh(user)
            print("Test user created successfully")

            # Create some test contacts
            contacts = [
                Contact(
                    first_name="John",
                    last_name="Doe",
                    email="john.doe@example.com",
                    phone="123-456-7890",
                    address="123 Main St",
                    owner_id=user.id
                ),
                Contact(
                    first_name="Jane",
                    last_name="Smith",
                    email="jane.smith@example.com",
                    phone="098-765-4321",
                    address="456 Oak Ave",
                    owner_id=user.id
                )
            ]
            db.add_all(contacts)
            db.commit()
            print("Test contacts created successfully")
    except Exception as e:
        print(f"Error creating initial data: {str(e)}")
        db.rollback()
        raise 