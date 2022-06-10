FROM node:latest
WORKDIR /src/server.js
COPY package.json /src/server.js
RUN npm install
COPY . /src/server.js
CMD [ "npm", "start" ]
EXPOSE 8081

# docker build -t "nama docker container" .
# docker run -p 8081:8081 "nama docker container"