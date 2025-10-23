from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    database_url: str
    cat_images_aws_access_key_id: str
    cat_images_aws_secret_access_key: str
    cat_images_bucket_name: str = "cat-slideshow-demo"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_prefix="",
        case_sensitive=False,
    )

settings = Settings()
