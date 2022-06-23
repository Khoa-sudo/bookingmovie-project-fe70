import { Fragment, useEffect } from "react";
import { Route } from "react-router-dom";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";
export const HomeTemplate = (props) => {
  //path, exact, Component
  const { Component, ...restRoute } = props;
  useEffect(() => {
    //tự động load lên đầu trang khi vào lại trang
    window.scrollTo(0, 0);
  });
  return (
    <Route
      {...restRoute}
      render={(propsRoute) => {
        //props.location
        //props.history
        //props.match
        return (
          <Fragment>
            {/* Fragment là 1 thẻ trong suốt (giống div) nhưng không đẩy dòng xuống */}
            <Header {...propsRoute} />
            <Component {...propsRoute} />
            {/* Trang Footer tĩnh nên không cần truyền props */}
            <Footer />
          </Fragment>
        );
      }}
    />
  );
};
