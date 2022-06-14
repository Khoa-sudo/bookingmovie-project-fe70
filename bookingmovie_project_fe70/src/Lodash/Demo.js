import React from "react";
import _ from "lodash";
export default function Demo() {
  let arr = ["Khải", "Nam", "Minh"];
  let arrPerson = [
    { id: 1, name: "Khải" },
    { id: 2, name: "Hoàng" },
    { id: 3, name: "Môn" },
  ];

  //es6
  const result = arr.join("-");
  const resultLodas = _.join(arr, "*");

  //find
  const person = _.find(arrPerson, (item) => item.id === 2);
  //Lấy ra phần tử đầu tiên và cuối cùng của mảng
  const firstItem = _.first(arrPerson);
  const lastItem = _.last(arrPerson);

  const arr1 = [
    ["001", "Alice"],
    ["002", "Pop"],
    ["003", "Rock"],
  ];
  const [id, name] = _.first(arr1);
  const [id2, name2] = _.last(arr1);

  const users = [
    { name: "Fred", age: 48 },
    { name: "Kaito", age: 36 },
    { name: "Kaito", age: 23 },
    { name: "Kaito", age: 52 },
    { name: "Bake", age: 40 },
    { name: "July", age: 34 },
  ];
  const resultSortByAge = _.sortBy(users, [(item) => item.age]);

  //Sort(sắp xếp) dựa trên 2 tiêu chí, nếu sort tên trùng thì sort sang tuổi
  const resultSort = _.sortBy(users, ["name", "age"]);
  console.log("sort", resultSort);

  //includes: kiểm tra xem các giá trị ta truyền vào có nằm trong collection hay không
  //includes return True || False

  //Uniq: loại bỏ phần tử trùng của mảng
  const loaiBoPhanTuTrung = [1, 2, 2, 2, 3, 3, 4, 5, 5, 6];
  console.log("uniq", _.uniq(loaiBoPhanTuTrung));

  const objectTrung = [
    { id: "1", name: "Iphone X", price: 1000 },
    { id: "1", name: "Iphone X", price: 1000 },
    { id: "1", name: "Iphone X", price: 1000 },
    { id: "2", name: "Iphone Pro Max", price: 1500 },
    { id: "2", name: "Iphone Pro Max", price: 1500 },
    { id: "3", name: "Iphone Pro", price: 1300 },
    { id: "3", name: "Iphone Pro", price: 1300 },
    { id: "4", name: "Iphone 8", price: 800 },
    { id: "5", name: "Iphone 8 Plus", price: 900 },
    { id: "1", name: "Iphone X", price: 1000 },
  ];
  console.log("objectTrung", _.uniqBy(objectTrung, "name"));

  //flatten: giải nén mảng lồng mảng
  const mangLong = [[1,[2,[3,[4]]],5]];

  const resultFlatten = _.flatten(mangLong)
  const resultFlattenDeep = _.flattenDeep(mangLong)

  console.log('resultFlatten',resultFlatten);
  console.log('resultFlattenDeep',resultFlattenDeep);

  return (
    <div className="container">
      <div>
        <p> {result}</p>
        <br />
        <p>{resultLodas}</p>
        <br />
        <p>
          Name: {person.name} - Id: {person.id}
        </p>
        <br />
        <p>first item: {firstItem.name}</p>
        <p>last item: {lastItem.name}</p>
        <br />
        <div>
          First: {id} - {name}
        </div>
        <div>
          Last :{id2} - {name2}
        </div>
      </div>
    </div>
  );
}
