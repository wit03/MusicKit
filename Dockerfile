FROM node:18

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Bundle app source
COPY ./server .

EXPOSE 8080
CMD [ "node", "app.js" ]