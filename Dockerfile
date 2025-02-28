FROM node:22-alpine as builder
WORKDIR /usr/src/app
COPY ./package.json ./yarn.lock ./
RUN corepack enable && corepack install --global yarn@4.6.0
RUN yarn install
COPY . .
RUN yarn build

FROM builder as runner
EXPOSE 3000
ENTRYPOINT ["sh", "-c"]
CMD ["yarn start:dev"]