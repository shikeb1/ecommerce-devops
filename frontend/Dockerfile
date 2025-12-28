#BUILD STAGE


FROM node:18-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build


#PRODUCTION STAGE

FROM nginx:alpine
COPY --from=build /app/build /usr/nginx/html

