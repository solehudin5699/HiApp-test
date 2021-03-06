import React from "react";
import {useSelector} from "react-redux"
import { Redirect, Route } from "react-router-dom";
export default function PrivateRoute(props:any) {
  const { isLogin } = useSelector((state:any) => state.auth);
  const { component: Component, authAPI, ...rest } = props;
  // console.log(props);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLogin) {
          return <Component {...props} />
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          );
        }
      }}
    />
  );
}
