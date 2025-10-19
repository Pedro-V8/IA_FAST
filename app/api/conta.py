from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from schemas import schemas

from db.session import SessionLocal , get_db
from services.conta import get_all_conta

router = APIRouter()

@router.get('/conta/all')
async def get_conta(db:SessionLocal=Depends(get_db)):
    results = get_all_conta(db)
    return results