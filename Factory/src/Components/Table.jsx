import React from "react";

const Table = (props) => {
  const forienKey = ["id", "manager"];
  return (
    <table border="1">
      <thead>
        {props.columns.map((e) => {
          return (
            <th
              key={e._id}
              style={{
                width: `${100 / props.columns.length}%`,
              }}
            >
              {e.title}
            </th>
          );
        })}
      </thead>
      <tbody>
        {props.source.map((data, index) => {
          return (
            <tr key={data._id}>
              {props.columns.map((e) => {
                return (
                  <td
                    key={e._id}
                    style={{
                      width: `${100 / props.columns.length}%`,
                    }}
                  >
                    {typeof data[e.dataIndex] === "string" &&
                    !forienKey.includes(e.dataIndex) ? (
                      <a href="">{data[e.dataIndex]}</a>
                    ) : (
                      data[e.dataIndex]
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
