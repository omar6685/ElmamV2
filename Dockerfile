# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies in production mode
RUN npm ci

# Bundle app source
COPY . .

# Create the production build
RUN npm run build
# RUN npm run seed

# Expose the port on which the app will run
EXPOSE 4000

# Start the server using the production build
CMD ["npm", "run", "start:dev"]