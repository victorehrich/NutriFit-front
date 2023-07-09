FROM node:16-alpine3.17 as angular
WORKDIR /app
COPY package.json /app
RUN npm i npm@latest -g
RUN npm install --silent
COPY . .
RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular app/dist/nutrifit-front /usr/share/nginx/html
COPY ./config/nginx.conf /etc/ngix/conf.d/default.conf
