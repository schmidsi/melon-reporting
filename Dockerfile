# -----------------------------------------------------------------------------
# apk dependencies
# -----------------------------------------------------------------------------
FROM node:10.9.0-alpine as apk-dependencies
WORKDIR /app

# Install system dependencies.
RUN apk add --update --no-cache --virtual .apk git python make g++

# -----------------------------------------------------------------------------
# npm dependencies
# -----------------------------------------------------------------------------
FROM apk-dependencies as npm-dependencies

COPY yarn.lock package.json /app/

# Install node dependencies and clean up afterwards.
RUN yarn install --ignore-engines --frozen-lockfile --pure-lockfile && \
  yarn cache clean && \
  apk del .apk

# -----------------------------------------------------------------------------
# development
# -----------------------------------------------------------------------------
FROM node:10.9.0-alpine as development
WORKDIR /app

# We don't copy anything else here because the rest is mounted as a volume
# in the docker-compose file for development.
COPY --from=npm-dependencies /app/node_modules ./node_modules

EXPOSE 3010

CMD ["yarn", "dev"]

# -----------------------------------------------------------------------------
# build
# -----------------------------------------------------------------------------
FROM development as build

COPY . /app
RUN yarn app:build

# -----------------------------------------------------------------------------
# production
# -----------------------------------------------------------------------------
FROM nginxinc/nginx-unprivileged:stable

# Use UTF-8 in the nginx config.
USER root
RUN sed -i 's/#charset koi8-r/charset utf-8/g' /etc/nginx/conf.d/default.conf
USER nginx

COPY --from=build /app/build/production /usr/share/nginx/html
