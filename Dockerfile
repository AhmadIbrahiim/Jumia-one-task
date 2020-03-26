# Use the official image as a parent image
FROM node:10.17.0

# Set the working directory
WORKDIR /usr/src/jumia

# Copy the files from your host to your current location
COPY .  . 

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 8088

# Install pacakges before build the image
RUN npm install

# Run the specified command within the container.
CMD [ "npm", "start" ]

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .