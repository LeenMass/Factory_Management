import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../Components/Table";
import { getShifts } from "./shiftsUtils";

const Shifts = () => {
  const navigate = useNavigate();
  const [shifts, setShifts] = useState([]);

  const columns = [
    { title: "Date", dataIndex: "date" },
    { title: "starting_hour", dataIndex: "starting_hour" },
    { title: "ending_hour", dataIndex: "ending_hour" },
    { title: "employees", dataIndex: "employees", type: "list-items" },
  ];
  const getAllShifts = async () => {
    try {
      const { data } = await getShifts();

      setShifts(data);
    } catch (error) {
      alert(`Failed to fetch Shifts ,${error}`);
    }
  };

  useEffect(() => {
    getAllShifts();
  }, []);
  return (
    <div>
      Shifts
      <Table
        columns={columns}
        source={shifts}
        edit={true}
        editData={"Shifts"}
      />
      <button onClick={() => navigate("/AddingShift")}>Add Shift</button>
    </div>
  );
};

export default Shifts;
