from db.session import SessionLocal
from models.conta import Conta
from schemas import schemas

# GET
def get_all_conta(db: SessionLocal):
    results = db.query(Conta).all()

    return results

# CREATE
def create_conta(db:SessionLocal, conta: schemas.ContaCreate):
    new_conta = Conta(
        description=conta.description,
        value=conta.value,
        date=conta.date
    )
    db.add(new_conta)
    db.commit()
    db.refresh(new_conta)
    return new_conta