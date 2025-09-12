import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getShiftById, UpdateShiftDetails } from "./shiftsUtils";

function EditingShift() {
  const [shiftNewData, setNewShiftData] = useState({
    date: "",
    ending_hour: "",
    starting_hour: "",
  });
  const [cancel, setCancel] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const getShift = async () => {
    const { data: shift } = await getShiftById(id);
    setNewShiftData({
      date: shift.date,
      ending_hour: shift.ending_hour,
      starting_hour: shift.starting_hour,
    });
  };

  const shiftHandle = (e) => {
    const { name, value } = e.target;
    setNewShiftData((prev) => ({ ...prev, [name]: value }));
  };

  const updateShiftData = async (e) => {
    e.preventDefault();
    try {
      await UpdateShiftDetails(id, shiftNewData);
      navigate("/Shifts");
    } catch (error) {
      alert(`Failed to update, Please try again."`);
    }
  };

  useEffect(() => {
    getShift();
  }, [id]);

  return (
    <div>
      Editing Shift
      <form>
        <input
          name="date"
          type="date"
          onChange={shiftHandle}
          value={shiftNewData.date}
        />
        <input
          name="starting_hour"
          type="time"
          onChange={shiftHandle}
          value={shiftNewData.starting_hour}
        />
        <input
          name="ending_hour"
          type="time"
          onChange={shiftHandle}
          value={shiftNewData.ending_hour}
        />

        <button type="submit" onClick={updateShiftData}>
          Edit Shift
        </button>
        <button onClick={() => navigate("/shifts")}>Cancel</button>
      </form>
    </div>
  );
}

export default EditingShift;
