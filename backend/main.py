from fastapi import FastAPI
from config.database import engine, Base
from middlewares.error_handler import ErrorHandler
from fastapi.middleware.cors import CORSMiddleware
from routers.notes_router import notes_router
from routers.user_router import user_router
from routers.auth_router import auth_router

# Init of FastAPI
app = FastAPI()

# Documentation config
app.title = "Backend Notes"
app.version = "0.0.1"

# Creating SQLite Database
Base.metadata.create_all(bind=engine)

# Adding middlewares
app.add_middleware(ErrorHandler)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Adding routers
app.include_router(notes_router)
app.include_router(user_router)
app.include_router(auth_router)
