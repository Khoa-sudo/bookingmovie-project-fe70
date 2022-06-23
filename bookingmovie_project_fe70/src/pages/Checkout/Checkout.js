import { MehOutlined, SmileOutlined } from "@ant-design/icons";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  datGheAction,
  datVeAction,
  layChiTietPhongVeAction,
} from "../../redux/actions/QuanLyDatVeAction";
import { CHUYEN_TAB, DAT_VE } from "../../redux/actions/types/QuanLyDatVeType";
import "./Checkout.css";
import _ from "lodash";
import style from "./Checkout.module.css";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { Pagination, Tabs } from "antd";
import { layThongTinNguoiDungAction } from "../../redux/actions/QuanLyNguoiDungAction";
import moment from "moment";
import { connection } from "../../index";

function Checkout(props) {
  const { nguoiDungDangNhap } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } =
    useSelector((state) => state.QuanLyDatVeReducer);

  const { thongTinPhim, danhSachGhe } = chiTietPhongVe;
  const dispatch = useDispatch();

  useEffect(() => {
    //Gọi hàm tạo ra 1 async function
    const id = props.match.params.id;

    const action = layChiTietPhongVeAction(id);

    dispatch(action);

    //có 1 client thực hiện đặt vé thành công mình sẽ load lại ds phòng vé của lịch chiếu đó
    connection.on("datVeThanhCong", () => {
      dispatch(action);
    });
    //Vừa vào trang load tất cả ghế của các người khác đang đặt
    connection.invoke("loadDanhSachGhe", props.match.params.id);

    //Load danh sách ghế đang đặt từ server về
    //Lắng nghe tín hiệu từ server trả về
    connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
      //Bước 1: Loại mình ra khỏi danh sách
      dsGheKhachDat = dsGheKhachDat.filter(
        (item) => item.taiKhoan !== nguoiDungDangNhap.taiKhoan
      );

      //Bước 2: gộp danh sách ghế khách đặt ở tất cả user thành 1 mảng chung
      let arrGheKhachDat = dsGheKhachDat.reduce((result, item, index) => {
        let arrGhe = JSON.parse(item.danhSachGhe);

        return [...result, ...arrGhe];
      }, []);
      //Đưa dữ liệu ghế khách đặt cập nhật redux
      arrGheKhachDat = _.uniqBy(arrGheKhachDat, "maGhe");

      //
      dispatch({
        type: "DAT_GHE",
        arrGheKhachDat,
      });
      //Cài đặt sự kiện khi reload trang
      window.addEventListener("beforeunload", clearGhe);

      return () => {
        clearGhe();
        window.removeEventListener("beforeunload", clearGhe);
      };
    });
  }, []);
  const clearGhe = function (event) {
    connection.invoke(
      "huyDat",
      nguoiDungDangNhap.taiKhoan,
      props.match.params.id
    );
  };
  const renderSeats = () => {
    return danhSachGhe?.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let classGheDaDat = ghe.daDat === true ? "gheDaDat" : "";
      let classGheDangDat = "";
      //Kiểm tra từng ghế render xem có trong mảng ghế đang đặt hay không
      let indexGheDD = danhSachGheDangDat.findIndex(
        (gheDD) => gheDD.maGhe === ghe.maGhe
      );
      let classGheKhachDat = "";
      let indexGheKD = danhSachGheKhachDat.findIndex(
        (gheKD) => gheKD.maGhe === ghe.maGhe
      );
      if (indexGheKD !== -1) {
        classGheKhachDat = "gheKhachDat";
      }
      if (indexGheDD !== -1) {
        classGheDaDat = "gheDangDat";
      }

      //Chèn css ghế do người dùng đặt
      let classGheNguoiDungDat = "";
      if (nguoiDungDangNhap.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheNguoiDungDat = "gheNguoiDungDat";
      }

      return (
        <Fragment key={index}>
          <button
            onClick={() => {
              const action = datGheAction(ghe, props.match.params.id);
              dispatch(action);
            }}
            disabled={ghe.daDat | (classGheKhachDat !== "")}
            className={`ghe ${classGheKhachDat} ${classGheNguoiDungDat} ${classGheDangDat} ${classGheVip} ${classGheDaDat} text-center`}
          >
            {ghe.daDat ? (
              classGheNguoiDungDat !== "" ? (
                <SmileOutlined
                  style={{ marginBottom: 7.5, fontWeight: "bold" }}
                />
              ) : (
                <MehOutlined
                  style={{ marginBottom: 7.5, fontWeight: "bold" }}
                />
              )
            ) : classGheKhachDat !== "" ? (
              <SmileOutlined
                style={{ marginBottom: 7.5, fontWeight: "bold" }}
              />
            ) : (
              ghe.stt
            )}
          </button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };
  return (
    <div className="min-h-screen mt-5">
      <div className="grid grid-cols-12">
        <div className="col-span-9">
          <div className="flex flex-col items-center mt-5">
            <div
              className="bg-black "
              style={{ width: "80%", height: 15 }}
            ></div>
            <div className={`${style["trapezoid"]} text-center`}>
              <h3 className="mt-3 text-black">Màn hình</h3>
            </div>
            <div>{renderSeats()}</div>
          </div>
          <div className="mt-5 flex justify-center">
            <table className="divide-y divide-gray-200 w-2/3">
              <thead className="bg-gray-50 p-5">
                <tr>
                  <th>Ghế chưa đặt</th>
                  <th>Ghế đang đặt</th>
                  <th>Ghế VIP</th>
                  <th>Ghế đã được đặt</th>
                  <th>Ghế người dùng đặt</th>
                  <th>Ghế khách đang đặt</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  {/* Ghế chưa đặt */}
                  <td>
                    <button className="ghe text-center">
                      <SmileOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />
                    </button>
                  </td>
                  {/* Đang đặt */}
                  <td>
                    <button className="ghe gheDangDat text-center">
                      <SmileOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />
                    </button>
                  </td>
                  {/* VIP */}
                  <td>
                    <button className="ghe gheVip text-center">
                      <SmileOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />
                    </button>
                  </td>
                  {/* Đã đặt */}
                  <td>
                    <button className="ghe gheDaDat text-center">
                      <MehOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />
                    </button>
                  </td>
                  {/* Tài khoản người dùng đặt */}
                  <td>
                    <button className="ghe gheNguoiDungDat text-center">
                      <SmileOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />
                    </button>
                  </td>
                  {/* Tài khoản người dùng khách đang đặt thông qua RealTime */}
                  <td>
                    <button className="ghe gheKhachDat text-center">
                      <MehOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-span-3">
          <h3 className="text-blue-700 text-center text-4xl">
            {danhSachGheDangDat
              .reduce((tongTien, ghe, index) => {
                return (tongTien += ghe.giaVe);
              }, 0)
              .toLocaleString()}{" "}
            VND
          </h3>
          <hr />
          <h3 className="text-xl mt-2">{thongTinPhim.tenPhim}</h3>
          <p>
            Địa điểm: {thongTinPhim.tenCumRap} - {thongTinPhim.tenRap}
          </p>
          <p>
            Ngày chiếu: {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}
          </p>
          <hr />
          <div className="grid grid-cols-8 my-5">
            <div className="col-span-5">
              <span className="text-lg">Ghế</span>
              {_.sortBy(danhSachGheDangDat, ["stt"]).map((gheDD, index) => {
                return (
                  <span key={index} className="text-red-500 text-lg">
                    {" "}
                    {gheDD.stt}
                  </span>
                );
              })}
            </div>
            <div className="text-right col-span-3">
              <span className="text-green-800 text-lg">
                {danhSachGheDangDat
                  .reduce((tongTien, ghe, index) => {
                    return (tongTien += ghe.giaVe);
                  }, 0)
                  .toLocaleString()}{" "}
                VND
              </span>
            </div>
          </div>
          <hr />
          <div className="my-5">
            <i>Email</i>
            <br />
            {nguoiDungDangNhap.email}
          </div>
          <hr />
          <div className="my-5">
            <i>Phone</i>
            <br />
            {nguoiDungDangNhap.soDT}
          </div>
          <hr />
          <div
            className="mb-0 h-full flex flex-col items-center"
            style={{ marginBottom: 0 }}
          >
            <div
              onClick={() => {
                const thongTinDatVe = new ThongTinDatVe();
                thongTinDatVe.maLichChieu = props.match.params.id;
                thongTinDatVe.danhSachVe = danhSachGheDangDat;

                dispatch(datVeAction(thongTinDatVe));
              }}
              className="bg-green-500 text-white w-full text-center py-3 font-bold text-2xl cursor-pointer"
            >
              ĐẶT VÉ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//Component mới thay thế cho component Checkout
const { TabPane } = Tabs;

//onChange cho Tabs Antd
// const onChange = (key) => {
//   console.log(key);
// };

export default function (props) {
  const { tabActive } = useSelector((state) => state.QuanLyDatVeReducer);

  const dispatch = useDispatch();
  return (
    <div className="p-5">
      <Tabs
        defaultActiveKey="1"
        activeKey={tabActive}
        onChange={(key) => {
          dispatch({
            type: "CHUYEN_TAB_ACTIVE",
            number: key.toString(),
          });
        }}
        centered
      >
        <TabPane tab="01 CHỌN GHẾ & THANH TOÁN" key="1">
          <Checkout {...props} />
        </TabPane>
        <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
          <KetQuaDatVe {...props} />
        </TabPane>
      </Tabs>
    </div>
  );
}

function KetQuaDatVe(props) {
  const dispatch = useDispatch();
  const { thongTinNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const { nguoiDungDangNhap } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  useEffect(() => {
    const action = layThongTinNguoiDungAction();
    dispatch(action);
  }, []);
  const renderTicketItem = function () {
    return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
      return (
        <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
          <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
            <img
              alt="team"
              className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
              src="https://picsum.photos/200/200"
            />
            <div className="flex-grow">
              <h2 className="text-gray-900 title-font font-medium">
                {ticket.tenPhim}
              </h2>

              <p className="text-gray-500">
                Giờ chiếu: {moment(ticket.ngayDat).format("hh:mm A")} - Ngày
                chiếu: {moment(ticket.ngayDat).format("DD/MM/YYYY")}
              </p>
              <p>
                Địa điểm: {_.first(ticket.danhSachGhe).tenHeThongRap} -{" "}
                {_.first(ticket.danhSachGhe).tenCumRap}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="p-5">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Lịch sử đặt vé khách hàng
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Hiển thị thông tin, địa điểm, giờ chiếu...
            </p>
          </div>
          <div className="flex flex-wrap -m-2">{renderTicketItem()}</div>
        </div>
      </section>
    </div>
  );
}
