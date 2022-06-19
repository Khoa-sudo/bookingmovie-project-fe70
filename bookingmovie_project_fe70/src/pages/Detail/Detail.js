import React, { useEffect, useState } from "react";

import { CustomCard } from "@tsamantanis/react-glassmorphism";
import "@tsamantanis/react-glassmorphism/dist/index.css";
import "../../assets/styles/circle.css";
import { useDispatch, useSelector } from "react-redux";
import { Tabs } from "antd";
import { layThongTinChiTietPhim } from "../../redux/actions/QuanLyRapAction";
import moment from "moment";
import { Rate } from "antd";
import { NavLink } from "react-router-dom";
export default function Detail(props) {
  const dispatch = useDispatch();
  const [tabPosition, setTabPosition] = useState("left");
  const { TabPane } = Tabs;
  const chiTietPhim = useSelector(
    (state) => state.QuanLyPhimReducer.chiTietPhim
  );
  useEffect(() => {
    let { id } = props.match.params;
    dispatch(layThongTinChiTietPhim(id));
  }, [dispatch]);
  console.log(chiTietPhim.heThongRapChieu);
  return (
    <div
      style={{
        backgroundImage: `url(${chiTietPhim.hinhAnh})`,
        backgroundSize: "100%",
        backgroundPosition: "cover",
        minHeight: "100vh",
      }}
    >
      <CustomCard
        style={{ paddingTop: 150, minHeight: "100vh" }}
        effectColor="rgbs(255,255,255,0.4)" // required
        color="rgbs(255,255,255,0.4)" // default color is white
        blur={10} // default blur value is 10px
        borderRadius={0} // default border radius value is 10px
      >
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-5 col-start-3">
            <div className="grid grid-cols-4">
              <img
                className="col-span-1"
                src={chiTietPhim.hinhAnh}
                style={{ width: "100%" }}
                alt="123"
              />
              <div className="col-span-3 ml-5">
                <p className="text-sm">
                  {moment(chiTietPhim.ngayKhoiChieu).format("DD.MM.YYYY")}
                </p>
                <h1 className="text-4xl">{chiTietPhim.tenPhim}</h1>
                <p>{chiTietPhim.moTa}</p>
              </div>
            </div>
          </div>
          <div className="col-span-4">
            <h1 className="ml-20 text-lg">Đánh giá</h1>
            <h1 className="ml-12 text-yellow-300 text-2xl">
              <Rate allowHalf defaultValue={chiTietPhim.danhGia / 2} />
            </h1>
            <div className={`c100 p${chiTietPhim.danhGia * 10} big`}>
              <span className="text-white">{chiTietPhim.danhGia * 10}%</span>
              <div className="slice">
                <div className="bar" />
                <div className="fill" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 ml-72 w-2/3 container mx-auto bg-white px-5 py-5">
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Lịch chiếu" key="1">
              <div>
                <Tabs tabPosition={tabPosition}>
                  {chiTietPhim.heThongRapChieu?.map((htr, index) => {
                    return (
                      <TabPane
                        tab={
                          <div>
                            <img
                              src={htr.logo}
                              className=""
                              style={{ width: 48, height: 48 }}
                              alt="logo rạp"
                            />
                            {htr.tenHeThongRap}
                          </div>
                        }
                        key={index}
                      >
                        {htr.cumRapChieu?.map((cumRap, index) => {
                          return (
                            <div key={index}>
                              <div className="flex flex-row">
                                <img
                                  style={{ width: 120 }}
                                  src="https://quangcaongoaitroi.com/wp-content/uploads/2020/02/quang-cao-tai-rap-chieu-phim-5.jpg"
                                  alt="Cụm rạp"
                                />
                                <div className="ml-3">
                                  <p
                                    style={{
                                      fontSize: "20px",
                                      fontWeight: "bold",
                                    }}
                                    className="mb-0"
                                  >
                                    {cumRap.tenCumRap}
                                  </p>
                                  <p className="text-gray-500">
                                    {cumRap.tenCumRap}
                                  </p>
                                </div>
                              </div>
                              <div className="thong-tin-lich-chieu grid grid-cols-4">
                                {cumRap.lichChieuPhim?.map(
                                  (lichChieu, index) => {
                                    return (
                                      <NavLink
                                        key={index}
                                        className="mt-3 col-span-1 text-green-800"
                                      >
                                        {moment(
                                          lichChieu.ngayChieuGioChieu
                                        ).format("hh:mm A")}
                                      </NavLink>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </TabPane>
                    );
                  })}
                </Tabs>
              </div>
            </TabPane>
            <TabPane tab="Thông tin" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Đánh giá" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </div>
      </CustomCard>
    </div>
  );
}
