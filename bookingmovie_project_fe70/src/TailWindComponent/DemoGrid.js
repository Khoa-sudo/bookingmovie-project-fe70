import React from "react";

export default function DemoGrid() {
  return (
    <div className="container">
      <div className="grid grid-cols-3 gap-4">
        {/* grid-cols-[number] : được tối đa 12 cols */}
        <div className="bg-red-200">1/3</div>
        <div className="bg-blue-200">1/3</div>
        <div className="bg-green-200">1/3</div>
        <div className="bg-yellow-200">1/3</div>
        <div className="bg-gray-200">1/3</div>
        <div className="bg-lime-200">1/3</div>
      </div>
    </div>
  );
}
