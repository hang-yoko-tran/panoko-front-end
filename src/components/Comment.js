import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";

export default function Comment(props) {
  const [body, setBody] = useState(props.data.body);
  const [openModal, setOpenModal] = useState(false);

  const handleOnClose = event => {
    event.preventDefault();
    setOpenModal(false);
  };

  const editComment = async id => {
    console.log("BODY", body);
    const res = await fetch(`https://localhost:5000/post/comment/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${props.token}`
      },
      body: JSON.stringify({ body: body })
    });
    if (res.ok) {
      props.handleOnLoading();
      setOpenModal(false);
    }
  };

  const deleteComment = async id => {
    console.log("BODY", body);
    const res = await fetch(
      `https://localhost:5000/post/comment/${id}/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${props.token}`
        },
        body: JSON.stringify({ id: id })
      }
    );
    const data = await res.json();
    if (data.success) {
      props.handleOnLoading();
    }
  };

  return (
    <div className=" ">
      <hr className="space-line-comment"></hr>
      <div className="header-comment-area">
        <div>
          <h6>
            <strong>{props.data.user.firstname}</strong>
          </h6>
        </div>
        {props.user.id == props.data.user_id && (
          <div>
            <button
              className="edit-btn-comment"
              onClick={() => setOpenModal(true)}
            >
              Edit
            </button>
            <button
              className="edit-btn-comment"
              onClick={() => {
                deleteComment(props.data.id);
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <span style={{ fontSize: "12px" }} className="text-muted">
        {props.data.created_at}
      </span>

      <p>{props.data.body}</p>

      <Modal show={openModal}>
        <Modal.Header onClick={handleOnClose} closeButton>
          <Modal.Title className="d-flex flex-column justify-content-center align-items-center ">
            <strong>Edit Comment</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="d-flex flex-column justify-content-center  ">
            <p className="title-input-edit-post">Description</p>
            <input
              name="body"
              className="input-edit-post form-control"
              value={body}
              onChange={e => {
                setBody(e.target.value);
              }}
            />
            <button
              type="button"
              className="btn btn-lg btn-primary btn-block signin-btn-v2"
              onClick={() => {
                editComment(props.data.id);
              }}
            >
              Edit
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
