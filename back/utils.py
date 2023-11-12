from yoyo import read_migrations, get_backend
from database import SQLALCHEMY_DATABASE_URL

def run_migration():
    backend = get_backend(SQLALCHEMY_DATABASE_URL)
    migrations = read_migrations('./migrations')
    print('migrations.len: ' + str(len(migrations)))
    with backend.lock():
        backend.apply_migrations(backend.to_apply(migrations))