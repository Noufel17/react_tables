import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import { useMemo } from "react";
import "./style.css";
import ArrowDown from "../../svgs/ArrowDown";
import ArrowUp from "../../svgs/ArrowUp";
import GlobalFilter from "./GlobalFilter";
import CategoryFilter from "./CategoryFilter";
import Edit from "../../svgs/Edit";
import ArrowRight from "../../svgs/ArrowRight";
import ArrowLeft from "../../svgs/ArrowLeft";
function Products() {
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

  const productsData = useMemo(() => [...products], [products]);
  const productsColumns = useMemo(
    () =>
      products[0]
        ? Object.keys(products[0])
            .filter((key) => key !== "rating")
            .map((key) => {
              if (key === "image") {
                return {
                  Header: key,
                  accessor: key,
                  Cell: ({ value }) => <img src={value} alt={key} />,
                  maxWidth: 30,
                };
              }
              if (key === "category") {
                return {
                  Header: key,
                  accessor: key,
                  filter: "equals",
                };
              }
              return { Header: key, accessor: key };
            })
        : [],
    [products]
  );
  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "journal",
        Header: "journal",
        Cell: ({ row }) => (
          <button
            className="small_btn"
            onClick={() => {
              alert("editing product with id :", row.values.id);
            }}
          >
            <div>
              <Edit />
            </div>
          </button>
        ),
      },
    ]);
  };
  const table = useTable(
    {
      columns: productsColumns,
      data: productsData,
      initialState: { pageSize: 2 },
    },
    useGlobalFilter,
    useFilters,
    tableHooks,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    gotoPage,
    pageCount,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    preFilteredRows,
    state,
    setFilter,
  } = table;
  const { pageIndex } = state;

  const pages = Array.from(new Array(pageCount), (val, index) => 1 + index);

  const [columnFilterValue, setColumnFilterValue] = useState("");
  // listen to filter value changes outside
  useEffect(() => {
    if (columnFilterValue !== "") {
      setFilter(
        "category",
        columnFilterValue === "all" ? undefined : columnFilterValue
      );
    }
  }, [columnFilterValue, setFilter]);

  useEffect(() => {
    fetchProductsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="w-full flex flex-row justify-evenly items-center  ">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <CategoryFilter
          setColumnFilterValue={setColumnFilterValue}
          preFilteredRows={preFilteredRows}
        />
      </div>

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
                      {column.render("Header")}
                      {column.Header !== "journal" ? (
                        column.isSorted ? (
                          column.isSortedDesc ? (
                            <ArrowDown />
                          ) : (
                            <ArrowUp />
                          )
                        ) : (
                          <ArrowDown />
                        )
                      ) : (
                        ""
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
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
      <div className="pagination_wrapper">
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          className="page_btn"
        >
          <ArrowLeft />
        </button>
        {pageCount < 10 &&
          pages.map((val, index) => {
            return (
              <button
                key={index}
                value={val}
                onClick={() => gotoPage(index)}
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                className={
                  index === pageIndex
                    ? "page_btn bg-[rgba(223,208,242)]"
                    : "page_btn"
                }
              >
                {val}
              </button>
            );
          })}
        {pageCount >= 10 && (
          <>
            <button
              onClick={() => gotoPage(0)}
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className={
                0 === pageIndex ? "page_btn bg-[rgba(223,208,242)]" : "page_btn"
              }
            >
              {1}
            </button>
            <button
              onClick={() => gotoPage(1)}
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className={
                1 === pageIndex ? "page_btn bg-[rgba(223,208,242)]" : "page_btn"
              }
            >
              {2}
            </button>
            <button className="page_btn">{"..."}</button>
            <button
              onClick={() => gotoPage(pageCount - 1)}
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className={
                pageCount - 1 === pageIndex
                  ? "page_btn bg-[rgba(223,208,242)]"
                  : "page_btn"
              }
            >
              {pageCount}
            </button>
          </>
        )}
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          className="page_btn"
        >
          <ArrowRight />
        </button>
      </div>
    </>
  );
}

export default Products;
