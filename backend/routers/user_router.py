from fastapi import APIRouter, Body
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from typing import List
from models.user import UserModel
from services.user_service import UserService

user_router = APIRouter()


@user_router.get('/user', tags=["Users"], response_model=List[UserModel], status_code=200)
def get_all_users() -> List[UserModel]:
    result = UserService().get_users()
    return JSONResponse(status_code=200, content=jsonable_encoder(result))


@user_router.post('/user', tags=["Users"], response_model=dict, status_code=201)
def create_new_user(username: str = Body(), password: str = Body(), repeat_password: str = Body()) -> dict:
    if (password != repeat_password):
        return JSONResponse(status_code=422, content="Passwords don't match")
    user = UserModel.parse_obj({"username": username, "password": password})
    allOk = UserService().create_new_user(user)
    if not allOk:
        return JSONResponse(status_code=409, content={"message": "Username duplicated"})
    return JSONResponse(status_code=201, content={"message": "User created"})
