import { GET_IMG_CAROUSEL } from "../actions/types/CarouselType";

let stateDefault = {
  arrImg: [],
};

export const CarouselReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_IMG_CAROUSEL:
        state.arrImg=action.arrImg
        return {...state}
    default:
      return { ...state };
  }
};
