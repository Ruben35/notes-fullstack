from fastapi import FastAPI
from config.database import engine, Base
from middlewares.error_handler import ErrorHandler
from routers.notes_router import notes_router
from routers.user_router import user_router

# Init of FastAPI
app = FastAPI()

# Documentation config
app.title = "Backend Notes"
app.version = "0.0.1"

# Creating SQLite Database
Base.metadata.create_all(bind=engine)

# Adding middlewares
app.add_middleware(ErrorHandler)

# Adding routers
app.include_router(notes_router)
app.include_router(user_router)
