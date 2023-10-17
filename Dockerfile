FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 90
CMD PORT=90 DATABASE_URL=mysql://root:0sqw5nu$muisbctvnhx4c1bcuo2bqqlt@roundhouse.proxy.rlwy.net:51219/railway npm start
