FROM node:20-alpine as builder

WORKDIR /app

COPY package.*json ./

COPY tsconfig.*json ./

RUN pnpm install --frozen-lockfile

COPY src/ ./src/

RUN pnpm run builder

CMD ["pnpm", "start"]

#prod

FROM node:20-alpine as production

RUN apk add --no-cache dumb-init

WORKDIR /app

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001 -G nodejs

COPY package.*json ./

RUN pnpm install --omit=dev --frozen-lockfile && \
     pnpm cache clean --force

COPY --from=builder  /app/dist  ./app

RUN chown -R nodeuser:nodejs /app


USER nodeuser

EXPOSE 8000

ENV nodeuser=production

CMD [ "dumb-init" , "node", "dist/index.js" ]
     