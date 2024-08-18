# go build
FROM node:16-alpine3.12 AS backend-build

WORKDIR /
COPY    backend backend
WORKDIR /backend
RUN \
    npm i && \
    npm run build:release

#
# final stage:
#
FROM node:16-alpine3.12

COPY --from=backend-build \
    /backend/dist \
    /app

COPY --from=backend-build \
    /backend/.env \
    /app

COPY --from=backend-build \
    /backend/node_modules \
    /app/node_modules

WORKDIR /app

RUN \
    npm install pm2 -g
EXPOSE 3000

CMD ["pm2-runtime", "/app/server.js"]
