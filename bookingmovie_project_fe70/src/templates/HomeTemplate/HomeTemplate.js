import { Fragment } from "react";
import { Route } from "react-router-dom";
import Header from "./Layout/Header/Header";
import HomeCarousel from "./Layout/HomeCarousel/HomeCarousel";
export const HomeTemplate = (props) => { //path, exact, Component
  const { Component, ...restRoute } = props;
 console.log('restRoute',restRoute);
 console.log(props);
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
            <Header {...propsRoute}/>
            <HomeCarousel {...propsRoute}/>
            <Component {...propsRoute} />
            <footer>Đây là footer</footer>
          </Fragment>
        );
      }}
    />
  );
};
