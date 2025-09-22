from sqlalchemy import Column, Integer, String, Numeric, Date, DateTime
from sqlalchemy.sql import func
from ..database import Base

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String(255), nullable=False)
    amount = Column(Numeric(15, 2), nullable=False)
    transaction_type = Column(String(20), nullable=False)
    transaction_date = Column(Date, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())