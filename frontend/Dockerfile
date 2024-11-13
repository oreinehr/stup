# syntax = docker/dockerfile:1

# Ajuste da versão do Node.js conforme desejado
ARG NODE_VERSION=20.14.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"

# Definindo o diretório de trabalho
WORKDIR /app

# Configura o ambiente de produção
ENV NODE_ENV="production"

# Etapa de build para reduzir o tamanho final da imagem
FROM base as build

# Instala pacotes necessários para build dos módulos do Node.js
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3 && \
    rm -rf /var/lib/apt/lists/*

# Copia apenas os arquivos necessários para instalar dependências
COPY package-lock.json package.json ./
RUN npm ci --include=dev

# Copia o código da aplicação
COPY . .

# Compila a aplicação
RUN NODE_OPTIONS=--openssl-legacy-provider npm run build

# Remove as dependências de desenvolvimento
RUN npm prune --omit=dev

# Etapa final para criar a imagem da aplicação
FROM base

# Copia a aplicação compilada da etapa de build
COPY --from=build /app /app

# Expõe a porta padrão da aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start"]
