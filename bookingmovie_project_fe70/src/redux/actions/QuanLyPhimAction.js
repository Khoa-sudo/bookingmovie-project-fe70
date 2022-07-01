import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { SET_DANH_SACH_PHIM, SET_FILM_THONG_TIN } from "./types/QuanLyPhimType";
import history from "../../App";
export const layDanhSachPhimAction = (tenPhim='') => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layDanhSachPhim(tenPhim);

      //Sau khi lấy dữ liệu từ API về => redux (reducer)
      dispatch({
        type: SET_DANH_SACH_PHIM,
        arrFilm: result.data.content,
      });
    } catch (error) {
      console.log("error: ", error.response.data);
    }
  };
};

export const themPhimUploadHinhAction = (formData) => {
  return async (dispatch) => {
    try {
      let result = await quanLyPhimService.themPhimUploadHinh(formData);
      alert("Thêm phim thành công!");
      dispatch(layDanhSachPhimAction())
      history.push('/admin/films')
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const layThongTinPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      let result = await quanLyPhimService.layThongTinPhim(maPhim);

      if (result.status === 200) {
        dispatch({
          type: SET_FILM_THONG_TIN,
          thongTinPhim: result.data.content,
        });
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const capNhatPhimUploadAction = (formData) => {
  return async (dispatch) => {
    try {
      let res = await quanLyPhimService.capNhatPhimUpload(formData);

      console.log(res.data.content);
      alert("Cập nhật phim thành công!");

      dispatch(layDanhSachPhimAction());
      history.push("/admin/films");
    } catch (error) {
      console.log(error.response.data);
    }
  };
};
export const xoaPhimAction   = (maPhim) => {
  return async (dispatch) => {
    try {
      let res = await quanLyPhimService.xoaPhim(maPhim);

      console.log(res);
      alert("Xoá phim thành công!");

      dispatch(layDanhSachPhimAction());
      history.push("/admin/films");
    } catch (error) {
      console.log(error.response?.data);
    }
  };
};


