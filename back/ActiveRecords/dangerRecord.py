from Domain.base import Base
from sqlalchemy import Column, String, Integer

class DangerRecord(Base):
    tablename = 'dangers'

    dangerID = Column(String, primary_key=True)
    title = Column(String(32), nullable=False)
    description = Column(String(255))
    imgUrl = Column(String(32))
    price = Column(Integer, nullable=False)