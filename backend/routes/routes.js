import express from 'express';
import dotenv from 'dotenv';

import { GoogleGenerativeAI } from "@google/generative-ai";
import db from '../db/connection.js';  // Helps connect to the db, no need for explicit call to run connection.js codes (will run upon import)..., don't use named import ({})?
import { ObjectId } from 'mongodb';  // Helps convert the id from string to ObjectId for the _id

const router = express.Router();  // Instance of express router, used to define our routes, will be added as middleware (takes control of requests starting w/ /record)
dotenv.config();

// Make sure to include these imports:
// import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.API_KEY);  // Authentication
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API });

// const prompt = "Write a story about a magic backpack.";  // Use route here (Express?)
// const result = await model.generateContent(prompt);
// console.log(result.response.text());

// API Endpoints, Routes
// Generate content route
// const prompt_first = 'Write a detailed story based on the following prompt:';
// var conversations = [];  // Max history=3
// conversations.push(prompt_first);
router.post('/generate', async(req, res) => {
    const { prompt } = req.body;

    // if (conversations.length > 3) {
    //     conversations.shift();  // Remove oldest conversation
    // }
    // var prompt_context = '';
    // for (const conversation of conversations) {
    //     prompt_context += conversation + ' ';
    // }

    try {
        // Get latest 3 prompts from db
        const storiesCollection = await db.collection('stories');
        const stories = await storiesCollection.find().sort({ _id: -1 }).limit(3).toArray();
        const stories_db_sorted = stories.reverse();
        var conversations = stories_db_sorted.map(doc => doc.prompt);  // Remaps to another array w/ the given function/formula

        // Process conversations
        var prompt_context = conversations.join(' ') + ' ';  // Joins elements
        var prompt_prompt = `Write/continue a/the detailed story from this prompt/context (if any): ${prompt_context}. The latest prompt is: ${prompt}`;

        const model = await genAI.getGenerativeModel({ model: "gemini-2.5-pro" });  // Ensure to fetch model every time...
        const result = await model.generateContent(prompt_prompt);
        const text = result.response.text();
        const text_processed = text.replace(/^\s*\*\s+/gm, '')  // Removes bullet points (*)
            .replace(/^\s*\d+\.\s+/gm, '')  // Removes numbered list (e.g. 1.)
            .replace(/\n{2,}/g, '\n\n');  // Multiple newlines to single newlines
            // .replace(/\*/g, '')  // Removes *
        
        // conversations.push(text_processed);
        await storiesCollection.insertOne({ story: text_processed, promptId: prompt });
        const promptsCollection = await db.collection('prompts');
        await promptsCollection.insertOne({ prompt: prompt });
        res.send(text_processed);

        // const img = await generateImage(prompt_prompt);
        // res.json({
        //     story: text_processed, 
        //     image: img
        // });
    } catch (error) {
        console.log(error);
        res.status(500).send('Failed to generate content');  // Server error, console.error- for errors, console.log- general-purpose...
    }
})

// Get prompts route
router.get('/prompts', async (req, res) => {
    try {
        const promptsCollection = await db.collection('prompts');
        const prompts = await promptsCollection.find().toArray();
        res.json(prompts);
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching prompts', err });
    }
})

export default router;  // Export entire router so it can be used by Express
// Patch- update certain fields (can be not entire record...), Put, Delete