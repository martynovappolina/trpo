from ActiveRecords.cameraRecord import CameraRecord
from Domain.base import Base
import uuid
from sqlalchemy import Column, String, UUID, DateTime, ForeignKey, JSON, Boolean

class EventRecord(Base):
    __tablename__ = 'events'

    eventID = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    cameraID = Column(UUID(as_uuid=True), ForeignKey('cameras.cameraID'))
    dateTime = Column(DateTime, nullable=False)
    imgID = Column(String(32), nullable=False)
    note = Column(String(32), nullable=False)
    isImportant = Column(Boolean, nullable=False)
    labels = Column(JSON, nullable=False)

    def __init__(self, eventID, cameraID, dateTime, imgID, labels, note, isImportant):
        self.eventID = eventID
        self.cameraID = cameraID
        self.dateTime = dateTime
        self.imgID = imgID
        self.labels = labels
        self.note = note
        self.isImportant = isImportant

    @staticmethod
    def getByID(db, id):
        event = db.query(EventRecord) \
            .filter(EventRecord.eventID == id) \
            .first()
        return event

    @staticmethod
    def getByOrganizationID(db, id):
        events = db.query(EventRecord)\
            .join(CameraRecord, EventRecord.cameraID == CameraRecord.cameraID)\
            .with_entities(CameraRecord, EventRecord)\
            .filter(CameraRecord.organizationID == id)\
            .all()
        return events

    def delete(self, db):
        db.query(EventRecord).filter(EventRecord.eventID == self.eventID).first().delete()

    def update(self, db):
        event = db.query(EventRecord).filter(EventRecord.eventID == self.eventID).first()
        event.note = self.note
        event.isImportant = self.isImportant
        db.commit()

    def create(self, db):
        db.add(self)
        db.commit()




