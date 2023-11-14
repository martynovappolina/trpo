from Domain.base import Base
import uuid
from sqlalchemy import Column, String, UUID, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import JSON

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

    # create()
    # getByOrganizationID()
    # update()
    # delete()


