from fastapi import FastAPI
from config.database import engine, Base
from routers.notes_router import notes_router

# Init of FastAPI
app = FastAPI()

# Documentation config
app.title = "Backend Notes"
app.version = "0.0.1"

# Creating SQLite Database
Base.metadata.create_all(bind=engine)

# Adding routers
app.include_router(notes_router)
