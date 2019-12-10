import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom"
import notify from "../utils/Notification";



export default function Upload() {

    const [ inputData, setInputData ] = useState({})
    const history = useHistory()

    const handleOnChange = (e) => {
        e.preventDefault()
        setInputData({...inputData, [e.target.name]:e.target.value})
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("https://localhost:5000/post/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(inputData)
        })
        const data = await response.json()
        if(data['status'] === "OK"){
            // alert("adadasdaskdjada SUCCESS")
            notify("Info", "Post successfully", "success")
            history.push("/home")
        }else{
            // alert("Nooooooooooooooooooooooooo It failllllllllllllllllllllllllllllllllllllllllllllllllllllll")
            notify("Error", "Post fail", "danger");

        }
    }

    return (
        <div className="container">

            <section className="container right-signup-area">

          <div>
          <form
          onChange={handleOnChange}
          onSubmit={handleOnSubmit}
          className="form-signin ">
            <h3
              style={{
                fontWeight: "600",
                color: "#333333",
                marginTop: "30px",
                marginBottom: "20px"
              }}
            >
              Upload Your Artwork
            </h3>
            <p style={{ fontWeight: "600" }}>Image</p>
            <input
              style={{ marginBottom: "20px" }}
              type="text"
              name="img_url"
              id="inputEmail"
              className="form-control"
              placeholder="Put Your Image URL"
              required=""


            />
            <p style={{ fontWeight: "600" }}>Title</p>
            <input
              style={{ marginBottom: "20px" }}
              type="text"
              name="title"
              id="inputEmail"
              className="form-control"
              placeholder="Put Your Title"
              required=""


            />
            <p style={{ fontWeight: "600" }}>Description</p>
            <textarea
              style={{ marginBottom: "20px" }}
              type="text"
              name="description"
              id="descc"
              className="form-control"
              placeholder="Put Your Description"
              required=""
              rows="6"


            />
            {/* <p style={{ fontWeight: "600" }}>Password</p>
            <input
              style={{ marginBottom: "20px" }}
              type="password"
              id="inputPassword"
              className="form-control"
              placeholder="Password"
              required=""


            /> */}

            <button
              className="btn btn-lg btn-primary btn-block signin-btn-v2"
              type="submit"
            >
              Post Now
            </button>
            {/* <p className="mt-5 mb-3 text-muted">© 2017-2019</p> */}
            {/* </form> */}
          </form>
          </div>
        </section>
        </div>
    )
}