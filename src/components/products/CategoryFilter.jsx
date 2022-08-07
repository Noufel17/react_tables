import React from "react";
import { useState } from "react";
function CategoryFilter({ setColumnFilterValue, preFilteredRows: { length } }) {
  const [value, setValue] = useState("");
  const options = [
    "all",
    "men's clothing",
    "women's clothing",
    "electronics",
    "jewelery",
  ];
  return (
    <div className="h-12 w-1/6 rounded-md bg-[#F2F2F2] flex items-center p-4 mb-4 cursor-pointer text-left text-bold ">
      <select
        // couldn't display length has to make it happen
        className=" bg-transparent appearance-none w-full leading-tight focus:outline-none "
        value={value}
        defaultValue={"all"}
        onChange={(event) => {
          setValue(event.target.value);
          setColumnFilterValue(event.target.value);
        }}
      >
        {options.map((option, index) => {
          return <option key={index}>{option}</option>;
        })}
      </select>
    </div>
  );
}

export default CategoryFilter;
