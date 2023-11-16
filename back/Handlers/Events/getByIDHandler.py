from ActiveRecords.eventRecord import EventRecord
from Handlers.baseHandler import BaseHandler


class GetByIDHandler(BaseHandler):
    def run(self, db, id):
        event = EventRecord.getByID(db, id)
        if event is not None:
            return {"is_ok": True, "data": \
                {
                    "dateTime": event.dateTime,
                    "imgID": event.imgID,
                    "labels": event.labels,
                    "note": event.note,
                    "isImportant": event.isImportant
                }}

        return {"is_ok": False, "error": "event error"}