from config.database import Session
from models.user import User, UserModel
from sqlalchemy.orm import load_only
import hashlib


class UserService():
    def __init__(self) -> None:
        self.db = Session()

    def get_users(self):
        return self.db.query(User).options(load_only(User.id, User.username)).all()

    def create_new_user(self, user: UserModel):
        userExist = self.db.query(User).filter(
            User.username == user.username).first()

        if userExist:
            return False

        new_user = User(username=user.username, password=hashlib.md5(
            user.password.encode()).hexdigest())
        self.db.add(new_user)
        self.db.commit()

        return True
