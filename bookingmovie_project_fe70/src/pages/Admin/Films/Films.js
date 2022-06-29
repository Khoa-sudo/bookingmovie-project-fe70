import React, { Fragment, useEffect } from "react";
import { Button, Space, Table, Input } from "antd";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { layDanhSachPhimAction } from "../../../redux/actions/QuanLyPhimAction";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { history } from "../../../App";
const { Search } = Input;

const Films = () => {
  const onSearch = (value) => console.log(value);
  const { arrFilmDefault } = useSelector((state) => state.QuanLyPhimReducer);
  console.log(arrFilmDefault);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhSachPhimAction());
  }, []);
  //data của table
  const data = arrFilmDefault;

  //cột của table
  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      key: "1",
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["descend", "ascend"],
      width: "15%",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "2",
      width: 100,
      render: (text, film, index) => {
        return (
          <Fragment>
            <img
              src={film.hinhAnh}
              alt={film.tenPhim}
              width={50}
              height={50}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = `https://picsum.photos/id/${index}/50/50`;
              }}
            />
          </Fragment>
        );
      },
      width: "15%",
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      key: "3",
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
      width: "25%",
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      key: "4",
      render: (text, film) => {
        return (
          <Fragment>
            {film.moTa.length > 50
              ? film.moTa.substr(0, 50) + "..."
              : film.moTa}
          </Fragment>
        );
      },
      width: "25%",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "5",
      render: (text, film) => {
        return (
          <Fragment>
            <NavLink className="mr-2 text-2xl" to="/">
              <EditOutlined style={{ color: "blue" }} />
            </NavLink>
            <NavLink className="text-2xl" to="/">
              <DeleteOutlined style={{ color: "red" }} />
            </NavLink>
          </Fragment>
        );
      },
      sortDirections: ["descend", "ascend"],
      width: "25%",
    },
  ];
  return (
    <div>
      <h3 className="text-4xl">Quản Lý Phim</h3>
      <Search
        placeholder="input search text"
        enterButton="Tìm kiếm"
        size="large"
        // suffix={suffix} //dấu micro
        onSearch={onSearch}
      />

      <Space
        style={{
          marginBottom: 16,
          marginTop: 16,
        }}
      >
        <Button onClick={()=>{
          history.push('/admin/films/addnew')
        }}>Thêm phim</Button>
      </Space>

      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  );
};

export default Films;
