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

# Step 1: Build all shared packages first
RUN pnpm --filter "./packages/**" build

# Step 2: Build the specific service
ARG SERVICE_PATH
RUN pnpm --filter ./${SERVICE_PATH} build

# Step 3: Generate Prisma client in builder stage (where CLI is available)
RUN if [ -d "${SERVICE_PATH}/prisma" ]; then \
      cd ${SERVICE_PATH} && \
      npx prisma generate; \
    fi

# Step 4: Isolate production dependencies
RUN pnpm --filter ./${SERVICE_PATH} deploy --prod /app/pruned

# Step 5: Copy generated Prisma client if it exists
RUN if [ -d "${SERVICE_PATH}/generated" ]; then \
      cp -r ${SERVICE_PATH}/generated /app/pruned/generated; \
    fi

# Step 6: Copy prisma schema for migrations at runtime
RUN if [ -d "${SERVICE_PATH}/prisma" ]; then \
      cp -r ${SERVICE_PATH}/prisma /app/pruned/prisma; \
    fi

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app

# Install openssl for Prisma binary engine
RUN apk add --no-cache openssl

COPY --from=builder /app/pruned ./

# The port defaults to 3000
ENV PORT=3000
EXPOSE $PORT

# Run Prisma schema sync at startup when migrations are unavailable, then start app
CMD ["sh", "-c", "if [ -d 'prisma' ]; then npx prisma migrate deploy 2>/dev/null || npx prisma db push; fi && node dist/main.js"]
