FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
COPY .npmrc ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "index.js"]
