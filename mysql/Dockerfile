FROM mysql:8.0

# Set default env vars (override in compose if needed)
ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_DATABASE=grade_tracker
ENV MYSQL_USER=appuser
ENV MYSQL_PASSWORD=apppass

# Copy initialization script
COPY init.sql /docker-entrypoint-initdb.d/