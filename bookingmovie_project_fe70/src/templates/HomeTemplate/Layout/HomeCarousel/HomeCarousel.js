import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useDispatch, useSelector } from "react-redux";
import './HomeCarousel.css'
import { getCarouselAction } from "../../../../redux/actions/CarouselAction";
const contentStyle = {
  height: "600px",
  color: "#fff",
  lineHeight: "160px",
  textAlign:'center',
  backgroundPosition: "center",
  backgroundSize: "100%",
  backgroundRepeat: "no-repeat",
};
export default function HomeCarousel(props) {
  const { arrImg } = useSelector((state) => state.CarouselReducer);
  // console.log("arrImg", arrImg);

  const dispatch = useDispatch();
  //Tự kích hoạt API => dùng hook useEffect
  useEffect(() => {

    //1 action = {type:'',data}
    //2 (phải cài middleware): callBackFunction(dispatch)
    
    const action = getCarouselAction();
    dispatch(action);
  }, []); //chứa 1 state chạy 1 lần (rỗng)

  //Đem vô trong
  
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  const renderImg = () => {
    return arrImg.map((item, index) => {
      return (
        <div key={index}>
          <div
            style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}
          >
            <img
              src={item.hinhAnh}
              alt={item.hinhAnh}
              className="w-full opacity-0"
            />
          </div>
        </div>
      );
    });
  };
  return <Carousel afterChange={onChange}>{renderImg()}</Carousel>;
}
