FROM node:8.1

COPY ./start.sh /app/package/start.sh

# install bower and gulp for ui building
RUN npm install --global bower
RUN echo '{ "allow_root": true }' > /root/.bowerrc
RUN npm install gulp -g

WORKDIR /app/package
ENTRYPOINT /app/package/start.sh