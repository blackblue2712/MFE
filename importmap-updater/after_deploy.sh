echo "Downloading import map from S3"
aws s3 cp s3://nghiadang-single-spa/importmap.json importmap.json
echo "Updating import map to point to new version of @thawkin3/root-config"
node update-importmap.js
echo "Uploading new import map to S3"
aws s3 cp importmap.json s3://nghiadang-single-spa/importmap.json --cache-control 'public, must-revalidate, max-age=0' --acl 'public-read'
echo "Deployment successful"