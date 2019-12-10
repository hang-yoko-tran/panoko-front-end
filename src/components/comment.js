import React from "react";
import { Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom"

export default function Comment(props) {


  return (
    
      <div className="col-md-4 artwork-home-area">
          <h4>{props.data.body}</h4>
          <span>{props.data.created_at}</span>
          <h4>{props.data.firstname}</h4>
          <p>{props.data.email}</p>
          <button>Edit</button>

          <button>Delete</button>
          <hr></hr>
      </div>




  );
}
