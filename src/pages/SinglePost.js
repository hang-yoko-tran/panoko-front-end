import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { Modal } from "react-bootstrap";
import Comment from "../components/Comment";

export default function Post(props) {
  const [PostData, setPostData] = useState(null);
  // const [CommentData, setCommentData] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [commentInput, setCommentInput] = useState({});
  const { id } = useParams();
  let history = useHistory();

  const handleOnClose = event => {
    event.preventDefault();
    setOpenModal(false);
  };

  const handleOnChange = event => {
    event.preventDefault();
    setPostData({ ...PostData, [event.target.name]: event.target.value });
  };

  const handleOnSubmit = event => {
    event.preventDefault();
    axios({
      url: `${process.env.REACT_APP_API_URL}/post/${PostData.id}/edit`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`
      },
      data: JSON.stringify(PostData)
    });
    setOpenModal(false);
  };

  const handleOnLike = async event => {
    event.preventDefault();
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/post/${PostData.id}/like`,
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
      setLikeCount(likeCount + 1);
    } else {
      setLiked(false);
      setLikeCount(likeCount - 1);
    }
  };

  const handleOnCommentChange = event => {
    event.preventDefault();
    setCommentInput({
      ...commentInput,
      [event.target.name]: event.target.value
    });
  };

  const handleOnCommentSubmit = async event => {
    event.preventDefault();
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/post/${PostData.id}/comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(commentInput)
      }
    );
    const data = await response.json();
    if (data.status === "created") {
      handleOnLoading();
    }
    handleOnLoading();
  };

  const handleOnLoading = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/post/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`
      }
    });

    const data = await response.json();
    console.log(data);
    setLikeCount(data.likeCount);
    if (data.isLiked) {
      setLiked(true);
    } else {
      setLiked(false);
    }
    console.log(PostData);
    setPostData(data);
    setLoading(false);
  };

  const deletePost = async id => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/post/${id}/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${props.token}`
      },
      body: JSON.stringify({ id: id })
    });
    const data = await res.json();
    if (data.success) {
      console.log("delete success post id:", id);
      history.push("/home");
      setPostData(props.post);
    } else {
      console.log(data.status);
    }
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
    <div className="container col-xl-6 col-md-12">
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
            <div className="edit-delete-like-btn">
              {props.user.id == PostData.author.id && (
                <span>
                  <button
                    onClick={event => {
                      event.preventDefault();
                      setOpenModal(true);
                    }}
                    type="button"
                    className="btn btn-sm btn-outline-secondary edit-btn-single-post edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary edit-btn-single-post edit-btn"
                    onClick={() => deletePost(id)}
                  >
                    Delete
                  </button>
                </span>
              )}

              <button
                type="button"
                onClick={handleOnLike}
                className="btn btn-sm btn-outline-secondary edit-btn"
              >
                <i>{likeCount > 0 && likeCount}</i>{" "}
                <i className="fas fa-heart"></i> {liked ? "Unlike" : "Like"}
              </button>
            </div>
          </div>
          <div className="author-date-single-post">
            <h6>  <i className="fas fa-user-circle" style={{color: "#E9E8E8", fontSize: "24px"}}></i><strong> By {PostData.author.firstname}</strong></h6>

            

            <small className="text-muted"><i className="fas fa-calendar-minus" style={{color: "#E9E8E8", fontSize: "20px"}}></i>     {PostData.created_at}</small>
          </div>
          <img
            // className="bd-placeholder-img card-img-top"
            width="700"
            height="500"
            src={`${PostData.image_url}`}
            className="img-single-post container"
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
          {PostData.comments.map(commentData => {
            return (
              <Comment
                data={commentData}
                key={commentData.id}
                handleOnLoading={handleOnLoading}
                user={props.user}
              />
            );
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
      <Modal show={openModal}>
        <Modal.Header onClick={handleOnClose} closeButton>
          <Modal.Title className="d-flex flex-column justify-content-center align-items-center ">
            <strong>Edit Post</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleOnSubmit}
            onChange={handleOnChange}
            className="d-flex flex-column justify-content-center  "
          >
            {/* <div> */}
            <p className="title-input-edit-post">Artwork URL</p>

            <input
              name="image_url"
              value={PostData.image_url}
              className="form-control form-control"
            ></input>
            {/* </div> */}

            <img
              src={PostData ? PostData.image_url : ""}
              className="img-edit"
              alt=""
            />

            {/* <div> */}
            <p className="title-input-edit-post">Title</p>

            <input
              name="title"
              value={PostData.title}
              className="input-edit-post form-control"
            ></input>
            {/* </div> */}

            {/* <div> */}
            <p className="title-input-edit-post">Description</p>
            <input
              name="body"
              value={PostData.body}
              className="input-edit-post form-control"
            ></input>
            {/* </div> */}

            <button
              type="submit"
              className="btn btn-lg btn-primary btn-block signin-btn-v2"
            >
              {" "}
              Press this button{" "}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
