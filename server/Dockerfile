FROM node:12
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . /app

CMD ["npm", "run", "start"]
EXPOSE 3000
