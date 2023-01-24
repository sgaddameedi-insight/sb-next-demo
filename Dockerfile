# ==== CONFIGURE =====
# Land on a node version later
FROM node:latest

# ==== BUILD =====
# ***** DOCKER has a difficult time running package.json in a different folder prior to creating the image
# Recommend reducing to one package.json; alternatively, client can be manually built before running docker container

WORKDIR .
RUN npm ci

# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000
# Start the app
CMD [ "npm", "start" ]

# ==== COMMANDS TO RUN =====
# docker build . -t dp-studio-egift-ui
# docker run -p 3000:3000 -d dp-studio-egift-ui
