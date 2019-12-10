import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom"

export default function Post(props) {

  const [ liked, setLiked ] = useState(props.data.isLiked)
  const history = useHistory()

  const handleOnClick = (event, id) => {
    event.preventDefault()
    history.push(`/post/${id}`)
  }

  const handleOnLike = async (event) => {
    event.preventDefault()
    const response = await fetch(`https://localhost:5000/post/${props.data.id}/like`, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`    
      }
    })
    const data = await response.json()
    if(data.status === "OK"){
      setLiked(true)
    }else{
      setLiked(false)
    }
  }


  return (
    
      <div className="col-md-6 artwork-home-area col-xl-4	">
        <div className="card mb-4 shadow-sm">
          {/* <svg
            className="bd-placeholder-img card-img-top"
            width="100%"
            height="225"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
            aria-label="Placeholder: Thumbnail"
          > */}
            {/* <title>Placeholder</title> */}
            <img
                className="bd-placeholder-img card-img-top"
                width="400"
                height="300"
                src={`${props.data.image_url}`}>

            </img>

          {/* </svg> */}
          <div className="  card-body">
          <p className="card-text">
              {props.data.title} - {props.data.author.firstname}
          </p>
            <p className="card-text">
              {props.data.body}
            </p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                <button 
                onClick={(event) => handleOnClick(event, props.data.id)}
                type="button" className="btn btn-sm btn-outline-secondary edit-btn">
                  View
                </button>
                <button type="button"
                onClick={handleOnLike}
                className="btn btn-sm btn-outline-secondary edit-btn"  >
                <i className="fas fa-heart"></i> {liked ? "Like" : "Unlike"}
                </button>
              </div>
              <small className="text-muted">{props.data.created_at}</small>
            </div>
          </div>
        </div>
      </div>




  );
}
