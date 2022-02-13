import React from "react";

const TextBox = ({ name, date }) => {
  const arr = date.split("-");
  const d = `${arr[2]}/${arr[1]}/${arr[0]}`;
  return (
    <div>
      <h2>
        Restrictions for {name} on {d}
      </h2>
    </div>
  );
};

export default TextBox;
