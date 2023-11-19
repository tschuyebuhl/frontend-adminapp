FROM docker.io/nginxinc/nginx-unprivileged:1.19-alpine

COPY dist /app
COPY nginx.conf /etc/nginx/nginx.conf
RUN chmod -R g+rwx /app /var/cache/nginx /var/log/nginx