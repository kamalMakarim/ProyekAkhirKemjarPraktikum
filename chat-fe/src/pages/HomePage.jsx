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
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Home Page</h1>
      <div className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-md">
        <textarea
          value={newPost}
          onChange={handlePostChange}
          placeholder="Write your post here..."
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          onClick={handlePostSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Post
        </button>
      </div>
      <div className="max-w-md mx-auto mt-6">
        <h2 className="text-2xl font-semibold mb-4">Posts</h2>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <>
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md mb-4"
              >
                {post.content}
                <p className="text-gray-500">By: {post.writter}</p>
              </div>
              
            </>
          ))
        ) : (
          <p className="text-gray-500">No posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
