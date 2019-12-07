import React from "react";


export default function Post(props) {

  return (
    
      <div className="col-md-4 artwork-home-area">
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
                <button type="button" className="btn btn-sm btn-outline-secondary">
                  View
                </button>
                <button type="button" className="btn btn-sm btn-outline-secondary">
                  Edit
                </button>
              </div>
              <small className="text-muted">{props.data.created_at}</small>
            </div>
          </div>
        </div>
      </div>




  );
}
