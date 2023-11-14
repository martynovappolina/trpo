from Domain.base import Base
import uuid
from sqlalchemy import Column, String, UUID, ForeignKey


class CameraRecord(Base):
    __tablename__ = 'cameras'

    cameraID = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    address = Column(String(255), nullable=False)
    specificationsID = Column(UUID(as_uuid=True), ForeignKey('specifications.specificationsID'))
    location = Column(String(255), nullable=False)
    organizationID = Column(UUID(as_uuid=True), ForeignKey('organizations.organizationID'))