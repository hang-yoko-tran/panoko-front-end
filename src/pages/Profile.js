import React, { useState, useEffect } from "react";
import Post from "../components/Post";

export default function Profile(props) {
  const { user } = props;
  const [posts, setPosts] = useState(null);
  console.log(props.posts);

  const getPosts = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const url = `${process.env.REACT_APP_API_URL}/user/get_user`;
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", token);
        setPosts(data.posts);
      }
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {posts && posts.length > 0 ? (
        posts.map(post => {
          return <Post data={post} key={post.id} />;
        })
      ) : (
        <p>You don't have any post yet</p>
      )}
    </div>
  );
}
