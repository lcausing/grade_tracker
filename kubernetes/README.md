# Kubernetes YAMLs for Grade Tracker

## Files

**Configuration & Databases:**
- `namespace-config.yaml` - Namespace, secrets, and config maps
- `mysql.yaml` - MySQL database with persistent storage
- `mongodb.yaml` - MongoDB database with persistent storage

**Microservices:**
- `auth-service.yaml` - Authentication service (2-8 replicas)
- `data-entry-service.yaml` - Grade entry service (2-8 replicas)
- `analytics-service.yaml` - Analytics service (2-10 replicas)
- `show-results.yaml` - Web frontend (2-6 replicas)

**Autoscaling:**
- `hpa.yaml` - Horizontal Pod Autoscaler for all services

## Deploy
```bash

# Update images first if needed

# Apply in order to update configuration
kubectl apply -f kubernetes/namespace-config.yml
kubectl apply -f kubernetes/mysql.yml
kubectl apply -f kubernetes/mongodb.yml
kubectl apply -f kubernetes/auth-service.yml
kubectl apply -f kubernetes/data-entry-service.yml
kubectl apply -f kubernetes/analytics-service.yml
kubectl apply -f kubernetes/show-results.yml
kubectl apply -f kubernetes/hpa.yml

# Or apply all at once
kubectl apply -f kubernetes/
# Might wanna do it twice to ensure everything is up if you use this command


# Switch to different namespace
kubectl config set-context --current --namespace=grade-tracker

# Check logs
kubectl logs -f deployment/auth-service

# Expose Ports (if needed)
kubectl expose deployment show-results --port 80 --target-port 3002
kubectl expose deployment auth-service --port 80 --target-port 4000
kubectl expose deployment data-entry-service --port 80 --target-port 3001
kubectl expose deployment analytics-service --port 80 --target-port 5003

# Port forward Services (if needed)
kubectl port-forward svc/show-results 3002:3002
kubectl port-forward svc/auth-service 4000:80
kubectl port-forward svc/data-entry-service 3001:3001
kubectl port-forward svc/analytics-service 5003:80

```

## What it does
- Each service is a separate YAML file for easy management
- Services start with 2 replicas (high availability)
- Autoscales based on CPU (70%) and Memory (80%)
- MySQL and MongoDB with persistent storage
- Service discovery via Kubernetes DNS
- Health checks for pod reliability
