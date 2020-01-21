FROM node:11-alpine
COPY _build_prod/ ./
RUN npm install --no-optional --only=production

EXPOSE 8000

CMD ["npm", "run", "prod"]
