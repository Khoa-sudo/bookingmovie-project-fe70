
import { GROUPID } from "../util/settings/config";
import { baseService } from "./baseService";

export class QuanLyRapService extends baseService {
  constructor(props) {
    super();
  }
  layDanhSachHeThongRap = () => {
    return this.get(
      `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`
    );
  };
  layThongTinHeThongRap = () => {
    return this.get(`/api/QuanLyRap/LayThongTinHeThongRap`);
  };
  layThongTinLichChieuPhim=(maPhim)=>{
    return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
  }
}

export const quanLyRapService = new QuanLyRapService();
