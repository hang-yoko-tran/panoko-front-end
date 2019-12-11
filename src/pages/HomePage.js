import React, { useState, useEffect } from "react";
import Post from "../components/Post"

export default function Home() {

  const [ posts, setPosts ] = useState([])

  const handleGetData = async () => {
      const url = `${process.env.REACT_APP_API_URL}/post/`;
      const respone = await fetch(url, {
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
        }) : <p>There no post on this page</p> }
        
    </div>
    
  );
}
