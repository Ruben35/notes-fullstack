# Frontend for Notes 🖼️
The frontend section of this project was developed with [Next.js](https://nextjs.org/) using Typescript.

## Installation 💻
It requires to have [Node.js](https://nodejs.org/es) installed with at least version v16.18.0.
Also it requires [npm](https://www.npmjs.com/) with at least version 8.19.2.

First, install all the dependencies with:
```bash
npm install
# or
yarn
# or
pnpm install
```
## Execution ⚙️
For run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

In your browser at [http://localhost:3000](http://localhost:3000) you will be able to see the welcome with the login form.

![Welcome Page](https://user-images.githubusercontent.com/30848819/236518946-ff46ceba-93e4-4fd0-bb05-d08abf648c63.png)

## Structure of Project 🧩
The structure of this project is the basic one provided by Next.js but here are shown the more importants:
```
frontend
├── public
|   └── icons
└── src
    ├── components
    ├── config
    ├── data
    ├── pages
    ├── services
    ├── styles
    └── utils
```
Where the ones that need explication are:

- `/components` is where all the common components are located.
- `/config` where are some configurations and global variables (some of them coming from .env).
- `/data` where UserContext lives created with his provider and custom hookto get in all app the user data.
- `/pages` where all the locations of the web app lives.
- `/services` where all the Note and User services lives (the ones that makes requests to the API with the help of Axios).
- `/styles` where all the global and CSS modules are located.
- `/utils` where some classes and function of utilery are located like the Axios clients.

## Guide on Web 🌐
1. For starters the journey on the web begins on the **Login** page:
![Welcome Page](https://user-images.githubusercontent.com/30848819/236518946-ff46ceba-93e4-4fd0-bb05-d08abf648c63.png)
2. Then you can go to the **SignUp** page and create a new user:
![Captura de pantalla 2023-05-05 110340](https://user-images.githubusercontent.com/30848819/236522325-213d2fc4-c758-4476-ad0d-575d8fd54631.png)
![Captura de pantalla 2023-05-05 110350](https://user-images.githubusercontent.com/30848819/236522320-537a1032-19e4-4161-955e-651958c8e7ac.png)
3. Then you can try **Login** with your new user but be carefull with filling the field with the wrong credentials:
![Captura de pantalla 2023-05-05 110406](https://user-images.githubusercontent.com/30848819/236522317-79105c4b-d2fb-4d7d-8a55-2f25854c2ef4.png)
4. Once logged, you can see that you don't have notes:
![Captura de pantalla 2023-05-05 110422](https://user-images.githubusercontent.com/30848819/236522314-4c0165d5-0312-4370-88ca-acfa8fff02ae.png)
5. You can add new notes with interesting topics:
![Captura de pantalla 2023-05-05 110504](https://user-images.githubusercontent.com/30848819/236522311-596f7403-e8ec-4bf9-857f-7ad2a959a335.png)
![Captura de pantalla 2023-05-05 110516](https://user-images.githubusercontent.com/30848819/236522308-233ad920-7c6a-46be-9dbc-6ef4c800a7b9.png)
6. You can make the number of notes you want:
![Captura de pantalla 2023-05-05 110741](https://user-images.githubusercontent.com/30848819/236522305-2a360198-761d-4cb3-9328-844342bf2802.png)
7. Also you can edit them:
![Captura de pantalla 2023-05-05 110813](https://user-images.githubusercontent.com/30848819/236522303-79b2587e-ccb0-431b-92a5-bc212fb42e83.png)
8. And finally, delete them:
![Captura de pantalla 2023-05-05 110834](https://user-images.githubusercontent.com/30848819/236522299-4076ffd5-931e-481c-af85-af8e0d1f0a25.png)

## Final Points 📝
- All the endpoints done on the **backend** API where used here and also with the auth option (using JWT).
- The design was done first as wireframe and then on a Hi-Fidelity version, all with the principle of mobile-first.
- It could be visualized in mobile, tablet and desktop without any problems.
- Work for the future could be improve some animations, optimization on the frontend and also give the user the possibility to share notes and also delete his account.