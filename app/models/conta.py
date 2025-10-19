from sqlalchemy import Column, Date, Float, String, Integer
from sqlalchemy.orm import relationship
from db.session import Base

class Conta(Base):
    __tablename__ = "conta"
    id = Column(Integer,primary_key=True,index=True)
    description = Column(String(255),index=True)
    value = Column(Float, unique=True, index=True)
    date = Column(Date, unique=True, index=True)

