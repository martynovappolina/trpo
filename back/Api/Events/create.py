from Api.Events.eventsRouter import router
from Handlers.Events.createHandler import CreateHandler
from fastapi import Depends, Request

async def parse_body(request: Request):
    data: bytes = await request.body()
    return data

@router.post("/create")
def create(cameraID, data: bytes = Depends(parse_body)):
    # data = data.decode('utf-8')
    result = CreateHandler().run_core({'cameraID': cameraID, "img": data})
    if result["is_ok"]:
        return {"is_ok": True}
    else:
        return {"is_ok": False, "error": result["error"]}