# Set up a Static Website using Vultr

This folder contains my submission for the MLH challenge: **Set up a Static Website using Vultr**.

## Live URL (Vultr Object Storage)
https://sgp1.vultrobjects.com/mlh-static-20260319/index.html

## What I did
- Created a simple `index.html` file (Hello World page).
- Provisioned a Vultr **Object Storage** subscription (Singapore region).
- Created a bucket: `mlh-static-20260319`.
- Uploaded `index.html` to the bucket and set the object permission to **Public**.
- Verified the page is accessible via the Vultr public URL above.

## Files
- `index.html` — The static web page.
- (Optional) `upload.py` — Script used to upload `index.html` via S3-compatible API (Boto3).  
  > Note: Do **NOT** commit any credentials (Access/Secret keys). Prefer environment variables or delete the script after use.

## Notes / Safety
- The URL is public. Do not upload sensitive or private data to the bucket.
- If you created temporary S3 credentials for uploading, rotate/regenerate them after completing the task.

## How to update the page
1. Edit `index.html`.
2. Re-upload it to the same bucket (ensure `public-read` / public permission is maintained).
3. Refresh the live URL.