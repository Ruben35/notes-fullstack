from config.database import Base
from sqlalchemy import Column, Integer, String


class Note(Base):
    __tablename__ = "note"
    id = Column(Integer, primary_key=True)
    title = Column(String(100), nullable=False)
    description = Column(String(1000), nullable=False)
