import React from "react";

export default function Card() {
  return (
    <div className="card w-full">
      <div className="card-body py-8 bg-gray-300 rounded-tl-lg rounded-tr-lg px-7">
        <h3 className="text-purple-800 font-bold text-sm">Category</h3>
        <p className="text-black text-1xl">Cybersot frontend developer</p>
        <p className="text-black text-1xl font-thin my-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt cumque
          harum qui explicabo? Ullam expedita, sunt voluptas ad doloremque
          asperiores temporibus magni, voluptatum sint porro repellendus?
          Excepturi quae harum dicta!
        </p>
      </div>
      <div className="items-center w-full card-footer bg-gray-100 rounded-br-lg rounded-bl-lg flex justify-between px-7">
        <p className="mt-2">1 USD</p>
        <button className="rounded-lg bg-purple-500 text-white transition duration-500 hover:bg-yellow-200 hover:text-black my-2 p-2">Register</button>
      </div>
    </div>
  );
}
