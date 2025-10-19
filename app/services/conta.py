from db.session import SessionLocal
from models.conta import Conta
from schemas import schemas

def get_all_conta(db: SessionLocal):
    results = db.query(
        Conta.id,
        Conta.description,
        Conta.value,
        Conta.date,
    ).all()

    return results