import React from "react";
import { Link } from "react-router-dom";

const Table = (props) => {
  const TableCells = (e, data) => {
    switch (e.dataIndex) {
      case props.case1:
        if (Array.isArray(data[e.dataIndex])) {
          return (
            <ul>
              {data[e.dataIndex].map((emp, index) => (
                <li key={index}>{emp[props.case2]}</li>
              ))}
            </ul>
          );
        }

      case props.case2:
        return (
          <Link to={`/${props.editE}/${data[props.employee_id]}`}>
            {data[e.dataIndex]}
          </Link>
        );
      case props.case3:
        return (
          <Link to={`/${props.editDep}/${data[props.department]}`}>
            {data[e.dataIndex]}
          </Link>
        );

      default:
        return data[e.dataIndex];
    }
  };

  return (
    <table border="1">
      <thead>
        <tr>
          {props.columns.map((e) => {
            return (
              <th
                key={e.title}
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
        {props.source.map((data) => (
          <tr key={data.id}>
            {props.columns.map((e) => (
              <td
                key={e.title}
                style={{
                  width: `${100 / props.columns.length}%`,
                }}
              >
                {TableCells(e, data)}
              </td>
            ))}
            {props.edit ? (
              <td style={{ display: "flex column" }}>
                <Link to={`/${props.editData}/${data._id}`}>
                  <i className="fas fa-edit"></i>
                </Link>
              </td>
            ) : (
              ""
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
