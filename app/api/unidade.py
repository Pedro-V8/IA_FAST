from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from schemas import schemas

from db.session import SessionLocal , get_db
from services.unidade import get_all_unidade

router = APIRouter()

@router.get('/unidade/all')
async def get_unidade(db:SessionLocal=Depends(get_db)):
    results = get_all_unidade(db)
    return results