# FROM node:22-alpine AS builder

# RUN corepack enable

# WORKDIR /app

# COPY package.json pnpm-lock.yaml ./


# RUN pnpm install --frozen-lockfile

# COPY . .

# # RUN pnpm run build



# FROM node:22-alpine AS production

# RUN apk add --no-cache dumb-init

# RUN corepack enable

# WORKDIR /app

# RUN addgroup -S nodejs && \
#     adduser -S nodeuser -G nodejs

# COPY package.json pnpm-lock.yaml ./

# RUN pnpm install --prod --frozen-lockfile

# COPY --from=builder /app/dist ./dist

# RUN chown -R nodeuser:nodejs /app

# USER nodeuser

# ENV NODE_ENV=production

# EXPOSE 8000

# CMD ["dumb-init", "node", "dist/index.js"]

FROM node:22-alpine AS builder

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 8000

CMD ["pnpm", "start"]