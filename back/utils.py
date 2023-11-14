import types
from datetime import datetime, timedelta

import jwt
from fastapi import APIRouter
from yoyo import read_migrations, get_backend

from ActiveRecords.userRecord import UserRecord
from database import SQLALCHEMY_DATABASE_URL, SessionLocal


def run_migration():
    backend = get_backend(SQLALCHEMY_DATABASE_URL)
    migrations = read_migrations('./migrations')
    print('migrations.len: ' + str(len(migrations)))
    with backend.lock():
        backend.apply_migrations(backend.to_apply(migrations))


SECRET_KEY = "09d25e094faa6ca2556c81816kdjfu563b93f7099f6f0f4caa6cf63b88e75jgu"
ALGORITHM = "HS256"

def get_user_token(user: UserRecord):
    expire = datetime.utcnow() + timedelta(minutes=480)
    return jwt.encode({"userId": str(user.userID), "email": user.email, "exp": expire}, SECRET_KEY, algorithm=ALGORITHM)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


prefixes = []


def add_route(router_base: APIRouter, method: types.ModuleType):
    if method.router.prefix not in prefixes:
        router_base.include_router(method.router)
        prefixes.append(method.router.prefix)

