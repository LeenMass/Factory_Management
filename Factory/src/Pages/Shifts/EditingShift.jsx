import { useState } from "react";
import { useParams } from "react-router-dom";
import { UpdateShiftDetails } from "./shiftsUtils";

function EditingShift() {
  const { id } = useParams();
  const [shiftData, setNewShiftData] = useState({});

  const shiftHandle = (e) => {
    const { name, value } = e.target;
    setNewShiftData((prev) => ({ ...prev, [name]: value }));
  };

  const updateShiftData = async (e) => {
    e.preventDefault();
    try {
      await UpdateShiftDetails(id, shiftData);
      navigate("/Shifts");
    } catch (error) {
      alert(`Failed to update, Please try again."`);
    }
  };

  return <div>EditingShift</div>;
}

export default EditingShift;
