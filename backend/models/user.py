from config.database import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from pydantic import BaseModel, Field
from typing import Optional


class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True)
    username = Column(String(20), nullable=False)
    password = Column(String(32), nullable=False)
    notes = relationship("Note", back_populates="user")


class UserModel(BaseModel):
    id: Optional[int] = None
    username: str = Field(min_length=1, max_length=20)
    password: str = Field(min_length=6)

    class Config:
        scheme_extra = {
            "example": {
                "id": 1,
                "username": "Ruben35",
            }
        }
