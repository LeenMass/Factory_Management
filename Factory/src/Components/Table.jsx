import React from "react";
import { Link } from "react-router-dom";

const Table = (props) => {
  console.log(props);
  const TableCells = (e, data) => {
    console.log(data);
    switch (e.dataIndex) {
      case props.case1:
        if (Array.isArray(data[e.dataIndex])) {
          return (
            <ul>
              {data[e.dataIndex].map((emp, index) => (
                <li key={index}>
                  {console.log(emp.id)}
                  {emp["name"] || emp["Full_Name"]
                    ? emp[props.case2]
                    : emp[props.case4] +
                      "  " +
                      emp[props.case5] +
                      "-" +
                      emp[props.case6]}
                </li>
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

      case props.case7:
        return (
          <table border="2">
            {console.log(data[e.dataIndex])}
            {data[e.dataIndex].map((item) => (
              <tr>
                <td>{item.date}</td>
                <td>{item.starting_hour}</td>
                <td>{item.ending_hour}</td>
              </tr>
            ))}
          </table>
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
                <Link to={`/${props.editData}/${data.id}`}>
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
