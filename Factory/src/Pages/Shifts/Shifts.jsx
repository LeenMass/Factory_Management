import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../Components/Table";
import axios from "axios";
const shiftsUrl = "http://localhost:4000/shifts";

const Shifts = () => {
  const navigate = useNavigate();
  const [shifts, setShifts] = useState([]);

  const getShifts = async () => {
    try {
      const { data } = await axios.get(shiftsUrl);
      setShifts(data);
    } catch (error) {
      alert(`Failed to fetch Shifts ,${error}`);
    }
  };
  console.log(shifts);
  useEffect(() => {
    getShifts();
  }, []);
  const columns = [
    { title: "Date", dataIndex: "date" },
    { title: "starting_hour", dataIndex: "starting_hour" },
    { title: "ending_hour", dataIndex: "ending_hour" },
    { title: "employees", dataIndex: "employees" },
  ];
  return (
    <div>
      Shifts
      <Table
        columns={columns}
        source={shifts}
        edit={true}
        editData={"Shifts"}
        case1={"employees"}
        case2={"name"}
        case8={"shift"}
      />
      <button onClick={() => navigate("/AddingShift")}>Add Shift</button>
    </div>
  );
};

export default Shifts;
