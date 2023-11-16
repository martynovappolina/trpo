from Api.Events.eventsRouter import router
from Handlers.Events.getByIDHandler import GetByIDHandler


@router.get("/getByID")
def getByID(id):
    result = GetByIDHandler().run_core(id)
    if result["is_ok"]:
        return {"is_ok": True, "data": result["data"]}
    else:
        return {"is_ok": False, "error": result["error"]}