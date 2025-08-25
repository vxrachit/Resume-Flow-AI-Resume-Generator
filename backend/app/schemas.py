from pydantic import BaseModel

class GenerateRequest(BaseModel):
    full_name: str
    email: str | None = None
    phone: str | None = None
    resume_text: str
    job_desc: str

class GenerateResponse(BaseModel):
    resume_pdf: str
    cover_pdf: str
    text_resume: str
    text_cover: str

class Health(BaseModel):
    status: str = "ok"
