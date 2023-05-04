from fastapi import APIRouter
from fastapi.responses import JSONResponse
from models.user import UserModel
from services.user_service import UserService
from utils.jwt_manager import create_token
auth_router = APIRouter()


@auth_router.post("/login", tags=['Auth'], status_code=200, response_model=dict)
def login(user: UserModel) -> dict:
    user.dict()
    userLogged = UserService().login(user)
    if not userLogged:
        return JSONResponse(status_code=401, content={'message': 'Login failed, username or password incorrect'})
    token = create_token(
        {'id': userLogged.id, 'username': userLogged.username})
    return JSONResponse(status_code=200, content={'message': 'Successful Login', 'access_token': token})
