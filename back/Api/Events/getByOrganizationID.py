from Api.Events.eventsRouter import router
from Handlers.Events.getByOrganizationIDHandler import GetByOrganizationIDHandler


@router.get("/getByOrganizationID")
def getByOrganizationID(id):
    result = GetByOrganizationIDHandler().run_core(id)
    if result["is_ok"]:
        return {"is_ok": True, "data": result["data"]}
    else:
        return {"is_ok": False, "error": result["error"]}