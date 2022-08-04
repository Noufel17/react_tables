import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useTable } from "react-table";
import { useMemo } from "react";
import "./style.css";
function Products(props) {
  // const data = useMemo(
  //   () => [
  //     {
  //       id: 1,
  //       title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  //       price: 109.95,
  //       description:
  //         "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  //       category: "men's clothing",
  //       image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  //       rating: {
  //         rate: 3.9,
  //         count: 120,
  //       },
  //     },
  //     {
  //       id: 1,
  //       title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  //       price: 109.95,
  //       description:
  //         "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  //       category: "men's clothing",
  //       image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  //       rating: {
  //         rate: 3.9,
  //         count: 120,
  //       },
  //     },
  //   ],
  //   []
  // );
  // const columns = useMemo(
  //   () => [
  //     {
  //       header: "Id",
  //       accessor: "id",
  //       //there is always a cell property that contains a function that get called
  //       //when rendering that you can override
  //     },
  //     {
  //       header: "Title",
  //       accessor: "title",
  //     },
  //     {
  //       header: "Price",
  //       accessor: "price",
  //     },
  //   ],
  //   []
  // );

  const [products, setProducts] = useState([]);
  const fetchProductsData = async () => {
    const response = await axios
      .get("https://fakestoreapi.com/products")
      .catch((error) => console.log(error));
    if (response) {
      const products = response.data;
      setProducts(products);
    }
  };
  // now real dynamic data

  const productsData = useMemo(() => [...products], [products]);
  const productsColumns = useMemo(
    () =>
      products[0]
        ? Object.keys(products[0])
            .filter((key) => key !== "rating")
            .map((key) => {
              return { header: key, accessor: key };
            })
        : [],
    [products]
  );
  const table = useTable({ columns: productsColumns, data: productsData });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    table;

  useEffect(() => {
    fetchProductsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="table_wrapper">
      <table {...getTableProps()}>
        <thead className="head">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th key={index} {...column.getHeaderProps()}>
                  {column.render("header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <tr key={index} {...row.getRowProps()}>
                {row.cells.map((cell, index) => (
                  <td key={index} {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
