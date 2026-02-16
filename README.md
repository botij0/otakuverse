<img alt="image" src="https://github.com/user-attachments/assets/a445ad29-57f3-4047-a4dd-8778b2c6e490" style="width: 100%;" />

---

Website with content related to anime and manga. Information obtained from myanimelist but with a much more modern interface. Top most popular anime, seasonal anime, recommendations, top manga, top characters, specific search engine.

[🔗 You can Try it Here!](https://otakuverse.botij0tech.com/)

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Shadcn](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Axios](https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white)
![Tans Stack Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white)


## Contents

1. [Execution](#execution)
    - [Environment Variables](#environment-variables)
    - [Run App Locally](#run-app-locally)
    - [Run App Docker](#run-app-docker)

## Execution

This section contains how to execute the application once you have cloned the repository.

### Environment variables

1. Copy the enviroment template:
```
cp .env.template .env
```
> [!NOTE]
> In the `template_secrets.env` file you can find the following variable:
>
> - `VITE_API_URL=https://api.jikan.moe/v4`
>
> Althoug it is a public api and does not need an `api_key`, the environment configuration is used in case it changes in the future.

### Run app locally

For this project, I used the package manager of `pnpm` avilable on: [Pnpm](https://pnpm.io/)

1. Install dependencies:
```
pnpm install
```
2. Run app:
```
pnpm run dev
```

### Run app docker
1. Build the image:
```
docker build -t otakuverse .
```
2. Run the container:
```
docker run -d -p 3333:80 otakuverse:latest
```

