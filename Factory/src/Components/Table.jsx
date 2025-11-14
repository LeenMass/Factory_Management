import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faCalendarAlt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import PopUp from "./PopUp";
import { useState } from "react";

const Table = (props) => {
  const [isOpenId, setIsOpenId] = useState(null);
  const tableCells = (e, data) => {
    switch (e.type) {
      case "link-list":
        if (Array.isArray(data[e.dataIndex])) {
          return (
            <ul>
              {data[e.dataIndex].map((item, index) => (
                <li key={index}>
                  <Link to={`/${item.route}/${item.id}`}>{item.text}</Link>
                </li>
              ))}
            </ul>
          );
        }
        break;
      case "link":
        if (typeof data[e.dataIndex] === "object") {
          return (
            <Link to={`/${data[e.dataIndex].route}/${data[e.dataIndex].id}`}>
              {data[e.dataIndex].text}
            </Link>
          );
        }
        break;

      case "list-items":
        if (Array.isArray(data[e.dataIndex])) {
          return (
            <ul
              key={data.id}
              style={{
                padding: 0,
                margin: 0,
                fontFamily: "sans-serif",
                textAlign: "center",
              }}
            >
              {data[e.dataIndex].map((item, index) => {
                const values = Object.values(item).slice(1);
                if (props.op1 === "case1") {
                  return (
                    <li
                      key={item.id}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "8px 12px",
                        borderBottom: "1px solid #ccc",
                        gap: "6px",
                        fontSize: "14px",
                        color: "#333",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faCalendarAlt}
                        style={{ color: "#007bff" }}
                      />
                      <span>{values[0]}</span>

                      <FontAwesomeIcon
                        icon={faClock}
                        style={{ color: "#28a745" }}
                      />
                      <span>
                        {values[1]} - {values[2]}
                      </span>
                    </li>
                  );
                } else {
                  return (
                    <li style={{ textAlign: "center" }} key={item.id}>
                      {props.select ? (
                        <>
                          <span>{values}</span>
                          <input
                            type="checkBox"
                            onChange={() =>
                              props.setChoices(data.id, Object.values(item)[0])
                            }
                            checked={props.choices?.includes(
                              Object.values(item)[0]
                            )}
                            name="id"
                          />
                        </>
                      ) : (
                        <span>{values}</span>
                      )}
                    </li>
                  );
                }
              })}
            </ul>
          );
        }
        break;

      default:
        return data[e.dataIndex];
    }
  };

  return (
    <table border="1">
      <thead>
        <tr>
          {props.columns.map((e, index) => (
            <th key={index} style={{ width: `${100 / props.columns.length}%` }}>
              {e.title}
            </th>
          ))}
          {props.edit && (
            <>
              <th colSpan="2"></th>
            </>
          )}
        </tr>
      </thead>

      <tbody>
        {props.source.map((data, index) => (
          <tr key={data.id || index}>
            {props.columns.map((e) => (
              <td
                key={e.title}
                style={{ width: `${100 / props.columns.length}%` }}
              >
                {tableCells(e, data)}
              </td>
            ))}

            {props.edit && (
              <>
                <td style={{ textAlign: "center", padding: "10px" }}>
                  <a
                    href={`/${props.editData}/${data.id}`}
                    style={{ color: "#007bff" }}
                  >
                    <i className="fas fa-edit"></i>
                    {props.editIcon}
                  </a>
                </td>

                <td
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    borderLeft: "1px solid #ccc",
                  }}
                >
                  <div
                    style={{
                      color: "#28a745",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "5px",
                    }}
                    onClick={() => setIsOpenId(data.id)}
                    title={props.addIcon}
                  >
                    <FontAwesomeIcon
                      icon={faAdd}
                      style={{ fontSize: "20px" }}
                    />
                    <span>{props.addIcon}</span>
                  </div>

                  {isOpenId === data.id && (
                    <PopUp
                      isOpen={isOpenId === data.id}
                      onClose={() => setIsOpenId(null)}
                      id={data.id}
                      eData={data?.employees}
                      update={props.update}
                    />
                  )}
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
