// To dos- proper format for multi-turn chat/conversation (prompt engineering)

// Notes
// See Quickstart documentation- https://ai.google.dev/gemini-api/docs/quickstart?lang=node
// For Node
// Node.js v20.11.1
// npm init -y (creates package.json, add "type": "module", [ES {ecmascript} Modules]), npm install mongodb express cors dotenv; Practice- install on parent directory?
// npm install @google/generative-ai
// node app.js
// Nodemon- instead use node --watch app.js
// Postman- instead use Thunder Client extension

// https://vercel.com/guides/how-to-allowlist-deployment-ip-address- Vercel Secure but it's paid

// Use ES Modules
// require('dotenv').config();
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

// import axios from 'axios';  // for making API requests to external services
// import OpenAI from 'openai';
import router from './routes/routes.js';  // Exported router object @ routes.js, routes is a local variable name (free to choose...)

dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();  // Express instance

// Middleware
app.use(express.json())  // Middleware to pass incoming json as express
const corsOptions = {
    // origin: [process.env.VITE_REACT_APP_BACKEND_BASEURL, process.env.VITE_REACT_APP_BACKEND_BASEURL_1]
    origin: ['https://jede-story-generator.vercel.app', 
        process.env.VITE_REACT_APP_BACKEND_BASEURL, 
        process.env.VITE_REACT_APP_BACKEND_BASEURL_1
    ], 
    // origin: ['http://localhost:5174', 'http://localhost:5173', 'http://localhost:8080'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], 
    credentials: true
}
app.use(cors(corsOptions));

// app.use('/record', records);  // /record- initial path, so /:id is /record/id
app.use(router);

// Imagen
// async function generateImage(prompt) {
//     try {
//         const response = await openai.images.generate({
//             model: 'dall-e-3', 
//             prompt: prompt, 
//             n: 1, 
//             size: '1024x1024'
//         });
//         return response.data[0].url;
//     }
//     catch (err) {
//         // console.log(err);
//         // res.status(500).send('Failed to generate content');
//         console.error('Error generating image: ', err);
//         throw new Error('Failed to generate image');
//     }
// }

// Start server
app.listen(PORT, () => {
    console.log(`Server is running and is listening at port ${PORT}`);
})

// Notes
// Care http/s
// Can also add auth, #reqs...
// For React
// Used vite to create react app
// npm create vite@latest, cd vite-project?- can use frontend folder instead of vite-project, npm install, npm run dev

// React Query (TanStack)- to manage server state or make HTTP req to backend, makes life easier for loading, error, success, caching?, and pagination
// npm i @tanstack/react-query
// Connect to app, wrap react query w/ our app

// npm install axios
// npm install openai

// npm install mongoose
// npm install mongodb
// mongodb+srv://daniellecastor071:<db_password>@cluster0.dsaxn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// Avoid spaces on file/folder names...
// Vite- modern way to create React apps
// npm create vite@latest client -- --template react, can now run cd client / npm install / npm run dev
// Other dependencies- npm install -D (for dev dependencies) tailwindcss postcss autoprefixer, -D- for dev dependencies
// npx tailwindcss init -p, add <sources...> to content: [] @ tailwind.config.js, remove boilerplate @ index.js and add @tailwind...
// Tailwind- utility first CSS framework that allows us to add CSS styles by utilizing predefined classnames..., https://tailwindcss.com/docs/installation
// npm run start
// npm install -D react-router-dom, as dev, adds client-side page routing to react, https://reactrouter.com/en/main/start/tutorial
// ReactDOM- rendering, if multiple pages?...

// Github
// Start
// .gitignore- .env, backend/.env, backend/.env.local, backend/.env.*.local (or remove .env?)
// git init, git remote add origin <repository_url>, git add ., git commit -m '<msg, e.g. initial commit>', git branch -M main, git push -u origin main

// Update- git status, git branch and git checkout <branch-name>, git add ., git commit -m '<msg>', git push origin main

// Restart- git reset --hard, git rm -r --cached, delete .git folder

// References- https://youtu.be/4nKWREmCvsE, 