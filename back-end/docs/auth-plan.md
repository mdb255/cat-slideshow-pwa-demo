Plan: Secure FastAPI with AWS Cognito

1. Add Dependencies
File: back-end/cat-slideshow-api/pyproject.toml
Add python-jose[cryptography] for JWT validation
Add requests for fetching JWKs

2. Update Settings
File: back-end/cat-slideshow-api/src/app/settings.py
Add user_pool_id: str
Add app_client_id: str
Add aws_region: str
Add optional jwks_cache_ttl: int = 3600 (1 hour TTL)

3. Create Auth Module
File: back-end/cat-slideshow-api/src/app/auth.py (new file)
Create JWKs cache with TTL
Function to fetch and cache JWKs from Cognito
Function to verify JWT access token against Cognito JWKs
Custom dependency get_current_user that:
Extracts Bearer token from Authorization header
Verifies token signature, expiration, audience (app_client_id)
Returns decoded token claims
Raises 401 HTTPException for invalid/missing tokens
Optional dependency get_current_user_optional for public endpoints

4. Secure Cat Images Endpoint
File: back-end/cat-slideshow-api/src/app/api/cat_images.py
Import get_current_user dependency
Add Depends(get_current_user) to the endpoint
Endpoint now requires valid Cognito access token

5. Documentation
File: back-end/cat-slideshow-api/README.md
Add section on authentication setup
Document required environment variables
Document how to obtain and use access tokens