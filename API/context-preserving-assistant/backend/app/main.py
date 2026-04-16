from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.preferences import router as preferences_router
from app.api.assistant import router as assistant_router

app = FastAPI(title="Context-Preserving Assistant")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(preferences_router)
app.include_router(assistant_router)


@app.get("/")
def root():
    return {"message": "Context-Preserving Assistant backend is running"}