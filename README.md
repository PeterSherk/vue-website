# Personal Website
Welcome to my personal website! This is a place for me to experiment with new technologies, and as such uptime and functionality is not guaranteed. That being said, a stable state is always attempted to be maintained, and coding best practices are followed as much as possible.

## API
The API for this website is written in Node and deployed via a Docker container. You can read more [here](./api/README.md).

## Frontend
The frontend stack is written in Vue, and deployed via a regular static bundle fronted with NGINX. You can read more [here](./website/README.md)

## Database
This applications information is saved in a Postgres database, which is deployed via an official Postgres Docker image. Initial data and tables are seeded to the Docker containers via an [init script](./db/init/init.sql).

## Deployment
This application is deployed using the following technologies:
- 32-bit Raspbian OS on a 8GB [Raspberry Pi 4](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/)
- [NGINX](https://www.nginx.com/) webserver
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Let's Encrypt](https://letsencrypt.org/) HTTPS/TLS certificates, maintained and updated with [Certbot](https://certbot.eff.org/)