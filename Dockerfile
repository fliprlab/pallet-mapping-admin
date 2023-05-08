# Node Block

FROM node:16-alpine as nodework

RUN mkdir -p /usr/app/
WORKDIR /usr/app

COPY package.json .
RUN npm i --force
COPY . .
RUN npm run build-dev

# Nginx Block
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=nodework /usr/app/build .
COPY --from=nodework /usr/app/nginx/default.conf /etc/nginx/conf.d