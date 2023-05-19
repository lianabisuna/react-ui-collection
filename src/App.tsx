// Imports
import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useSampleStore } from './stores'
import axios from 'axios'

// Types
interface Post {
  title?: string
  body?: string
}

function App() {
  const [count, setCount] = useState(0);

  // Store
  const amount = useSampleStore(state => state.amount);
  const title = useSampleStore(state => state.title);
  const updateAmount = useSampleStore(state => state.updateAmount);

  // Service
  const baseURL = "https://jsonplaceholder.typicode.com/posts";

  const [post, setPost] = useState<Post>({
    title: '',
    body: ''
  });

  useEffect(() => {
    axios
      .get(`${baseURL}/1`)
      .then((res) => {
        setPost(res.data);
      })
  }, []);

  function createPost() {
    axios
      .post(baseURL, {
        title: 'Hello',
        body: 'World',
      })
      .then((res) => {
        setPost(res.data)
      })
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <hr className='my-10' />
      <div>
        <h3 className="text-3xl font-bold underline text-red-500 mb-3">
          Store
        </h3>
        <div>
          <p>Amount: {amount} </p>
          <p>Title: {title} </p>
          <button
            onClick={ () => updateAmount(10) }
            className='mt-3'
          >
            Update Amount
          </button>
        </div>

        <h3 className="text-3xl font-bold underline text-red-500 mb-3">
          Service
        </h3>
        <div>
          <p>Title: {post.title}</p>
          <p>Body: {post.body}</p>
          <button
            onClick={ createPost }
            className='mt-3'
          >
            Create Post
          </button>
        </div>
      </div>
    </>
  )
}

export default App
