from fastapi import APIRouter

from Api.Users import login
from utils import add_route

router = APIRouter()
add_route(router, login)
