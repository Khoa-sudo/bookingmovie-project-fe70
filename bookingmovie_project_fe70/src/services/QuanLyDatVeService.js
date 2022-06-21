import { ThongTinDatVe } from "../_core/models/ThongTinDatVe";
import { baseService } from "./baseService";

export class QuanLyDatVeService extends baseService {
  constructor(props) {
    super();
  }
  layChiTietPhongVe = (maLichChieu) => {
    // mã lịch chiếu lấy từ URl
    return this.get(
      `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
    );
  };
  datVe = (thongTinDatVe = new ThongTinDatVe()) => {
    return this.post(`/api/QuanLyDatVe/DatVe`,thongTinDatVe);
  };
}

export const quanLyDatVeService = new QuanLyDatVeService();
