import { Select } from "antd";
import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { history } from "../../../../App";
//Hook đa ngôn ngữ
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import _ from "lodash";
import { TOKEN, USER_LOGIN } from "../../../../util/settings/config";
export default function Header(props) {
  const { nguoiDungDangNhap } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const handleChange = (value) => {
    i18n.changeLanguage(value);
  };
  const { Option } = Select;
  const { t, i18n } = useTranslation();
  const renderLogin = () => {
    if (_.isEmpty(nguoiDungDangNhap)) {
      return (
        <Fragment>
          <button
            onClick={() => {
              history.push("/login");
            }}
            className="self-center px-8 py-3 rounded"
          >
            {t("Signin")}
          </button>
          <button
            onClick={() => {
              history.push("/register");
            }}
            className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900"
          >
            {t("Signup")}
          </button>
        </Fragment>
      );
    }
    return (
      <Fragment>
      <button
            onClick={() => {
              history.push("/profile");
            }}
            className="self-center px-8 py-3 rounded"
          >
            {`Xin chào, ${nguoiDungDangNhap.taiKhoan}`}
          </button>
        <button
          className="text-yellow-500 mr-5"
          onClick={() => {
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(TOKEN);
            history.push("/");
            window.location.reload();
          }}
        >
          Đăng xuất
        </button>
      </Fragment>
    );
  };
  return (
    <header className="p-4 dark:bg-gray-800 dark:text-gray-100 bg-opacity-40 bg-black text-white fixed w-full z-10">
      <div className="container flex justify-between h-16 mx-auto">
        <NavLink
          rel="noopener noreferrer"
          to="/"
          aria-label="Back to homepage"
          className="flex items-center p-2"
        >
          <img
            src="https://cybersoft.edu.vn/wp-content/uploads/2017/03/MIN-OP1.png"
            style={{ maxHeight: "55px" }}
            alt="logo cybersoft"
          />
        </NavLink>
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <NavLink
              rel="noopener noreferrer"
              to="/home"
              className=" border-white text-white flex items-center px-4 -mb-1 dark:border-transparent dark:text-violet-400 dark:border-violet-400"
              activeClassName="border-b-2 border-white"
            >
              {t("Home")}
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              rel="noopener noreferrer"
              to="/contact"
              className=" border-white text-white flex items-center px-4 -mb-1  dark:border-transparent"
              activeClassName="border-b-2 border-white"
            >
              {t("Contact")}
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              rel="noopener noreferrer"
              to="/news"
              className=" border-white text-white flex items-center px-4 -mb-1  dark:border-transparent"
              activeClassName="border-b-2 border-white"
            >
              {t("News")}
            </NavLink>
          </li>
        </ul>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          {renderLogin()}
        </div>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          <Select
            defaultValue="en"
            style={{
              width: 120,
            }}
            onChange={handleChange}
          >
            <Option value="en">English</Option>
            <Option value="vi">Vietnamese</Option>
            <Option value="chi">Chinese</Option>
          </Select>
        </div>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          <h2 className="text-white self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">
            {t("Hello")}
          </h2>
        </div>
        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-gray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
}
