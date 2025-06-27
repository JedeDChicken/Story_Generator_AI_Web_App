  # Story Generator Web App powered by gemini-1.5-pro
  
  *This web app is powered by gemini-1.5-pro AI and it allows us to generate a unique story given a topical prompt. The web app saves the history to MongoDB Atlas, that can be used as reference in the future, and it features context persistence.

  *Check it out here- https://jede-story-generator.vercel.app/

  *Sometimes, the gemini-1.5-pro model is too busy, can change model to gemini-1.5-flash in ./backend/routes/routes.js accordingly

  *To Dos- 
  1. Integrate w/ Signup/Login app for personalized usage
  3. Proper format for multi-turn chat/conversation (prompt engineering)
  4. Input moderation via guardrails
  5. Media Query- currently only designed for desktop
