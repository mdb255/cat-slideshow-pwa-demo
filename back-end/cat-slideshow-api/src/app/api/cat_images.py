"""Cat Images API - S3 bucket image listing."""

from typing import List
import boto3
from botocore.exceptions import ClientError, BotoCoreError
from fastapi import APIRouter, HTTPException
from ..settings import settings

router = APIRouter(
    prefix="/cat-images",
    tags=["cat-images"],
)


@router.get("/", response_model=List[str])
def list_cat_images() -> List[str]:
    """
    List all cat image URLs from the S3 bucket.
    
    Returns:
        List of object URLs in the format: https://{bucket}.s3.amazonaws.com/{key}
    """
    try:
        # Initialize S3 client with credentials from settings
        s3_client = boto3.client(
            's3',
            aws_access_key_id=settings.cat_images_aws_access_key_id,
            aws_secret_access_key=settings.cat_images_aws_secret_access_key,
        )
        
        # List all objects in the bucket
        response = s3_client.list_objects_v2(Bucket=settings.cat_images_bucket_name)
        
        # Check if bucket has any contents
        if 'Contents' not in response:
            return []
        
        # Build list of object URLs
        image_urls = []
        for obj in response['Contents']:
            key = obj['Key']
            url = f"https://{settings.cat_images_bucket_name}.s3.amazonaws.com/{key}"
            image_urls.append(url)
        
        return image_urls
        
    except ClientError as e:
        error_code = e.response.get('Error', {}).get('Code', 'Unknown')
        error_message = e.response.get('Error', {}).get('Message', str(e))
        raise HTTPException(
            status_code=500,
            detail=f"S3 error ({error_code}): {error_message}"
        )
    except BotoCoreError as e:
        raise HTTPException(
            status_code=500,
            detail=f"AWS connection error: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Unexpected error: {str(e)}"
        )

