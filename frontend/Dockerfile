FROM node:20-alpine

WORKDIR /home/app

COPY package.json package-lock.json ./

RUN npm install --force

COPY . .

CMD ["npm", "run", "dev"]