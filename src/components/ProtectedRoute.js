import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({ children, ...rest }) {
  console.log(children);
  
  return (
    <Route
      {...rest}
      render={({ location }) =>
        children.props.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
