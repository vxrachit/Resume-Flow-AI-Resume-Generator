import os
import re
import json
from datetime import datetime
from supabase import create_client, Client
from app.config import settings

supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)


def ensure_folder(path: str) -> None:
    os.makedirs(path, exist_ok=True)


def generate_filename(prefix: str, ext: str) -> str:
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    return f"{prefix}_{ts}.{ext}"


def extract_json(text: str) -> dict | None:
    """
    Extract first JSON object from text (handles code fences).
    """
    if not text:
        return None
    fenced = re.search(r"```(?:json)?\s*(\{.*?\})\s*```", text, re.S)
    raw = fenced.group(1) if fenced else text
    try:
        return json.loads(raw)
    except Exception:
        curly = re.search(r"\{.*\}", raw, re.S)
        if curly:
            try:
                return json.loads(curly.group(0))
            except Exception:
                return None
    return None


def upload_to_supabase(local_path: str, object_name: str) -> str:
    """
    Uploads a file to Supabase Storage and returns the public URL.
    Handles 'upsert' manually for compatibility.
    """
    bucket = supabase.storage.from_(settings.SUPABASE_BUCKET)
    try:
        bucket.remove([object_name])
    except Exception:
        pass

    with open(local_path, "rb") as f:
        bucket.upload(object_name, f)

    return bucket.get_public_url(object_name)


