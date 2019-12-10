import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import {axios} from "axios";
import Comment from "../components/Comment"

export default function Post() {
  const [PostData, setPostData] = useState(null);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [commentInput, setCommentInput] = useState({})
  const { id } = useParams();

  const handleOnLike = async event => {
    event.preventDefault();
    const response = await fetch(
      `https://localhost:5000/post/${PostData.id}/like`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`
        }
      }
    );
    const data = await response.json();
    console.log(data.status);
    if (data.status === "OK") {
      setLiked(true);
    } else {
      setLiked(false);
    }
  };

 const handleOnCommentChange = (event) => {
   event.preventDefault()
   setCommentInput({...commentInput, [event.target.name]: event.target.value})
 }

 const handleOnCommentSubmit = async (event) => {
    event.preventDefault()
    const response = await fetch(`https://localhost:5000/post/${PostData.id}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(commentInput)
    })
    const data = await response.json()
    if(data.status === "created"){
      handleOnLoading()
    }
    handleOnLoading()

 }

  const handleOnLoading = async () => {
    const response = await fetch(`https://localhost:5000/post/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`
      }
    });

    const data = await response.json();
    console.log(data)
    if (data.isLiked) {
      setLiked(true);
    } else {
      setLiked(false);
    }
    console.log(PostData);
    setPostData(data);
    setLoading(false)
  };

  useEffect(() => {
    handleOnLoading();
  }, []);

  if (!PostData) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container col-6">
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <div className="artwork-home-area">
          {/* <div className="card mb-4 shadow-sm"> */}
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
          {/* <h5 className="title-single-post">{PostData.title}</h5> */}

          <div className="title-btn-single-post">
            <div>
              <h5 className="title-single-post">{PostData.title}</h5>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary edit-btn-single-post"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={handleOnLike}
                className="btn btn-sm btn-outline-secondary"
              >
                <i className="fas fa-heart"></i> {liked ? "Like" : "Unlike"}
              </button>
            </div>
          </div>
          <div className="author-date-single-post">
            <h5>By {PostData.author.firstname}</h5>

            <small className="text-muted">{PostData.created_at}</small>
          </div>
          <img
            // className="bd-placeholder-img card-img-top"
            width="700"
            height="500"
            src={`${PostData.image_url}`}
          ></img>

          {/* </svg> */}
          <div className="  card-body">
            {/* <p className="card-text">{PostData.title}</p> */}
            <p className="card-text">{PostData.body}</p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                {/* <button type="button" className="btn btn-sm btn-outline-secondary">
              <Nav.Link href="/single-post">View</Nav.Link> */}
                {/* View */}
                {/* </button> */}
              </div>
            </div>
          </div>

          <hr></hr>
          


          <form
          onChange={handleOnCommentChange}
          onSubmit={handleOnCommentSubmit}
          >
            <h6 style={{ marginTop: "35px", marginBottom: "20px" }}>
              <strong>Add a new comment</strong>
            </h6>
            <textarea
              name="body"
              className="form-control form-post-area"
              id="exampleFormControlTextarea1"
              placeholder="Write a comment..."
              rows="3"
            ></textarea>
            <Button
              type="submit"
              variant="primary"
              className="upload-btn signin-btn-v2 post-btn"
            >
              Post Comment
            </Button>
          </form>
          {PostData.comments.map((commentData) => {
            return <Comment data={commentData} />
          })}
          {/* <div className="d-flex flex-wrap">
          {comment ? (
            comment.map(post => {
              return <Comment data={comment} />;
            })
          ) : (
            <p>There is not comment</p>
          )}
        </div> */}
        </div>
      )}
    </div>
  );
}
