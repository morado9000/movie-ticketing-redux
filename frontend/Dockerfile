FROM node:19-alpine as build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ARG REACT_APP_MOVIE_USER
ARG REACT_APP_MOVIE_PASSWORD

ENV REACT_APP_MOVIE_USER $REACT_APP_MOVIE_USER
ENV REACT_APP_MOVIE_PASSWORD $REACT_APP_MOVIE_PASSWORD

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

