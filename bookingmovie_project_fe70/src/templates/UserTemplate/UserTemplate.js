import { Fragment, useEffect } from "react";
import { Route } from "react-router-dom";
import "../../pages/Login/Login.css";
export const UserTemplate = (props) => {
  const { Component, ...restRoute } = props;
  useEffect(() => {
    //tự động load lên đầu trang khi vào lại trang
    window.scrollTo(0, 0);
  });
  return (
    <Route
      {...restRoute}
      render={(propsRoute) => {
        return (
          <Fragment>
            <div className="grid grid-cols-12">
              <div className="col-span-4 text-white font-sans font-bold bg-black min-h-screen pl-7">
                <Component {...propsRoute} />
              </div>
              {/* Second column image */}
              <div className="banner col-span-8 text-white font-sans font-bold">
                {/* Aquí iría algún comentario */}
              </div>
            </div>
          </Fragment>
        );
      }}
    />
  );
};
