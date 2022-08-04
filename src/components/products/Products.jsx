import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useTable, useSortBy } from "react-table";
import { useMemo } from "react";
import "./style.css";
import Journal from "./svgs/Journal";
import ArrowDown from "./svgs/ArrowDown";
import ArrowUp from "./svgs/ArrowUp";
function Products(props) {
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

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "journal",
        header: "journal",
        Cell: ({ row }) => (
          <button
            className="journal_btn"
            onClick={() => {
              alert("editing product with id :", row.values.id);
            }}
          >
            <div>
              <Journal />
            </div>
          </button>
        ),
      },
    ]);
  };
  const table = useTable(
    { columns: productsColumns, data: productsData },
    tableHooks,
    useSortBy
  );

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
                <th
                  key={index}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <div className="flex flex-row items-center">
                    {column.render("header")}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <ArrowDown />
                      ) : (
                        <ArrowUp />
                      )
                    ) : (
                      <ArrowDown />
                    )}
                  </div>
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
