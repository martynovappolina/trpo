from pydantic import BaseModel

class UserRecords(BaseModel):
    userID: str
    email: str
    login: str
    passwordHash: str
    roleID: int
    telegram: str
    telephoneNumber: str
    organizationID: str

    # def __init__(self, userID, email, login, passwordHash, roleID, telegram, telephoneNumber, organizationID):
    #     self.userID = userID
    #     self.email = email
    #     self.login = login
    #     self.passwordHash = passwordHash
    #     self.roleID = roleID
    #     self.telegram = telegram
    #     self.telephoneNumber = telephoneNumber
    #     self.organizationID = organizationID

    db: Session = Depends(get_db)

    def getBuId(self, id):
        db.query(Patient).filter(Patient.Id == id).first()

    # def create(self):


        # create()
        # delete()
        # update()
        # login
        # getBylD
        # getByOrganizationID
