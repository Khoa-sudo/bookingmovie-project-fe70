
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import { SET_DANG_NHAP } from "./types/QuanLyNguoiDungType";

export const dangNhapAction = (values) => {
  
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangNhap(values);      
      dispatch({
        type:SET_DANG_NHAP,
        thongTinDangNhap:result.data.content
      })
      alert('Đăng nhập thành công')
      
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };
};
