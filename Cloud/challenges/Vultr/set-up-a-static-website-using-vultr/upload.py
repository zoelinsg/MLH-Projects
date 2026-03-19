import boto3

hostname = "sgp1.vultrobjects.com"  
access_key = "W8IT2SDM2J6JU7HGD3Q8"
secret_key = "wcQvK53oVdWJupbWIiCaGouD87aqvSALnGNinRTW"

bucket = "mlh-static-20260319"
local_file = "index.html"
key = "index.html"

session = boto3.session.Session()
client = session.client(
    "s3",
    region_name=hostname.split(".")[0],
    endpoint_url="https://" + hostname,
    aws_access_key_id=access_key,
    aws_secret_access_key=secret_key,
)

with open(local_file, "rb") as f:
    client.put_object(
        Bucket=bucket,
        Key=key,
        Body=f,
        ContentType="text/html; charset=utf-8",
        ACL="public-read",
    )

print("Uploaded:", key)