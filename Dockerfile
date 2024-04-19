FROM node:16.18.0-alpine as builder

RUN mkdir p /home/app

WORKDIR /home/app
RUN npm config set registry https://registry.npmmirror.com/
COPY package*.json ./
COPY prisma ./prisma/

RUN npm install --production
RUN npm install @nestjs/cli -g

COPY . .

RUN npm run build

FROM node:16.18.0-alpine
WORKDIR /home/app
COPY --from=builder /home/app/. .
RUN npx prisma generate
RUN npx prisma migrate deploy


VOLUME ["/logs"]
EXPOSE 3000
CMD ["node", "dist/src/main.js"]