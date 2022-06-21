import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { SET_CHI_TIET_PHONG_VE } from "./types/QuanLyDatVeType";

export const layChiTietPhongVeAction = (maLichChieu) => {
  return async (dispatch) => {
    try {
      const result = await quanLyDatVeService.layChiTietPhongVe(maLichChieu);

      if (result.status === 200) {
        dispatch({
          type: SET_CHI_TIET_PHONG_VE,
          chiTietPhongVe: result.data.content,
        });
      }
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };
};

export const datVeAction=(thongTinDatVe)=>{
  return async dispatch=>{
    try {
      const result = await quanLyDatVeService.datVe(thongTinDatVe);      
      window.location.reload();
    } catch (error) {
      alert(error.response?.data)
    }
  }
}
