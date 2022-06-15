import React from "react";
import { Carousel } from "antd";
export default function HomeCarousel() {
  const contentStyle = {
    height: "400px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <Carousel afterChange={onChange}>
      <div>
        <div style={contentStyle}>
          <img src="https://picsum.photos/3000" className="bg-center bg-cover w-full" alt="..." />
        </div>
      </div>
      <div>
        <div style={contentStyle}>
          <img src="https://picsum.photos/3000" className="bg-center bg-cover w-full" alt="..." />
        </div>
      </div>
      <div>
        <div style={contentStyle}>
          <img src="https://picsum.photos/3000" className="bg-center bg-cover w-full" alt="..." />
        </div>
      </div>
      <div>
        <div style={contentStyle}>
          <img src="https://picsum.photos/3000" className="bg-center bg-cover w-full" alt="..." />
        </div>
      </div>
    </Carousel>
  );
}
