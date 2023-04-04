FROM node:19-alpine

WORKDIR /app

COPY package.json .

RUN npm install

ARG REACT_APP_MOVIEDB_KEY

ENV REACT_APP_MOVIEDB_KEY $REACT_APP_MOVIEDB_KEY

COPY . .

CMD [ "npm", "run", "start" ]