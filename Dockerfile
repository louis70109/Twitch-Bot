FROM node:10.13-alpine
MAINTAINER NiJia <louis70109@gmail.com>
ENV NODE_ENV production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "/app/"]
RUN npm install
COPY . /app/
EXPOSE 5000
CMD ["npm", "start"]