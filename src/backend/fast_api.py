from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
import shutil
from pathlib import Path


app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

UPLOAD_DIR = Path("data/input")
UPLOAD_DIR.parent.mkdir(exist_ok=True, parents=True)
UPLOAD_DIR.mkdir(exist_ok=True)

@app.get("/")
async def root():
    return {"message": "Hello, World!"}


@app.post("/upload_templates/")
async def upload_templates(file: UploadFile = File(...)):
    file_path = UPLOAD_DIR / "input_templates.txt"
    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"filename": file.filename, "message": "File uploaded successfully"}

@app.get("/load_result")
async def load_result():
    return None