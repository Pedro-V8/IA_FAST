from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from schemas import schemas

from db.session import SessionLocal , get_db
from services.conta import get_all_conta, create_conta

router = APIRouter()

@router.get('/conta/all')
async def get_conta(db:SessionLocal=Depends(get_db)):
    results = get_all_conta(db)
    return results

@router.post("/conta/create", response_model=schemas.Conta)
def add_conta(conta: schemas.ContaCreate, db:SessionLocal = Depends(get_db)):
    return create_conta(db, conta)