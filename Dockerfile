# PublicIA v121 — imagem oficial Node.js via Amazon ECR Public,
# evitando a consulta inicial ao Docker Hub que falhou no Railpack.
FROM public.ecr.aws/docker/library/node:20-bookworm-slim

ENV NODE_ENV=production
WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev --no-audit --no-fund

COPY --chown=node:node server.js conversionhub.js datahub.js ./
COPY --chown=node:node public/ ./public/

USER node
EXPOSE 3000
CMD ["node", "server.js"]
