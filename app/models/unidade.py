from sqlalchemy import Column, Integer, String

from db.session import Base


class Unidade(Base):
    __tablename__ = "unidade"
    id = Column(Integer,primary_key=True,index=True)
    name = Column(String(255), unique=True, index=True)
