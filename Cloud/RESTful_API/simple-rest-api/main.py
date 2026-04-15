from fastapi import FastAPI
from pydantic import BaseModel
import time

app = FastAPI(title="Simple REST API", version="1.0.0")

class EchoIn(BaseModel):
    message: str

@app.get("/")
def root():
    return {"message": "API is running. Visit /docs for Swagger UI."}

@app.get("/health")
def health():
    return {"status": "ok", "ts": int(time.time())}

@app.get("/hello")
def hello(name: str = "world"):
    return {"message": f"Hello, {name}!"}

@app.post("/echo")
def echo(payload: EchoIn):
    return {"you_said": payload.message}