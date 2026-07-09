FROM node:22-alpine as builder

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build 

EXPOSE 5173

CMD [ "pnpm", "run", "dev" ]
