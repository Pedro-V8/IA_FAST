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

# UPDATE
def update_conta(db: SessionLocal, conta_id: int, conta_update: schemas.ContaUpdate):
    conta = db.query(Conta).filter(Conta.id == conta_id).first()

    if not conta:
        raise HTTPException(status_code=404, detail="Conta não encontrada")

    conta.description = conta_update.description
    conta.value = conta_update.value
    conta.date = conta_update.date

    db.commit()
    db.refresh(conta)
    return conta

# DELETE
def delete_conta(db: SessionLocal, conta_id: int):
    conta = db.query(Conta).filter(Conta.id == conta_id).first()

    if not conta:
        raise HTTPException(status_code=404, detail="Conta não encontrada")

    db.delete(conta)
    db.commit()
    return {"detail": "Conta deletada com sucesso"}