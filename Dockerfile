FROM node:24.14-slim
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY  . .
RUN npm run build
ENV PORT=3000
EXPOSE 3000
CMD ["sh", "-c", "npm start -- --port ${PORT}"]