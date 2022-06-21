import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import loadingGif from "../../assets/images/cartoon_loading.gif";

export default function Loading(props) {
  const { isLoading } = useSelector((state) => state.LoadingReducer);  
  return (
    <Fragment>
      {isLoading ? (
        <div
          className="container-fluid"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 99,
          }}
        >
          <img src={loadingGif} alt="loading gif" />
          {/* <div className="text-4xl text-white">Loading...</div> */}
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
}
