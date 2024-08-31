FROM node:20-bullseye

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm prisma generate --schema ./apps/general-api/prisma/schema.prisma

EXPOSE 3000

CMD ["pnpm", "nx", "serve", "general-api"]
