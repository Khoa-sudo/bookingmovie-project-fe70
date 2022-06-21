import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import { SET_DANG_NHAP, SET_THONG_TIN_NGUOI_DUNG } from "./types/QuanLyNguoiDungType";
import { history } from "../../App";
export const dangNhapAction = (values) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangNhap(values);
      console.log(result);
      if (result.status === 200) {
        dispatch({
          type: SET_DANG_NHAP,
          thongTinDangNhap: result.data.content,
        });
        alert("Đăng nhập thành công");
        //Chuyển hướng login ve trang trước đó
        history.goBack();
      }
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };
};

export const layThongTinNguoiDungAction = (thongTinDangNhap) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layThongTinNguoiDung();
      console.log(result);
      if (result.status === 200) {
        dispatch({
          type: SET_THONG_TIN_NGUOI_DUNG,
          thongTinNguoiDung: result.data.content,
        });                        
      }
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };
};
