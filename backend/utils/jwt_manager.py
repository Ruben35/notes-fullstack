from jwt import encode, decode, exceptions
from config.variables import jwt_secret_key
from fastapi import HTTPException
import time


def create_token(data: dict) -> str:
    data["expires"] = time.time() + 3600
    token: str = encode(payload=data, key=jwt_secret_key, algorithm="HS256")
    return token


def validate_token(token: str) -> dict:
    try:
        data: dict = decode(token, key=jwt_secret_key, algorithms=['HS256'])
        return data if data["expires"] >= time.time() else None
    except:
        return {}
