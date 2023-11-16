from Api.Events.eventsRouter import router
from Handlers.Events.getByOrganizationIDHandler import GetByOrganizationIDHandler
from Handlers.Events.updateHandler import UpdateHandler


@router.post("/update")
def getByOrganizationID(id, note, isImportant):
    result = UpdateHandler().run_core({"id": id, "note": note, "isImportant": isImportant})
    if result["is_ok"]:
        return {"is_ok": True}
    else:
        return {"is_ok": False}