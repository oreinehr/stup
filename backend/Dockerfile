# syntax = docker/dockerfile:1

ARG NODE_VERSION=20.14.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"

# Diretório de trabalho dentro do container
WORKDIR /app

# Etapa de build para reduzir o tamanho da imagem final
FROM base as build

# Instalar pacotes necessários para compilar módulos Node.js
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código da aplicação
COPY . .

# Etapa final para a imagem da aplicação
FROM base

# Definir ambiente de produção
ENV NODE_ENV="production"

# Copiar aplicação construída
COPY --from=build /app /app

# Expor a porta e definir o comando de inicialização
EXPOSE 8080
CMD [ "node", "src/server.js" ]
