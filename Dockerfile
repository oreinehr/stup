# Base da aplicação
FROM node:20-slim

WORKDIR /app

# Copie o package.json e o package-lock.json para instalar as dependências
COPY package*.json ./

# Instale todas as dependências necessárias
RUN npm install --production

# Copie o restante do código para o contêiner
COPY . .

# Gere o build da aplicação
RUN npm run build

# Exponha a porta 8080
EXPOSE 8080

ENV PORT=8080

# Inicie a aplicação
CMD ["npm", "start"]
