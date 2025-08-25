import google.generativeai as genai
from tenacity import retry, stop_after_attempt, wait_exponential
from app.config import settings

genai.configure(api_key=settings.GEMINI_API_KEY)

SYSTEM_INSTRUCTIONS = """You are an expert AI resume and cover letter writer.
Return STRICT JSON only. No prose, no markdown. Your task is to make the resume perfect according to the job description given by the user.
Schema:
{
  "resume": {
    "summary": "Concise, compelling professional summary (2-3 sentences, strong action verbs, modern tone)",
    "skills": ["Skill 1", "Skill 2", "... (prioritize technical and soft skills relevant to the job)"],
    "experience": [
      {
        "title": "Job Title",
        "company": "Company Name",
        "location": "City, Country",
        "dates": "Start - End",
        "bullets": [
          "Achievement or responsibility (start with action verb, quantify impact/results where possible, keep concise and powerful)",
          "Another achievement or responsibility"
        ]
      }
    ],
    "projects": [
      {
        "name": "Project Name",
        "description": "Short, impressive description (highlight technologies, impact, and your role)"
      }
    ],
    "education": [
      {
        "degree": "Degree Name",
        "institution": "Institution Name",
        "dates": "Start - End"
      }
    ],
    "certifications": ["Certification 1", "..."],
    "languages": ["Language 1", "..."]
  },
  "cover_letter": "A detailed, modern, and engaging cover letter. Start with a strong, personalized opening referencing the company and position. In the body, highlight your most relevant skills, experience, and achievements with specific examples. Use short, clear paragraphs. End with a confident, professional closing and a call to action. Use modern business language and formatting. Keep in mind do not give any salutation like dear hiring manager , company team etc."

}
Keep clear formatting (headings, bullet points) in plain text where appropriate.
Make the resume and cover letter visually engaging, modern, and tailored to the job description.
"""

@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=1, max=6))
def call_gemini(resume_text: str, job_desc: str) -> str:
    model = genai.GenerativeModel(settings.MODEL_NAME, system_instruction=SYSTEM_INSTRUCTIONS)
    prompt = f"""
Resume (raw):
{resume_text}

Job Description:
{job_desc}

Return ONLY the JSON object described by the schema above.
Ensure each section is filled with the most relevant information, and that all data is placed in the correct section (e.g., skills in skills, experience in experience, etc.).
Make the resume and cover letter detailed, modern, and visually engaging. Use strong action verbs, quantifiable achievements, and a confident, professional tone.
For the cover letter, use short paragraphs, a strong opening, specific examples, and a confident closing.
"""
    resp = model.generate_content(prompt)
    return resp.text or ""
