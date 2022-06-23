import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import { Tabs } from "antd";
import moment from "moment";

export default function HomeMenu(props) {
  const { heThongRapChieu } = props;
  const [tabPosition, setTabPosition] = useState("left");
  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };
  const renderHeThongRap = () => {
    return heThongRapChieu.map((heThongRap, index) => {
      return (
        <TabPane
          tab={
            <img
              src={heThongRap.logo}
              alt="Hệ thống rạp"
              className="rounded-full"
              width="50"
            />
          }
          key={index}
        >
          <Tabs tabPosition={tabPosition}>
            {heThongRap.lstCumRap?.map((cumRap, index) => {
              return (
                <TabPane
                  key={index}
                  tab={
                    <div style={{ width: "300px", display: "flex" }}>
                      <img
                        src="https://quangcaongoaitroi.com/wp-content/uploads/2020/02/quang-cao-tai-rap-chieu-phim-5.jpg"
                        width="50"
                        alt="Quầy bán vé"
                      />
                      <div className="text-left ml-2">
                        {cumRap.tenCumRap}
                        <p className="text-gray-500">Chi tiết</p>
                      </div>
                    </div>
                  }
                >
                  {/* Load phim tương ứng */}
                  {cumRap.danhSachPhim.slice(0, 4).map((phim, index) => {
                    return (
                      <Fragment key={index}>
                        <div className="my-4">
                          <div style={{ display: "flex" }}>
                            <img
                              style={{ width: 100, height: 100 }}
                              src={phim.hinhAnh}
                              alt={phim.tenPhim}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://picsum.photos/100/100";
                              }}
                            />
                            <div className="ml-3">
                              <h2 className="text-lg text-green-500">
                                {phim.tenPhim}
                              </h2>
                              <p>{cumRap.diaChi}</p>
                              <div className="grid grid-cols-6 gap-6">
                                {phim.lstLichChieuTheoPhim
                                  .slice(0, 12)
                                  .map((lichChieu, index) => {
                                    return (
                                      <NavLink
                                        className="text-xl text-orange-400"
                                        to={`/checkout/${lichChieu.maLichChieu}`}
                                        key={index}
                                      >
                                        {moment(
                                          lichChieu.ngayChieuGioChieu
                                        ).format("hh:mm A")}
                                      </NavLink>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </Fragment>
                    );
                  })}
                </TabPane>
              );
            })}
          </Tabs>
        </TabPane>
      );
    });
  };
  const { TabPane } = Tabs;
  return <Tabs tabPosition={tabPosition}>{renderHeThongRap()}</Tabs>;
}
