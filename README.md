# HUFS Capstone Project
2024-01 semester with [Quotalab](https://www.quotalab.com/)    
Front-End repository

## How to run

### Dev run

> Requirement
> * Node.js above v20.11.0
> * Yarn above v1.22.21

1. 'yarn install' for install dependencies.
2. `yarn dev` for run dev server.

### Product run

> Requirement
> * Docker (w/ docker-compose)

1. Set `.env` file. (See below section: .env properties)
2. run `docker-compose.yml` by docker-compose
   (example: `docker-compose up -d`)

## .env properties

| Property   | Description                                                          | 
|------------|----------------------------------------------------------------------|
| NEXT_PORT  | Next.js docker container port. (Only using for production container) | 
| SITE_URL   | HTTP URL for server domain.                                          |
