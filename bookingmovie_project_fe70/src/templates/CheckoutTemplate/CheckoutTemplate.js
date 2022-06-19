import { Fragment } from "react";
import { Redirect, Route } from "react-router-dom";
import { USER_LOGIN } from "../../util/settings/config";

const CheckoutTemplate = (props) => {
  const { Component, restRoute } = props;
  if (!localStorage.getItem(USER_LOGIN)) {
    return <Redirect to="/register" />;
  } else {
  }
  return (
    <Route
      {...restRoute}
      render={(propsRoute) => {
        return (
          <Fragment>
            <Component {...propsRoute} />
          </Fragment>
        );
      }}
    ></Route>
  );
};

export default CheckoutTemplate;
