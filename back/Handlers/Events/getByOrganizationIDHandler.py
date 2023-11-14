import hashlib

from ActiveRecords.eventRecord import EventRecord
from ActiveRecords.userRecord import UserRecord
from Handlers.baseHandler import BaseHandler
from utils import get_user_token


class getByOrganizationIDHandler(BaseHandler):
    def run(self, db, id):
        events = EventRecord.getByOrganizationID(db, id)
        if events is not None:
            return {"is_ok": True, "data": events}

        return {"is_ok": False, "error": "event error"}