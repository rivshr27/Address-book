import uvicorn
from pathlib import Path
import sys

# Get the absolute path of the backend directory
backend_dir = Path(__file__).resolve().parent
sys.path.insert(0, str(backend_dir))

# Import the app after setting up the path
from main import app

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True, reload_dirs=[str(backend_dir)]) 