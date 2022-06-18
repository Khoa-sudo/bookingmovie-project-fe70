import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import {
  SET_FILM_DANG_CHIEU,
  SET_FILM_SAP_CHIEU,
} from "../../redux/actions/types/QuanLyPhimType";
import Film_Flip from "../Films/Film_Flip";
import styleSlick from "./MultipleRowslick.module.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;

  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    ></div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block", left: "-50px" }}
      onClick={onClick}
    ></div>
  );
}
export default function MultipleRows(props) {
  const dispatch = useDispatch();
  const { dangChieu, sapChieu } = useSelector(
    (state) => state.QuanLyPhimReducer
  );
  let activeClassDangChieu =
    dangChieu === true ? "active_Film" : "none_active_Film";
  let activeClassSapChieu =
    sapChieu === true ? "active_Film" : "none_active_Film";
 
  const renderFilms = () => {
    return props.arrFilm.slice(0, 12).map((item, index) => {
      return (
        <div key={index}>
          {/* <Films phim={item} /> */}
          <Film_Flip item={item} />
        </div>
      );
    });
  };

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 2,
    speed: 500,
    rows: 2,
    slidesPerRow: 2,
    // variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div>
      <button
        onClick={() => {
          const action = {
            type: SET_FILM_DANG_CHIEU,
          };
          dispatch(action);
        }}
        type="button"
        className={`${styleSlick[activeClassDangChieu]} px-8 py-3 font-semibold rounded bg-gray-800 text-white mr-3`}
      >
        PHIM ĐANG CHIẾU
      </button>
      <button
        onClick={() => {
          const action = {
            type: SET_FILM_SAP_CHIEU,
          };
          dispatch(action);
        }}
        type="button"
        className={`${styleSlick[activeClassSapChieu]} px-8 py-3 font-semibold rounded bg-white text-gray-800`}
      >
        PHIM SẮP CHIẾU
      </button>

      <Slider {...settings}>{renderFilms()}</Slider>
    </div>
  );
}
