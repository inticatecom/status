<div align="center">
  <img src=".github/logo.png" alt="Inticate Logo" width="100">
  <h1>Inticate Status</h1>
  <p>A modern, real-time status page for monitoring your services.</p>
  
  <div align="center">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white" alt="TypeScript">
    <img src="https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white" alt="Next.js">
    <img src="https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white" alt="Node.js">
  </div>
</div>

**Inticate Status** is one of the many robust and advanced products made by **Inticate Softworks**. It provides you an easy way to monitor your products and/or services while presenting your customers/clients a clean interface making it easy for them to understand what's going on.

### Features

- A clean and robust interface
- An easy way to configure your services with the system providing developers a fast experience while setting it up
- Ready for production environment
- Performant and little to no setup, no database required

### Getting Started

The installation process has been made fairly simple to provide a quick and easy setup for developers.

> [!IMPORTANT]
> Before continuing, it is recommended that you have at least a basic understanding of TypeScript and programming in general. If you are deploying to a production environment, knowledge of Nginx or Apache is a bonus.

1. To start with the installation, we first need to clone the source code from the repository onto your local machine. This can be done simply by making use of **Git** to clone the repository from **GitHub**.
   ```bash
   git clone https://github.com/inticatecom/status.git
   ```
2. Now that we have cloned the source code to our local machine, we can begin setting up our environment.
   We can start by preparing our configuration files by making a copy of the sample ones provided by default.
   ```bash
   cd server/config && cp example.server.ts server.ts ** cp example.endpoints.ts endpoints.ts && cd ../
   cp .env.example .env
   ```
   Now that these configuration files have been created, we can populate them with the data we need. Start by opening our newly created `.env` and follow the steps provided in the comments to retrieve the necessary values. Then you can open the `server/config/server.ts` and `server/config/endpoints.ts` configuration files and configure them to your liking.
3. Now that our configuration files are ready and populated with the necessary data, we can start preparing to run our application.
   First make sure that you are in the root of your application and run the following commands for a **production** setup.
   ```bash
   npm run build
   npm run start
   ```
   And for a development setup where you just want to test or make modification to the application, you can run the following command.
   ```bash
   npm run dev
   ```

<details>
<summary><h3>Attributions</h3></summary>

Inticate Status was made possible by the many packages provided by the NPM repository and their respective authors. The authors of the packages will be listed below (not all).

#### Frontend

- [Next.js](https://nextjs.org/) - React framework that supports server-side rendering.
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework.
- [React Icons](https://react-icons.github.io/react-icons/) - Used for icons throughout the project.
- [Moment.js](https://momentjs.com/) - Parse, validate, manipulate, and display dates.
- [clsx](https://github.com/lukeed/clsx) - A tiny utility for constructing className strings.

#### Backend

- [Express.js](https://expressjs.com/) - The router for the backend.
- [Pino](https://getpino.io/) - Colored logs for debugging.
- [dotenv](https://github.com/motdotla/dotenv) - Loads environment variables for backend.
- [ky](https://github.com/sindresorhus/ky) - A typed alternative of the built-in Node.js 'fetch' function.

#### Development Tools

- [TypeScript](https://www.typescriptlang.org/) - Main language we used.
- [ESLint](https://eslint.org/) - Linting support.
- [tsx](https://github.com/privatenumber/tsx) - Allows us to run our TypeScript files at ease.
- [concurrently](https://github.com/open-cli-tools/concurrently) - Allows us to run the entire project with one command.

</details>

### License

You are free to use this product without attribution, however it is appreciated if you leave the "Powered by Inticate" watermark in the frontend. You can view more information about our [licensing here](LICENSE).
