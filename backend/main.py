from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv

from services.translation_service import translation_service

load_dotenv()

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins (for testing)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TranslationRequest(BaseModel):
    chapter_id: str
    content: str

class TranslationResponse(BaseModel):
    translated_text: str

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/translate/chapter", response_model=TranslationResponse)
def translate_chapter(request: TranslationRequest):
    try:
        translated_text = translation_service.translate_to_urdu(request.content)
        return TranslationResponse(translated_text=translated_text)
    except Exception as e:
        raise HTTPException(status_code=503, detail="I'm unable to translate this content right now. Please try again later.")