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
# Apply in order
kubectl apply -f kubernetes/namespace-config.yaml
kubectl apply -f kubernetes/mysql.yaml
kubectl apply -f kubernetes/mongodb.yaml
kubectl apply -f kubernetes/auth-service.yaml
kubectl apply -f kubernetes/data-entry-service.yaml
kubectl apply -f kubernetes/analytics-service.yaml
kubectl apply -f kubernetes/show-results.yaml
kubectl apply -f kubernetes/hpa.yaml

# Or apply all at once
kubectl apply -f kubernetes/
```

## What it does
- Each service is a separate YAML file for easy management
- Services start with 2 replicas (high availability)
- Autoscales based on CPU (70%) and Memory (80%)
- MySQL and MongoDB with persistent storage
- Service discovery via Kubernetes DNS
- Health checks for pod reliability
