from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import date

from ..database import get_db
from ..schemas.transaction import TransactionCreate, TransactionUpdate, TransactionResponse
from ..services.transaction_service import TransactionService

router = APIRouter(prefix="/transactions", tags=["transactions"])

@router.post("/", response_model=TransactionResponse, status_code=201)
def create_transaction(
    transaction: TransactionCreate,
    db: Session = Depends(get_db)
):
    service = TransactionService(db)
    return service.create_transaction(transaction)

@router.get("/", response_model=List[TransactionResponse])
def get_transactions(
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(100, ge=1, le=1000, description="Maximum number of records to return"),
    transaction_type: Optional[str] = Query(None, description="Filter by transaction type"),
    start_date: Optional[date] = Query(None, description="Filter from date"),
    end_date: Optional[date] = Query(None, description="Filter to date"),
    db: Session = Depends(get_db)
):
    service = TransactionService(db)
    return service.get_transactions(
        skip=skip,
        limit=limit,
        transaction_type=transaction_type,
        start_date=start_date,
        end_date=end_date
    )

@router.get("/{transaction_id}", response_model=TransactionResponse)
def get_transaction(transaction_id: int, db: Session = Depends(get_db)):
    service = TransactionService(db)
    transaction = service.get_transaction_by_id(transaction_id)
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return transaction

@router.put("/{transaction_id}", response_model=TransactionResponse)
def update_transaction(
    transaction_id: int,
    transaction_update: TransactionUpdate,
    db: Session = Depends(get_db)
):
    service = TransactionService(db)
    transaction = service.update_transaction(transaction_id, transaction_update)
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return transaction

@router.delete("/{transaction_id}", status_code=204)
def delete_transaction(transaction_id: int, db: Session = Depends(get_db)):
    service = TransactionService(db)
    success = service.delete_transaction(transaction_id)
    if not success:
        raise HTTPException(status_code=404, detail="Transaction not found")