FROM node:lts-alpine
WORKDIR /app
COPY . /app
RUN corepack enable yarn
RUN yarn install


CMD ["yarn", "start"]
