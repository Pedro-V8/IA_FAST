from sqlalchemy import Column, Date, Integer, String, ForeignKey

from db.session import Base

from models.conta import Conta

class Contas(Base):
    __tablename__ = "contas"
    id = Column(Integer,primary_key=True,index=True)
    conta_id = Column(Integer, ForeignKey(Conta.id))

    conta = relationship("Conta", back_populates="contas")