from fastapi import APIRouter

from Api.Events import getByOrganizationID, update as eventUpdate, create as createEvent, getImage
from Api.Users import login
from utils import add_route

router = APIRouter()
add_route(router, login)
add_route(router, getByOrganizationID)
add_route(router, eventUpdate)
add_route(router, createEvent)
add_route(router, getImage)
