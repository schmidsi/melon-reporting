FROM melonproject/installer:latest AS installer

# -----------------------------------------------------------------------------
# development
# -----------------------------------------------------------------------------
FROM node:9.7.0-alpine as development
WORKDIR /app/packages/graphql-server

COPY --from=installer /app/node_modules /app/node_modules
COPY --from=installer /app/packages/graphql-server/node_modules /app/packages/graphql-server/node_modules

CMD ["yarn", "dev"]

# -----------------------------------------------------------------------------
# build
# -----------------------------------------------------------------------------
FROM development as builder

COPY . /app
RUN yarn build

# -----------------------------------------------------------------------------
# production
# -----------------------------------------------------------------------------
FROM node:9.7.0-alpine
WORKDIR /app/packages/graphql-server

COPY --from=installer /app/node_modules_production /app/node_modules
COPY --from=installer /app/packages/graphql-server/node_modules /app/node_modules
COPY --from=builder /app/packages/graphql-server/dist /app/packages/graphql-server/dist
COPY packages/graphql-server/package.json packages/graphql-server/.env.defaults /app/packages/graphql-server/

VOLUME ["/etc/letsencrypt/live"]

CMD ["yarn", "start"]
