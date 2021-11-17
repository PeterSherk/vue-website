FROM node:lts as builder

WORKDIR /usr/src/app

COPY . .

# RUN apt install make gcc g++ python

RUN npm ci
RUN npm run build
RUN npm ci --production

FROM node:lts as runner

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 8080
CMD [ "npm", "start" ]