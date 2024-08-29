# Use the latest Nginx version
FROM nginx:latest

# Copy the static files to the Nginx HTML directory
COPY . /usr/share/nginx/html

# Expose the port Nginx runs on
EXPOSE 80
