from ActiveRecords.cameraRecord import CameraRecord
from Domain.base import Base
import uuid
from sqlalchemy import Column, String, UUID, DateTime, ForeignKey, JSON

class EventRecord(Base):
    __tablename__ = 'events'

    eventID = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    cameraID = Column(UUID(as_uuid=True), ForeignKey('cameras.cameraID'))
    dangerID = Column(UUID(as_uuid=True), ForeignKey('dangers.dangerID'))
    dateTime = Column(DateTime, nullable=False)
    imgUrl = Column(String(32), nullable=False)
    labels = Column(JSON, nullable=False)

    def __init__(self, eventID, cameraID, dangerID, dateTime, imgUrl, labels):
        self.eventID = eventID
        self.cameraID = cameraID
        self.dangerID = dangerID
        self.dateTime = dateTime
        self.imgUrl = imgUrl
        self.labels = labels

    @staticmethod
    def getById(db, id):
        event = db.query(EventRecord).filter(EventRecord.eventID == id).first()
        return event

    @staticmethod
    def getByOrganizationID(db, id):
        events = db.query(EventRecord).join(CameraRecord, EventRecord.cameraID == CameraRecord.cameraID).with_entities(CameraRecord, EventRecord).filter(CameraRecord.organizationID == id).all()
        # events = list(map(lambda event: EventRecord(event), events))
        return list(map(lambda x: {
            "eventID": x.EventRecord.eventID,
            "cameraLocation": x.CameraRecord.location,
            "cameraAddress": x.CameraRecord.address,
            "dateTime": x.EventRecord.dateTime,
            "imgUrl": x.EventRecord.imgUrl,
            "labels": x.EventRecord.labels
        }, events))

    def delete(self, db):
        db.query(EventRecord).filter(EventRecord.eventID == self.eventID).first().delete()

    def update(self, db):
        event = db.query(EventRecord).filter(EventRecord.eventID == self.eventID).first()
        event.eventID = self.eventID
        event.cameraID = self.cameraID
        event.dangerID = self.dangerID
        event.dateTime = self.dateTime
        event.imgUrl = self.imgUrl
        event.labels = self.labels

    def create(self, db):
        # полный вариант:
        # - вывести видео с вебки
        # - передавать каждый 10? кадр на бэк
        # - проанализировать
        # - сохранить
        # вариант минимум:
        # - добавление изображения
        # - передача на бэк
        # - анализ
        # - сохранить
        db.add(self)
        db.commit()




