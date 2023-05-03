from config.database import Base
from sqlalchemy import Column, Integer, String
from pydantic import BaseModel, Field
from typing import Optional


class Note(Base):
    __tablename__ = "note"
    id = Column(Integer, primary_key=True)
    title = Column(String(100), nullable=False)
    description = Column(String(1000), nullable=False)


class NoteModel(BaseModel):
    id: Optional[int] = None
    title: str = Field(min_length=1, max_length=100)
    description: str = Field(min_length=1, max_length=1000)

    class Config:
        scheme_extra = {
            "example": {
                "id": 1,
                "title": "Nueva Nota",
                "description": "Cuerpo de la Nota"
            }
        }
