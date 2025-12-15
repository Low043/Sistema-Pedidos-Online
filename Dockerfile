FROM node:25.1.0

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN DATABASE_URL="postgresql://build:build@localhost:5432/build_db" npx prisma generate
RUN npm run build

COPY scripts/setup.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/setup.sh
ENTRYPOINT ["/usr/local/bin/setup.sh"]

EXPOSE 80
CMD ["npm", "run", "start"]