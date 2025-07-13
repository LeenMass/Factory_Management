import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faClock } from "@fortawesome/free-solid-svg-icons";

const Table = (props) => {
  const tableCells = (e, data) => {
    console.log(data);

    switch (e.type) {
      case "link-list":
        if (Array.isArray(data[e.dataIndex])) {
          return (
            <ul>
              {data[e.dataIndex].map((item, index) => (
                <li key={index}>
                  <a href={`/${item.route}/${item.id}`}>{item.text}</a>
                </li>
              ))}
            </ul>
          );
        }

      case "link":
        if (typeof data[e.dataIndex] === "object") {
          return (
            <Link to={`/${data[e.dataIndex].route}/${data[e.dataIndex].id}`}>
              {data[e.dataIndex].text}
            </Link>
          );
        }

      case "list-items":
        if (Array.isArray(data[e.dataIndex])) {
          return (
            <ul
              style={{
                padding: 0,
                margin: 0,
                fontFamily: "sans-serif",
              }}
            >
              {data[e.dataIndex].map((item, index) => {
                const values = Object.values(item).slice(1);
                return (
                  <li
                    key={index}
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
              })}
            </ul>
          );
        }
        break;
      case "table":
        return (
          <table border="2">
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
                {tableCells(e, data)}
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
