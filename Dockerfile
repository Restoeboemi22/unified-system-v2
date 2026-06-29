# Base stage for pnpm setup
FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Builder stage
FROM base AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY packages ./packages
COPY services ./services

# Install all dependencies (development included) for building
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Build the specified service and its dependencies
ARG SERVICE_PATH
RUN pnpm --filter ./${SERVICE_PATH}... build

# Isolate the built package and its production dependencies using deploy
RUN pnpm --filter ./${SERVICE_PATH} deploy --prod /app/pruned

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app

# Install openssl for Prisma
RUN apk add --no-cache openssl

COPY --from=builder /app/pruned ./

# Generate Prisma Client (if the service uses it)
# We look for a prisma directory and generate if it exists
RUN if [ -d "prisma" ]; then npx prisma generate; fi

# The port is dynamic via Railway/Cloud Run, defaults to 3000
ENV PORT=3000
EXPOSE $PORT

# Start the Node.js application
CMD ["node", "dist/main.js"]
