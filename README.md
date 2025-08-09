# Story Generator AI Web App

*This web app is powered by gemini-2.5-pro AI and it allows us to generate a unique story given a topical prompt. The web app saves the history to MongoDB Atlas, that can be used as reference in the future, and it features context persistence.

*Check it out here- https://jede-story-generator.vercel.app/

*Sometimes, gemini-2.5-pro is too busy and congested, so we can change the model to gemini-2.5-flash instead at ./backend/routes/routes.js (line 47)

*MongoDB automatically pauses after some time of inactivity so first request may take a few seconds. You can also inform developer to manually resume operation
(daniellecastor071@gmail.com)

*To Dos- 
1. Integrate w/ Signup/Login app to implement Authentication and Authorization for personalized use
2. Implement better multi-turn chat prompt standards via Roles
3. Input Moderation and Validation via Guardrails
4. Media Query- currently only designed for desktop