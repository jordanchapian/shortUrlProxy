FROM node:8.1
RUN npm install -g jasmine-node
COPY . /app
WORKDIR /app
CMD ["npm", "test"]