# Create image based on the official Node 10 image from dockerhub
FROM node:14.17

# Create a directory where our app will be placed
RUN mkdir -p /app

# Change directory so that our commands run inside this new directory
WORKDIR /app
COPY package*.json /app/

# Install dependecies
RUN npm install
RUN npm install concurrently

# Expose the port the app runs in
EXPOSE 4200
