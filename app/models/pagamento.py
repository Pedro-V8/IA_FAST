from sqlalchemy import Column, Integer, String, ForeignKey, JSON

from db.session import Base

from models.conta import Conta


class Pagamento(Base):
    __tablename__ = "pagamento"
    id = Column(Integer,primary_key=True,index=True)
    conta_id = Column(Integer, ForeignKey(Conta.id))
    unidades_id = Column(JSON, nullable=False)

    conta = relationship("Conta", back_populates="pagamentos")
