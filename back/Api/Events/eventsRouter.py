from fastapi import APIRouter

router = APIRouter(
    prefix="/api/events",
    tags=["Events"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)