from database import SessionLocal

class BaseHandler():

    def run_core(self, params):
        db = SessionLocal()
        result = self.run(db, params)
        db.close()
        return result

    def run(self):
        pass

