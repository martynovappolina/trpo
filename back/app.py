from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
import uvicorn
from utils import run_migration, get_db
from Api.routers import router

app = FastAPI(title="TRPO API")

app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    run_migration()
    uvicorn.run(app, host="0.0.0.0", port=5000)
