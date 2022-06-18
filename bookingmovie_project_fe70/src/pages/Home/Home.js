import React, { useEffect } from "react";
import HomeMenu from "./HomeMenu/HomeMenu";

import { useDispatch, useSelector } from "react-redux";

import MultipleRows from "../../components/ReactSlick/MultipleRowslick";
import { layDanhSachPhimAction } from "../../redux/actions/QuanLyPhimAction";
import { layDanhSachHeThongRapAction } from "../../redux/actions/QuanLyRapAction";
import HomeCarousel from "../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel";
export default function Home() {
  const { arrFilm } = useSelector((state) => state.QuanLyPhimReducer);
  const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);
  const dispatch = useDispatch();
  // const renderArrPhim = () => {
  //   return arrFilm.map((item, index) => {
  //     return <Films key={index}/>;
  //   });
  // };
  useEffect(() => {    
    dispatch(layDanhSachPhimAction());
    dispatch(layDanhSachHeThongRapAction());
  }, []);
  return (
    <div>
      <HomeCarousel />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          {/* <div className="flex flex-wrap -m-4">{renderArrPhim()}</div> */}
          <MultipleRows arrFilm={arrFilm} />
        </div>
      </section>
      <div className="mx-36">
        <HomeMenu heThongRapChieu={heThongRapChieu} />
      </div>
    </div>
  );
}
