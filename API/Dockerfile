# Create image based on the official Node 10 image from dockerhub
FROM node:14.17

# Create a directory where our app will be placed
RUN mkdir -p /app

# Change directory so that our commands run inside this new directory
WORKDIR /app

# Install dependecies
COPY package.json /app/
RUN npm install

CMD [ "npm", "start" ]


# Expose the port the app runs in
EXPOSE 3000
