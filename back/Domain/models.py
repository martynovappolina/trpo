import uuid

from sqlalchemy import Column, String, UUID, Integer, ForeignKey, Date, DateTime, Boolean

from Domain.base import Base


class Organization(Base):
    __tablename__ = 'organizations'

    organizationID = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    address = Column(String(255), nullable=False)
    telephoneNumber = Column(String(20), nullable=False)
    title = Column(String(255), nullable=False)

class Subscription(Base):
    __tablename__ = 'subscriptions'

    subscriptionID = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    endDate = Column(Date, nullable=False)
    price = Column(Integer, nullable=False)

class Event(Base):
    __tablename__ = 'events'

    eventID = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    cameraID = Column(UUID(as_uuid=True), ForeignKey('cameras.cameraID'))
    eventDate = Column(DateTime, nullable=False)
    eventType = Column(String(50), nullable=False)

class Camera(Base):
    __tablename__ = 'cameras'

    cameraID = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    address = Column(String(255), nullable=False)
    specificationsID = Column(UUID(as_uuid=True), ForeignKey('specifications.specificationsID'))
    location = Column(String(255), nullable=False)

class Specification(Base):
    __tablename__ = 'specifications'

    specificationsID = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    darkMode = Column(Boolean, nullable=False)
    model = Column(String(255), nullable=False)
    motionSensor = Column(Boolean, nullable=False)
    resolution = Column(String(50), nullable=False)
