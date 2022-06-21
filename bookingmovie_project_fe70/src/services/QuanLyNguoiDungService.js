import { baseService } from "./baseService";

export class QuanLyNguoiDungService extends baseService {
  constructor(props) {
    super();
  }
  dangNhap = (thongTinNguoiDung) => {
    return this.post(`/api/QuanLyNguoiDung/DangNhap`,thongTinNguoiDung);
  };
  
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();

