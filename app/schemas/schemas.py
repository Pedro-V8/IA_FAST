from pydantic import BaseModel
from typing import Optional, Any, List
from datetime import date


# ==========================
#  CONTA
# ==========================
class ContaBase(BaseModel):
    description: Optional[str] = None
    value: Optional[float] = None
    date: date


class ContaCreate(ContaBase):
    description: str
    value: float
    date: date


class ContaRead(ContaBase):
    id: int

    class Config:
        orm_mode = True

class Conta(ContaBase):
    id: int

    class Config:
        orm_mode = True


# ==========================
#  CONTAS
# ==========================
class ContasBase(BaseModel):
    id_conta: int


class ContasCreate(ContasBase):
    pass


class ContasRead(ContasBase):
    id: int
    conta: Optional[ContaRead] = None  # Optional nested relationship

    class Config:
        orm_mode = True


# ==========================
#  UNIDADE
# ==========================
class UnidadeBase(BaseModel):
    name: str


class UnidadeCreate(UnidadeBase):
    pass


class UnidadeRead(UnidadeBase):
    id: int

    class Config:
        orm_mode = True


# ==========================
#  PAGAMENTO
# ==========================
class PagamentoBase(BaseModel):
    id_conta: int
    id_unidades: Any  # JSON field (e.g. list of unidade IDs)


class PagamentoCreate(PagamentoBase):
    pass


class PagamentoRead(PagamentoBase):
    id: int
    conta: Optional[ContaRead] = None  # Optional nested relationship

    class Config:
        orm_mode = True
