from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.github import router as github_router

app = FastAPI(title="Veto Agent Demo")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(github_router)


@app.get("/")
def root():
    return {"message": "Veto Agent backend is running"}