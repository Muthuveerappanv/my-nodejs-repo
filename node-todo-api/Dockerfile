FROM node:alpine
ENV PORT=8080 \
    MONGODB_URI=mongodb://mongo:mongo@my-mongo:27017 \
    JWT_SECRET=Pdppaw903131ldaaalflpaedadkadadaddadaweewwrrgg \
    NODE_ENV=prod
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD npm start
EXPOSE 8080