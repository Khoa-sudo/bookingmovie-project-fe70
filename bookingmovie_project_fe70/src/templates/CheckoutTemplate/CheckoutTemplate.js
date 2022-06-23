import { Fragment, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { USER_LOGIN } from "../../util/settings/config";

const CheckoutTemplate = (props) => {
  const { Component, ...restRoute } = props;
  useEffect(() => {
    //tự động load lên đầu trang khi vào lại trang
    window.scrollTo(0, 0);
  });
  if (!localStorage.getItem(USER_LOGIN)) {
    return <Redirect to="/login" />;
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
