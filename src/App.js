import React, { useState, useEffect } from 'react';

const App = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [posts, setPosts] = useState([]);

  // GET with fetch API
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts?_limit=10'
      );
      const data = await response.json();
      setPosts(data);
    };
    fetchPost();
  }, []);

  // Delete with fetchAPI
  const deletePost = async (id) => {
    let response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: 'DELETE',
      }
    );
    if (response.status === 200) {
      setPosts(
        posts.filter((post) => {
          return post.id !== id;
        })
      );
    } else {
      return;
    }
  };

  // Post with fetchAPI
  const addPosts = async (title, body) => {
    let response = await fetch(
      'https://jsonplaceholder.typicode.com/posts',
      {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          body: body,
          userId: Math.random().toString(36).slice(2),
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    );
    let data = await response.json();
    setPosts((posts) => [data, ...posts]);
    setTitle('');
    setBody('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPosts(title, body);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Posts</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex flex-col mb-4">
          <label htmlFor="title" className="mb-2 font-medium">
            Title:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="py-2 px-3 rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="body" className="mb-2 font-medium">
            Body:
          </label>
          <textarea
            name="body"
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="py-2 px-3 rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Add Post
        </button>
      </form>
      <hr className="my-4" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((post) => {
          return (
            <div className="bg-white rounded-md shadow-md px-4 py-2" key={post.id}>
              <h2 className="text-lg font-medium mb-2">{post.title}</h2>
              <p className="text-gray-600">{post.body}</p>
              <button
                className="bg-red-600 text-white py-2 px-4 rounded-md mt-2 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                onClick={() => deletePost(post.id)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;