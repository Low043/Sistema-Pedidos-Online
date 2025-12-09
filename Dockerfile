FROM node:25.1.0

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

COPY scripts/setup.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/setup.sh
ENTRYPOINT ["/usr/local/bin/setup.sh"]

EXPOSE 3000
CMD ["npm", "run", "start"]