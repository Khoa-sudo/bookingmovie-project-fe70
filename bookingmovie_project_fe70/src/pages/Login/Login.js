import React from "react";
import "./Login.css";
import { useFormik } from "formik";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dangNhapAction } from "../../redux/actions/QuanLyNguoiDungAction";
const Login = () => {
  const history=useHistory();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: (values) => {
      dispatch(dangNhapAction(values));
      history.push('/')
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid grid-rows-6 grid-flow-col min-h-screen items-center justify-items-start">
        <div className="row-span-4 row-start-2 text-4xl">
          Sign In
          <div className="pt-10 pr-20">
            <label htmlFor="taiKhoan" className="text-sm font-sans font-medium">
              Username
            </label>
            <input
              id="taiKhoan"
              type="text"
              name="taiKhoan"
              onChange={formik.handleChange}
              placeholder="Input username"
              className="w-full bg-black py-3 px-12 border hover: border-gray-500 rounded shadow text-base font-sans"
            />
          </div>
          <div className="pt-2 pr-20">
            <label htmlFor="matKhau" className="text-sm font-sans font-medium">
              Password
            </label>
            <input
              id="matKhau"
              type="password"
              name="matKhau"
              onChange={formik.handleChange}
              placeholder="Input password"
              className=" w-full bg-black py-3 px-12 border hover: border-gray-500 rounded shadow text-base font-sans"
            />
            <a
              href="/"
              className="text-sm font-sans font-medium text-gray-600 underline"
            >
              Forgot Password?
            </a>
          </div>
          {/* Button */}
          <div className="text-sm font-sans font-medium w-full pr-20 pt-14">
            <button
              type="submit"
              className="text-center w-full py-4 bg-blue-700 hover:bg-blue-400 rounded-md text-white"
            >
              Sign In
            </button>
          </div>
          {/* Text */}
          <NavLink
            to="/register"
            className="text-sm font-sans font-medium text-gray-400 underline"
          >
            Don't have an account? Signup
          </NavLink>
        </div>
      </div>
    </form>
  );
};

export default Login;
