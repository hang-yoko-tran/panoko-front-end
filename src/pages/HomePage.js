import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Post from "../components/Post"

export default function Home() {

  const [ posts, setPosts ] = useState([])

  const handleGetData = async () => {
      const respone = await fetch("https://localhost:5000/post/", {
        method:"GET",
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
      const data = await respone.json()
      if(data){
        setPosts([...posts, ...data])
      }
  }
  
  useEffect(() => {
      handleGetData()
},[])
  console.log(posts)

  return (
    <div className="d-flex flex-wrap">  
        {posts ? posts.map((post) => {
            return (
                <Post data={post} />
            )
        }) : <p>There no post on this fucking page</p> }
        
    </div>
    
  );
}
