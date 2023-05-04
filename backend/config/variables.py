import os
from dotenv import load_dotenv

load_dotenv()

jwt_secret_key = os.getenv("JWT_SECRET_KEY")
