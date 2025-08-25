from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    GEMINI_API_KEY: str
    MODEL_NAME: str = "gemini-2.0-flash"
    OUTPUT_DIR: str = "outputs"
    DEBUG: bool = False
    CORS_ORIGINS: list[str] = ["*"]

    SUPABASE_URL: str
    SUPABASE_KEY: str
    SUPABASE_BUCKET: str = "resumes"  

    model_config = SettingsConfigDict(env_file=".env", case_sensitive=False)

settings = Settings()
