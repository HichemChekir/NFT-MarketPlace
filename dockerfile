FROM node:17-alpine

WORKDIR /app

COPY package.json .

COPY . .

RUN npm install app

EXPOSE 3000

RUN npm run dev

CMD [ "npx", "hardhat", "compile" ]