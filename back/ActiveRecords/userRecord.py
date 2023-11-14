import uuid
from sqlalchemy import Column, String, UUID, Integer, ForeignKey
from Domain.base import Base


class UserRecord(Base):
    __tablename__ = 'users'

    userID = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), nullable=False)
    login = Column(String(255), nullable=False)
    passwordHash = Column(String(255), nullable=False)
    roleID = Column(Integer, nullable=False)
    telegram = Column(String(255))
    telephoneNumber = Column(String(20))
    organizationID = Column(UUID(as_uuid=True), ForeignKey('organizations.organizationID'))


    def __init__(self, userID, email, login, passwordHash, roleID, telegram, telephoneNumber, organizationID):
        self.userID = userID
        self.email = email
        self.login = login
        self.passwordHash = passwordHash
        self.roleID = roleID
        self.telegram = telegram
        self.telephoneNumber = telephoneNumber
        self.organizationID = organizationID


    @staticmethod
    def getById(db, id):
        user = db.query(UserRecord).filter(UserRecord.userID == id).first()
        return user

    def create(self, db):
        db.add(self)
        db.commit()

    def delete(self, db):
        db.query(UserRecord).filter(UserRecord.userID == id).first().delete()

    def update(self, db):
        user = db.query(UserRecord).filter(UserRecord.userID == id).first()
        user.email = self.email
        user.login = self.login
        user.roleID = self.roleID
        user.telegram = self.telegram
        user.telephoneNumber = self.telephoneNumber
        user.organizationID = self.organizationID


    def get_by_login(self, db, login):
        return db.query(UserRecord).filter(UserRecord.login == login).first()


