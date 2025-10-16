# Use official Node.js image
FROM node:18

# Create app directory
WORKDIR /app 

# Copy files
COPY package*.json ./
RUN npm install 

COPY . .

EXPOSE 4000

CMD ["node", "server.js"]
