import {
  SET_DANH_SACH_PHIM,
  SET_FILM_DANG_CHIEU,
  SET_FILM_SAP_CHIEU,
} from "../actions/types/QuanLyPhimType";
import { SET_CHI_TIET_PHIM } from "../actions/types/QuanLyRapType";

let stateDefault = {
  arrFilm: [
    {
      maPhim: 8072,
      tenPhim: "BÀN TAY DIỆT QUỶ",
      biDanh: "ban-tay-diet-quy",
      trailer: "https://youtu.be/8jraVtX821Q",
      hinhAnh:
        "https://movienew.cybersoft.edu.vn/hinhanh/ban-tay-diet-quy_gp09.png",
      moTa: "Sau khi bản thân bỗng nhiên sở hữu “Bàn tay diệt quỷ”, võ sĩ MMA Yong Hoo (Park Seo Joon thủ vai) đã dấn thân vào hành trình trừ tà, trục quỷ đối đầu với Giám Mục Bóng Tối (Woo Do Hwan) – tên quỷ Satan đột lốt người. Từ đó sự thật về cái chết của cha Yong Hoo cũng dần được hé lộ cũng như nguyên nhân anh trở thành “người được chọn”.",
      maNhom: "GP09",
      ngayKhoiChieu: "2021-04-09T00:00:00",
      danhGia: 10,
      hot: null,
      dangChieu: null,
      sapChieu: null,
    },
  ],
  dangChieu: true,
  sapChieu: true,
  arrFilmDefault: [],
  chiTietPhim:{}
};
export const QuanLyPhimReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case SET_DANH_SACH_PHIM:
      state.arrFilm = action.arrFilm;
      state.arrFilmDefault = state.arrFilm;
      return { ...state };
    case SET_FILM_DANG_CHIEU:
      state.dangChieu = !state.dangChieu;
      state.arrFilm = state.arrFilmDefault.filter(
        (film) => film.dangChieu === state.dangChieu
      );
      return { ...state };
    case SET_FILM_SAP_CHIEU:
      state.sapChieu = !state.sapChieu;
      state.arrFilm = state.arrFilmDefault.filter(
        (film) => film.sapChieu === state.sapChieu
      );
      return { ...state };
    case SET_CHI_TIET_PHIM:
      state.chiTietPhim = action.chiTietPhim;
      return { ...state };
    default:
      return { ...state };
  }
};
