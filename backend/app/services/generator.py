from app.llm import call_gemini
from app.utils import extract_json

def generate_resume_and_cover(resume_text: str, job_desc: str) -> dict:
    raw = call_gemini(resume_text, job_desc)
    data = extract_json(raw) or {}
    resume_data = data.get("resume") or {}
    cover_out = data.get("cover_letter") or data.get("coverLetter") or ""
    if not resume_data and raw:
        resume_data = {"summary": raw.strip()}
    if not cover_out:
        cover_out = "Dear Hiring Manager,\n\n[Your tailored cover letter will appear here.]\n"
    return {"resume": resume_data, "cover_letter": cover_out}
