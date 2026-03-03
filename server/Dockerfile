FROM node:20-alpine

RUN apk add --no-cache python3 make g++ ca-certificates
WORKDIR /home/app

COPY package.json package-lock.json ./

RUN npm install --force

COPY . .

EXPOSE 4000

CMD ["node", "index.js"]