import React from "react";
import { Link } from "react-router-dom";

const Table = (props) => {
  const forienKey = ["id", "manager"];
  return (
    <table border="1">
      <thead>
        <tr>
          {props.columns.map((e, index) => {
            return (
              <th
                key={index}
                style={{
                  width: `${100 / props.columns.length}%`,
                }}
              >
                {e.title}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {props.source.map((data, index) => {
          return (
            <tr key={index}>
              {props.columns.map((e, index) => {
                return (
                  <td
                    key={index}
                    style={{
                      width: `${100 / props.columns.length}%`,
                    }}
                  >
                    {!forienKey.includes(e.dataIndex) ? (
                      e.dataIndex === "Full_Name" ? (
                        <a href={`/${props.editE}/${data[props.employee_id]}`}>
                          {data[e.dataIndex]}
                        </a>
                      ) : (
                        <a href={`/${props.editDep}/${data["department_id"]}`}>
                          {data[e.dataIndex]}
                        </a>
                      )
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
