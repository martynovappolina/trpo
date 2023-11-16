import base64
import os
from datetime import datetime
from uuid import uuid4
import cv2
import numpy as np

from ActiveRecords.eventRecord import EventRecord
from Handlers.baseHandler import BaseHandler


class CreateHandler(BaseHandler):
    def run(self, db, params):
        imgId = uuid4()
        img_data = params["img"].decode('utf-8')
        header, data = img_data.split(';base64,')
        img_data = base64.b64decode(data)

        images_path = './images'
        previews_path = './previews'

        if not os.path.exists(images_path):
            os.mkdir(images_path)

        if not os.path.exists(previews_path):
            os.mkdir(previews_path)

        with open(images_path + "/{}.png".format(imgId), 'wb') as image_out:
            image_out.write(img_data)

        nparr = np.fromfile(images_path + "/{}.png".format(imgId), np.uint8)

        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        preview = cv2.resize(img, (160, 120))
        cv2.imwrite(previews_path + "/{}.png".format(imgId), preview)

        event = EventRecord(uuid4(), params["cameraID"], datetime.now(), imgId, {}, '', True)
        event.create(db)

        return {"is_ok": True, "error": "event error"}