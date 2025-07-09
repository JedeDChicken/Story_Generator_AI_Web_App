import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Install HTTP client- Axios or Fetch?, npm i axios
import axios from 'axios'  // HTTP client for making requests from browser (or Node.js), for us- to make a POST request to backend API
import { useMutation } from '@tanstack/react-query'  // Hook, to handle side-effect operations (e.g. API requests), easy way to manage state (e.g. loading, success, error) for async tasks (e.g. sending data to server)

// Use Mutation (from React Query)- Hook used to make HTTP req (either POST, PUT, or DELETE)
// Function to make req, must return a Promise (useMutation), async functions return Promise
const makeRequestAPI = async (prompt) => {  // Must accept the prompt, care
  const res = await axios.post('https://jede-story-generator-backend.vercel.app/generate', { prompt });  // Sends POST request to backend (8080...) w/ { prompt } as body...
  // const res = await axios.post("http://localhost:8080/generate", { prompt }); 
  return res.data;  // res- response object, data...
}

// Fetch history from db
const fetchHistoryAPI = async () => {
  const res = await axios.get('https://jede-story-generator-backend.vercel.app/prompts');
  // const res = await axios.get('http://localhost:8080/prompts');
  return res.data;
}

function App() {
  // From handling, making req to backend, use react query to make the req
  // const [count, setCount] = useState(0)
  const [prompt, setPrompt] = useState('');  // Internal State via Use State Hook, for the Form Management as That?, Local state to store input prompt
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);  // Local state to store history of prompts
  const [activeHistory, setActiveHistory] = useState(null);  // Tracks selected history, for CSS...

  // Fetch history
  const fetchHistory = async () => {
    try {
      const historyData = await fetchHistoryAPI();  //
      setHistory(historyData);  // Update state w/ fetched history
    }
    catch (err) {
      console.error('Error fetching history', err);
    }
  }
  // Mutations- for writing/modifying operations (e.g. POST, PUT, DELETE) (or triggering server-side actions... backend...) vs Fetch?- for GET...

  // Fetch history on mount
  useEffect(() => {  // Another React Hook (like useState) that lets us run Side Effects in function components (Side Effects- any operation outside the component's rendering logic)
    fetchHistory();
  }, []);  // Empty dependency array to run only once on mount, Cleanup- undo any setup to avoid memory leaks..., Dependencies- control when the effect re-runs (for optimization)...

  // Logic for Mutation
  const mutation = useMutation({
    mutationFn: makeRequestAPI,  // Function to be executed
    mutationKey: ['gemini-ai-request'],  // Value of mutationKey will be used by React Query BTS for optimization and other logics, key must be descriptive, unique key for this mutation (useful for caching and optimization in React Query)
    onSuccess: () => {
      fetchHistory();  // Fetch updated history after mutation succeeds
      setError('');
    }, 
    onError: () => {
      setError('Please enter a prompt.')
    }
  });

  // Submit handler
  const submitHandler = (e) => {
    e.preventDefault();  // Prevent the default form submission behavior (that reloads the page)

    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }

    mutation.mutate(prompt);  // Mutate- pass in what we wanna send (prompt, the one from the State) to the API, triggers the mutation
    setActiveHistory({ prompt });
  }

  // console.log(mutation);  // Mutate holds all the values/properties about our Response (Success, Loading, or Error)

  const historyClick = (item) => {  // Set clicked history to input
    setPrompt(item.prompt);
    setActiveHistory(item);
  }

  return (
    // Form, fragment/div?
    <div className='App'>
      <div className="history__container">
        <div className='history__text'><h2>History</h2></div>
        <div className="history__contents">
          {(() => {
            if (history.length > 0) {
              return [...history].reverse().map((item, index) => (  // Spread history into a new array then reverse...
                <div key={index}  // Index- unique key for React's reconcilliation process...
                  className={`history__item ${activeHistory?.prompt === item.prompt ? 'active' : ''}`}  // Dynamic Class, ?.- handles null/undefined...
                  onClick={() => historyClick(item)}>
                  <p>{item.prompt}</p>
                  {/* <div className='history__divider'></div> */}
                </div>
              ));
            }
            else {
              return <p>No history yet</p>;
            }
          })()}  {/* This structure is IIFE (Immediately Invoked Function Expression?..., for conditional rendering...), advantage- logic is w/in a block, multi-step rendering logic... */}
        </div>
      </div>

      <div className='App__container'>
        <header>AI Story Generator</header>
        <h2>Enter a prompt and let Gemini AI write a unique story for you.</h2>

        <form className='App__form' onSubmit={ submitHandler } action="">
          <label htmlFor='Enter your prompt: '></label>

          <div className='App__form--input'>
            <input type='text' 
            value={prompt} 
            onChange={(e) => {
              setPrompt(e.target.value);
              if (e.target.value.trim()) setError('');  // Clear error when there's real input
            }}  // Error function, we have access to the event...
            placeholder='Write a story about...' 
            className='App__input'
            />

            <button className='App__button' type='submit'>Generate</button>
          </div>

          <div id='Error'>
            {error && <p className='App_error'>{error}</p>}
          </div>

          <section className='App__response'>           
            { mutation.isPending && <p>Generating your content...</p> }
            { mutation.isError && <p>{mutation.error.message}</p> }
            { mutation.isSuccess && <p>{mutation.data}</p> }
          </section>
        </form>
      </div>
    </div>
  )

  // return (
  //   <>
  //     <div>
  //       <a href="https://vite.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.jsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>

  //   </>
  // )
}

export default App
// Make sure both backend and frontend are running (2 terminals?)
// Error at first- we're accessing our backend app using unknown frontend app, tell backend abt frontend (allow it to access endpoint/resources) (CORS)
// Vercel- https://youtu.be/DDt7Qdk0Ejw