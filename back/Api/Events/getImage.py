from fastapi.responses import FileResponse
from Api.Events.eventsRouter import router

@router.get("/getImage")
def get_image(imageId: str, preview: bool = False):

    if preview:
        images_path = './previews'

    else:
        images_path = './images'

    return FileResponse(images_path + "/{}.png".format(imageId), media_type="image/png")
