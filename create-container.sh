# build docker container
docker build -f Dockerfile -t demo-client:latest .

# start docker container
docker run -p3000:80 --name demo-client demo-client:latest

