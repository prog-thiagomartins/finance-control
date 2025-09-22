from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import date

from ..models.transaction import Transaction
from ..schemas.transaction import TransactionCreate, TransactionUpdate

class TransactionService:
    def __init__(self, db: Session):
        self.db = db

    def create_transaction(self, transaction_data: TransactionCreate) -> Transaction:
        transaction = Transaction(**transaction_data.model_dump())
        self.db.add(transaction)
        self.db.commit()
        self.db.refresh(transaction)
        return transaction

    def get_transactions(
        self,
        skip: int = 0,
        limit: int = 100,
        transaction_type: Optional[str] = None,
        start_date: Optional[date] = None,
        end_date: Optional[date] = None
    ) -> List[Transaction]:
        query = self.db.query(Transaction)

        # Aplicar filtros
        if transaction_type:
            query = query.filter(Transaction.transaction_type == transaction_type)

        if start_date:
            query = query.filter(Transaction.transaction_date >= start_date)

        if end_date:
            query = query.filter(Transaction.transaction_date <= end_date)

        return query.order_by(Transaction.transaction_date.desc(), Transaction.id.desc()).offset(skip).limit(limit).all()

    def get_transaction_by_id(self, transaction_id: int) -> Optional[Transaction]:
        return self.db.query(Transaction).filter(Transaction.id == transaction_id).first()

    def update_transaction(self, transaction_id: int, transaction_data: TransactionUpdate) -> Optional[Transaction]:
        transaction = self.get_transaction_by_id(transaction_id)
        if not transaction:
            return None

        update_data = transaction_data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(transaction, field, value)

        self.db.commit()
        self.db.refresh(transaction)
        return transaction

    def delete_transaction(self, transaction_id: int) -> bool:
        transaction = self.get_transaction_by_id(transaction_id)
        if not transaction:
            return False

        self.db.delete(transaction)
        self.db.commit()
        return True