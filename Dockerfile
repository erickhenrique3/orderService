FROM node:18

WORKDIR /app

# Copia apenas arquivos de lock e package.json para instalar dependências
COPY package.json pnpm-lock.yaml ./

# Instala pnpm e dependências
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Copia o restante do código (src, prisma, etc)
COPY . .

# Expõe a porta da aplicação
EXPOSE 3000

# Comando para rodar seu app
CMD ["pnpm", "run", "start:docker"]
