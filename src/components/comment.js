import React from "react";
import { Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function Comment(props) {
  return (
    <div className=" ">
      <hr className="space-line-comment"></hr>
      <div className="header-comment-area">
        <div>
          <h6>
            <strong>{props.data.user.firstname}</strong>
          </h6>
        </div>

        <div>
          <button className="edit-btn-comment">Edit</button>
          <button className="edit-btn-comment">Delete</button>
        </div>
      </div>
      <span style={{ fontSize: "12px" }} className="text-muted">
        {props.data.created_at}
      </span>

      <p>{props.data.body}</p>

      {/* <p>{props.data.email}</p> */}
    </div>

    // {PostData.author.firstname}
  );
}
