from fastapi import APIRouter

from Api.Events import getByOrganizationID
from Api.Users import login
from utils import add_route

router = APIRouter()
add_route(router, login)
add_route(router, getByOrganizationID)
