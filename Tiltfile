watch_file('./.env')

load('ext://dotenv', 'dotenv')

docker_compose('./docker-compose.yml')

yml = read_yaml('./docker-compose.yml')

services = yml.get('services')

for name in services:
  dc_resource(name, resource_deps=services.get(name).get('depends_on', []))
