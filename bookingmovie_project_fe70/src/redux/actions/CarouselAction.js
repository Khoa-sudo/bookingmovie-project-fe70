import axios from "axios";
import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { DOMAIN } from "../../util/settings/config";
import { GET_IMG_CAROUSEL } from "./types/CarouselType";

export const getCarouselAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layDanhSachBanner();

      //Đưa lên reducer      
      //success thì đưa lên reducer
      dispatch({
        type: GET_IMG_CAROUSEL,
        arrImg: result.data.content,        
      });
    } catch (error) {
      console.log("error", error.response.data);
    }
  };
};
