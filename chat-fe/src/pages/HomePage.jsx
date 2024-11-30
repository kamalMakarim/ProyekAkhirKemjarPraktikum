import React, { useState, useEffect } from "react";
import apiClient from "../utils/axios";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState();

  const handlePostChange = (e) => {
    setNewPost(e.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apiClient.get("/post");
        if (response.data.data) {
          console.log("response:", response);
          setPosts(response.data.data);
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.log("error:", error);
        setPosts([]);
      }
    };

    fetchPosts();
  }, []);

  const handlePostSubmit = () => {
    apiClient
      .post("/post/create", {
        content: newPost,
        writter: JSON.parse(localStorage.getItem("user"))._id,
      })
      .then((response) => {
        console.log("response:", response);
        setPosts([...posts, response.data.data]);
        setNewPost("");
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <a href="/EditUser" className="text-blue-500 hover:underline mb-4 block text-right">Edit User</a>
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Home Page</h1>
        <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-6">
          <textarea
            value={newPost}
            onChange={handlePostChange}
            placeholder="Write your post here..."
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handlePostSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Post
          </button>
        </div>
        <div className="mt-6">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">Posts</h2>
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md mb-4"
              >
                <p className="text-gray-800">{post.content}</p>
                <p className="text-gray-500 mt-2 text-sm">By: {post.writter.username}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No posts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
