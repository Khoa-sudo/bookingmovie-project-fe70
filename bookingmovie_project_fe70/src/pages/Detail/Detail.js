import React, { useEffect, useState } from "react";

import { Button, CustomCard } from "@tsamantanis/react-glassmorphism";
import "@tsamantanis/react-glassmorphism/dist/index.css";
import "../../assets/styles/circle.css";
import second, { useDispatch, useSelector } from "react-redux";
import { Tabs } from "antd";
import { layThongTinChiTietPhim } from "../../redux/actions/QuanLyRapAction";
import moment from "moment";
export default function Detail(props) {
  const dispatch = useDispatch();
  const [tabPosition, setTabPosition] = useState("left");
  const { TabPane } = Tabs;
  const chiTietPhim = useSelector(
    (state) => state.QuanLyPhimReducer.chiTietPhim
  );
  console.log({ chiTietPhim });
  useEffect(() => {
    let { id } = props.match.params;
    dispatch(layThongTinChiTietPhim(id));
  }, []);
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
                  Ngày chiếu:{" "}
                  {moment(chiTietPhim.ngayKhoiChieu).format("DD.MM.YYYY")}
                </p>
                <h1 className="text-4xl">{chiTietPhim.tenPhim}</h1>
                <p>{chiTietPhim.moTa}</p>
              </div>
            </div>
          </div>
          <div className="col-span-4">
          <h1 className="ml-20 text-lg">Đánh giá</h1>
            <div className={`c100 p${chiTietPhim.danhGia * 10} big`}>
              <span className="text-white">{chiTietPhim.danhGia * 10}%</span>
              <div className="slice">
                <div className="bar" />
                <div className="fill" />
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto">
          <Tabs tabPosition={tabPosition}>
            <TabPane tab="Tab 1" key="1">
              Content of Tab 1
            </TabPane>
            <TabPane tab="Tab 2" key="2">
              Content of Tab 2
            </TabPane>
            <TabPane tab="Tab 3" key="3">
              Content of Tab 3
            </TabPane>
          </Tabs>
        </div>
      </CustomCard>
    </div>
  );
}
