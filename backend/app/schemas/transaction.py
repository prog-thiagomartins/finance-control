from pydantic import BaseModel, validator
from decimal import Decimal
from datetime import date, datetime
from typing import Optional
from enum import Enum

class TransactionType(str, Enum):
    RECEITA = "receita"
    DESPESA = "despesa"

class TransactionBase(BaseModel):
    description: str
    amount: Decimal
    transaction_type: TransactionType
    transaction_date: date

    @validator('amount')
    def amount_must_be_positive(cls, v):
        if v <= 0:
            raise ValueError('Amount must be positive')
        return v

    @validator('description')
    def description_must_not_be_empty(cls, v):
        if not v.strip():
            raise ValueError('Description cannot be empty')
        return v.strip()

class TransactionCreate(TransactionBase):
    pass

class TransactionUpdate(BaseModel):
    description: Optional[str] = None
    amount: Optional[Decimal] = None
    transaction_type: Optional[TransactionType] = None
    transaction_date: Optional[date] = None

    @validator('amount')
    def amount_must_be_positive(cls, v):
        if v is not None and v <= 0:
            raise ValueError('Amount must be positive')
        return v

class TransactionInDB(TransactionBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class TransactionResponse(TransactionInDB):
    pass