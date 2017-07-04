FROM node:8.1
RUN npm install -g jasmine-node
RUN npm install -g karma
COPY . /app
WORKDIR /app
CMD ["npm", "test"]