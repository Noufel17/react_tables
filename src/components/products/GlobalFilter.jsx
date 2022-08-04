import React from "react";
import { useState } from "react";
import { useAsyncDebounce } from "react-table";
import Search from "../../svgs/Search";
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 300);
  return (
    <div className="search_bar">
      <Search />
      <input
        type="text"
        value={value || ""}
        onChange={(event) => {
          setValue(event.target.value);
          onChange(event.target.value);
        }}
        placeholder={`${count} items...`}
      />
    </div>
  );
}

export default GlobalFilter;
