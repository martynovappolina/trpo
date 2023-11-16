from ActiveRecords.eventRecord import EventRecord
from Handlers.baseHandler import BaseHandler


class GetByOrganizationIDHandler(BaseHandler):
    def run(self, db, id):
        events = EventRecord.getByOrganizationID(db, id)
        if events is not None:
            return {"is_ok": True, "data": list(map(lambda x: {
            "eventID": x.EventRecord.eventID,
            "cameraLocation": x.CameraRecord.location,
            "cameraAddress": x.CameraRecord.address,
            "dateTime": x.EventRecord.dateTime,
            "imgID": x.EventRecord.imgID,
            "labels": x.EventRecord.labels,
            "note": x.EventRecord.note,
            "isImportant": x.EventRecord.isImportant,
        }, events))}

        return {"is_ok": False, "error": "event error"}