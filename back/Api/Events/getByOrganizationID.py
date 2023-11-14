from Api.Events.eventsRouter import router
from Handlers.Events.getByOrganizationIDHandler import getByOrganizationIDHandler


@router.get("/getByOrganizationID")
def getByOrganizationID(id):
    result = getByOrganizationIDHandler().run_core(id)
    if result["is_ok"]:
        return {"is_ok": True, "data": result["data"]}
    else:
        return {"is_ok": False, "error": result["error"]}