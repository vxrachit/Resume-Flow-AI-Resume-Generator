import os
import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.schemas import GenerateRequest, GenerateResponse, Health
from app.services.generator import generate_resume_and_cover
from app.exporters.pdf_exporter import export_resume_pdf, export_cover_letter_pdf
from app.utils import ensure_folder, generate_filename, upload_to_supabase

app = FastAPI(title="Resume Flow", version="0.2.0")

from fastapi.middleware.cors import CORSMiddleware

origins = [
    "https://resume-flow.vxrachit.is-a.dev",
    "https://resume-flow.pages.dev",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


ensure_folder(settings.OUTPUT_DIR)

@app.get("/vxh", response_model=Health)
def health():
    return Health()


@app.post("/generate", response_model=GenerateResponse)
def generate(payload: GenerateRequest):
    result = generate_resume_and_cover(payload.resume_text, payload.job_desc)

    resume_str = result["resume"]
    if isinstance(resume_str, dict):
        resume_str = json.dumps(resume_str, indent=2, ensure_ascii=False)

    username_safe = payload.full_name.replace(" ", "_").lower()

    resume_pdf = os.path.join(settings.OUTPUT_DIR, generate_filename("resume", "pdf"))
    cover_pdf = os.path.join(settings.OUTPUT_DIR, generate_filename("cover_letter", "pdf"))

    export_resume_pdf(payload.full_name, payload.email, payload.phone, result["resume"], resume_pdf)

    export_cover_letter_pdf(payload.full_name, result["cover_letter"], payload.job_desc, cover_pdf)

    resume_remote_path = f"resume/{username_safe}_{os.path.basename(resume_pdf)}"
    cover_remote_path = f"cover_letter/{username_safe}_{os.path.basename(cover_pdf)}"

    resume_url = upload_to_supabase(resume_pdf, resume_remote_path)
    cover_url = upload_to_supabase(cover_pdf, cover_remote_path)

    os.remove(resume_pdf)
    os.remove(cover_pdf)

    return GenerateResponse(
        resume_pdf=resume_url,
        cover_pdf=cover_url,
        text_resume=resume_str,
        text_cover=result["cover_letter"],
    )
