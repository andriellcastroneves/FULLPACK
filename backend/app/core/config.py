import os
from pathlib import Path

try:
    from dotenv import load_dotenv
except ImportError:
    load_dotenv = None

BASE_DIR = Path(__file__).resolve().parents[2]
DOTENV_PATH = BASE_DIR / ".env"


def _load_env_fallback(dotenv_path: Path) -> None:
    for raw_line in dotenv_path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue

        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


if DOTENV_PATH.is_file():
    if load_dotenv is not None:
        load_dotenv(dotenv_path=DOTENV_PATH, override=False)
    else:
        _load_env_fallback(DOTENV_PATH)

APP_ENV = os.getenv("APP_ENV", "development").strip().lower()
DATABASE_URL = os.getenv("DATABASE_URL")
SECRET_KEY = os.getenv("SECRET_KEY", "")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://127.0.0.1:3000")
BACKEND_CORS_ORIGINS = [
    origin.strip()
    for origin in os.getenv("BACKEND_CORS_ORIGINS", FRONTEND_URL).split(",")
    if origin.strip()
]

IS_PRODUCTION = APP_ENV == "production"
DOCS_ENABLED = os.getenv("DOCS_ENABLED", "true").strip().lower() == "true"

if not DATABASE_URL:
    raise RuntimeError(
        "DATABASE_URL nao configurada. Defina a variavel de ambiente antes de iniciar a API."
    )

if IS_PRODUCTION and not SECRET_KEY:
    raise RuntimeError(
        "SECRET_KEY nao configurada para producao. Defina uma chave forte antes do deploy."
    )
