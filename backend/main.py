from fastapi import FastAPI
from config.database import engine, Base

# Init of FastAPI
app = FastAPI()

# Documentation config
app.title = "Backend Notes"
app.version = "0.0.1"

# Creating SQLite Database
Base.metadata.create_all(bind=engine)
