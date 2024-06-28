FROM node:20-alpine AS builder

ENV NODE_ENV=build

USER node
WORKDIR /home/node

COPY --chown=node:node . .

RUN yarn install --frozen-lockfile --ignore-scripts

RUN yarn build

# ---

FROM node:20-alpine AS runner

ENV NODE_ENV=production

USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/dist/ ./dist/

EXPOSE 8080

CMD ["node", "dist/main.js"]
