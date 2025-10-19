from db.session import SessionLocal
from models.unidade import Unidade
from schemas import schemas

def get_all_unidade(db: SessionLocal):
    results = db.query(
        Unidade.id,
        Unidade.name
    ).all()

    return results