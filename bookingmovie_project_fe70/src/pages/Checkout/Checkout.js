import {
  AndroidOutlined,
  CheckOutlined,
  CloseOutlined,
  FrownOutlined,
  MehOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  datVeAction,
  layChiTietPhongVeAction,
} from "../../redux/actions/QuanLyDatVeAction";
import { DAT_VE } from "../../redux/actions/types/QuanLyDatVeType";
import "./Checkout.css";
import _ from "lodash";
import style from "./Checkout.module.css";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { USER_LOGIN } from "../../util/settings/config";
export default function Checkout(props) {
  const { nguoiDungDangNhap } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const { chiTietPhongVe, danhSachGheDangDat } = useSelector(
    (state) => state.QuanLyDatVeReducer
  );

  const { thongTinPhim, danhSachGhe } = chiTietPhongVe;
  const dispatch = useDispatch();

  useEffect(() => {
    const id = props.match.params.id;
    const action = layChiTietPhongVeAction(id);
    dispatch(action);
  }, []);
  const renderSeats = () => {
    return danhSachGhe?.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let classGheDaDat = ghe.daDat === true ? "gheDaDat" : "";
      let classGheDangDat = "";
      //Kiểm tra từng ghế render xem có trong mảng ghế đang đặt hay không
      let indexGheDD = danhSachGheDangDat.findIndex(
        (gheDD) => gheDD.maGhe === ghe.maGhe
      );
      if (indexGheDD != -1) {
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
              dispatch({
                type: DAT_VE,
                gheDuocChon: ghe,
              });
            }}
            disabled={ghe.daDat}
            className={`ghe ${classGheNguoiDungDat} ${classGheDangDat} ${classGheVip} ${classGheDaDat} text-center`}
          >
            {ghe.daDat ? (
              classGheNguoiDungDat != "" ? (
                <SmileOutlined
                  style={{ marginBottom: 7.5, fontWeight: "bold" }}
                />
              ) : (
                <MehOutlined
                  style={{ marginBottom: 7.5, fontWeight: "bold" }}
                />
              )
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
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  {/* Ghế chưa đặt */}
                  <td>
                    <button className="ghe text-center"></button>
                  </td>
                  {/* Đang đặt */}
                  <td>
                    <button className="ghe gheDangDat text-center"></button>
                  </td>
                  {/* VIP */}
                  <td>
                    <button className="ghe gheVip text-center"></button>
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
                console.log("thongTinDatVe", thongTinDatVe);
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
