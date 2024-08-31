#!/bin/bash

echo "Building Docker image..."
docker build -t great-read-image .

echo "Tagging Docker image..."
docker tag great-read-image:latest us-central1-docker.pkg.dev/great-read-398408/cloud-run-manual-deploy/great-read-image:latest

echo "Pushing Docker image to Artifact Registry..."
docker push us-central1-docker.pkg.dev/great-read-398408/cloud-run-manual-deploy/great-read-image:latest

echo "Deploying Docker image to Google Cloud Run..."
gcloud run deploy --image us-central1-docker.pkg.dev/great-read-398408/cloud-run-manual-deploy/great-read-image:latest --platform managed

echo "Deployment completed."
