FROM node:lts as base

WORKDIR /workout-tracker
COPY package*.json ./
EXPOSE 4000

FROM base as production
ENV NODE_ENV=production
RUN npm ci --production=false
COPY . .
CMD ["npm", "start"]

FROM base as dev
ENV NODE_ENV=development
ENV DATABASE_URL=postgres://postgres:postgres@database:5432/postgres
RUN npm ci --production=false
COPY . .
CMD npm run prisma:generate && npm run prisma:migrate && npm run dev