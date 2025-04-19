<a id="readme-top"></a>

<br />
<div align="center">
  <a href="https://github.com/axelwesselgren/stackster-public">
    <img src="images/stackster.png" alt="Logo">
  </a>

<h3 align="center">Stackster</h3>

  <p align="center">
    The public and open-source repository of Stackster meant for viewing the source-code
  </p>
</div>

## About The Project

<img src="images/stackster-medium.png" alt="Logo">

A full-stack web application for keeping track of different components in your tech stack including API keys and environment variables. Written in TypeScript with the use of Next.js as the main framework

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Built With

These are some of the major parts of this project, it consists of way more frameworks and languages, just not mentioned here.

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Shadcn](https://img.shields.io/badge/Shadcn-black?style=for-the-badge&logo=shadcnui&logoColor=white)
![Tanstack Query](https://img.shields.io/badge/Tanstack%20Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![better-auth](https://img.shields.io/badge/better--auth-4285F4?style=for-the-badge&logo=auth0&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

Follow these steps to set up the project locally install the required dependencies.

### Prerequisites

Make sure you have Node.js installed. You can check with:

```sh
node -v
```

### Instructions

1. **Clone the repository**
   ```sh
   git clone https://github.com/axelwesselgren/stackster-public.git
   cd stackster-public
   ```

2. **Install node packages**
   ```sh
   npm i
   ```
4. **Fill out the .env file**
   ```env
    BETTER_AUTH_SECRET=
    BETTER_AUTH_URL=
    
    AUTH_GOOGLE_ID=
    AUTH_GOOGLE_SECRET=
    
    DATABASE_URL=
    
    AUTH_GITHUB_ID=
    AUTH_GITHUB_SECRET=
    
    NEXT_PUBLIC_APP_URL=
    
    ENCRYPT_KEY=
    ENCRYPT_METHOD=
    
    RESEND_API_KEY=
   ```

3. **Start the server**
   ```sh
   npm run dev
   ```


You're now ready to run the application!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

- [ ] Complete project
- [ ] Add proper documentation
- [ ] Restructure project to adhere to modern practices

See the [open issues](https://github.com/axelwesselgren/stackster-public/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

**⚠️ This project is for educational and personal use only.**

Commercial use is NOT permitted under the terms of the license.  
See `LICENSE file for more details.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
