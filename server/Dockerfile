FROM bcgovimages/alpine-node-libreoffice:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "index.js"]
