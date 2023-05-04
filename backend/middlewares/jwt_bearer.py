from fastapi import Request, HTTPException, Header
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from utils.jwt_manager import validate_token


class JWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(
                    status_code=403, detail="Invalid authentication scheme.")

            isTokenValid, user = self.verify_jwt(credentials.credentials)
            if not isTokenValid:
                raise HTTPException(
                    status_code=403, detail="Invalid token or expired token.")
            return user["id"]
        else:
            raise HTTPException(
                status_code=403, detail="Invalid authorization code.")

    def verify_jwt(self, jwtoken: str) -> bool:
        isTokenValid: bool = False

        try:
            user = validate_token(jwtoken)
        except:
            user = None
        if user:
            isTokenValid = True
        return isTokenValid, user
