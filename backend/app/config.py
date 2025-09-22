from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    database_url: str
    app_title: str = "Finance Control API"
    app_version: str = "1.0.0"
    debug: bool = False
    allowed_origins: str = "http://localhost:3000"

    @property
    def cors_origins(self) -> List[str]:
        return [origin.strip() for origin in self.allowed_origins.split(",")]

    class Config:
        env_file = ".env"

settings = Settings()