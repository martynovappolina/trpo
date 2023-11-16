import hashlib

from ActiveRecords.eventRecord import EventRecord
from Handlers.baseHandler import BaseHandler


class UpdateHandler(BaseHandler):
    def run(self, db, params):
        event = EventRecord.getByID(db, params["id"])
        event.note = params["note"]
        event.isImportant = bool(params["isImportant"] == 'true')
        event.update(db)

        return {"is_ok": True}
