import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { SET_DANG_NHAP } from "../actions/types/QuanLyNguoiDungType";

let nguoiDung = {};
if (localStorage.getItem(USER_LOGIN)) {
  nguoiDung = JSON.parse(localStorage.getItem(USER_LOGIN));
}

let stateDefault = {
  nguoiDungDangNhap: nguoiDung,
};

export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case SET_DANG_NHAP:
      const { thongTinDangNhap } = action;
      localStorage.setItem(TOKEN, thongTinDangNhap.accessToken);
      localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
      return { ...state, nguoiDungDangNhap: thongTinDangNhap };

    default:
      return { ...state };
  }
};
