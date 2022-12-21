# Workout Tracker

This project is created in educational purpose to learn

- graphql
- ddd
- docker

## Local development

### Requirements

- Docker
- Docker Compose V2
- Node ~ 18

## Bootstrap

We are trying to use docker in local dev for consistency and to avoid any local environment issues.

```bash
# build container
docker compose -f ./docker-compose.dev.yml build
# run container
docker compose -f ./docker-compose.dev.yml up
```

but you should anyway to install node modules for IDE intellisense support.

```bash
npm isntall
# generate db client and it types
npm run prisma:generate
# run migration
npm run prisma:migrate
# run project
npm run dev
```

after prisma schema change you should

- run `npm run prisma:generate` to generate new client and types.
- run `npx prisma migrate dev --name --migration-name --create-only` to create new migration file.
- run `npm run prisma:migrate` to apply new migration.
- restart docker container

! Do not forget to create migrations after schema changes.



