# HUFS Capstone Project - Team "InnoSage"
2024-01 semester with mentor [@jeado](https://github.com/jeado), VP of Engineering in [Quotalab](https://www.quotalab.com/)  
Front-End repository


## Stacks

### For development

* Next.js: React SSR Framework
* Typescript
* AG Grid: JS Table library
* Mantine: React-Based UI library
* Zustand: State management library

### For production (Publishing)

* Nginx: Web Server (but using for reverse proxy. Only for local production build)
* Docker
* AWS Elastic Container Service (ECS)
* AWS Elastic Container Registry (ECR)
* Cloudflare DNS


## How to run

### Dev run

> Requirement
> * Node.js above v20.11.0
> * Yarn above v1.22.21 (Not yarn berry)

1. 'yarn install' for install dependencies.
2. `yarn dev` for run dev server.

### Local Product run

> Requirement
> * Docker (w/ docker-compose)

1. Set `.env` file. (See below section: .env properties)
2. Run `docker-compse.yml` by docker-compose
   (example: `docker compose up -d`)
3. Then docker will run container with Nginx and Next.js product build.


## .env properties

| Property    | Description                                                          | 
|-------------|----------------------------------------------------------------------|
| NEXT_PORT   | Next.js docker container port. (Only using for production container) | 
| SITE_URL    | HTTP URL for server domain.                                          |
| API_URL     | HTTP URL for API server.                                             |
| AI_API_URL  | HTTP URL for AI server.                                              |


## Published FE server architecture

![FE Architecture](https://raw.githubusercontent.com/InnoSage/front-end/main/docs/InnoSage-FE-architecture.png)


## UI

![Landing](https://raw.githubusercontent.com/InnoSage/front-end/main/docs/01-Landing.png)

![Login](https://raw.githubusercontent.com/InnoSage/front-end/main/docs/02-Login.png)

![Signup1](https://raw.githubusercontent.com/InnoSage/front-end/main/docs/03-01-Signup.png)

![Signup2](https://raw.githubusercontent.com/InnoSage/front-end/main/docs/03-02-Signup.png)

![Dashboard](https://raw.githubusercontent.com/InnoSage/front-end/main/docs/04-Dashboard.png)

![Sheet](https://raw.githubusercontent.com/InnoSage/front-end/main/docs/05-Sheet.png)

![AI](https://raw.githubusercontent.com/InnoSage/front-end/main/docs/06-AI.png)
