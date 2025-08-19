import axios from "axios";
const shiftsUrl = "http://localhost:4000/shifts";

const getShifts = () => {
    try {
        return axios.get(shiftsUrl, {
            withCredentials: true
        });

    } catch (error) {
        alert(`Failed to fetch Shifts ,${error}`);
    }
};
const addNewShift = (shiftObj) => {
    try {
        return axios.post(shiftsUrl, shiftObj, {
            withCredentials: true
        });
    } catch (error) {
        alert(`Failed to add Shift ,${error}`);
    }
};
const UpdateShiftDetails = (id, shiftObj) => {
    try {
        return axios.put(`${shiftsUrl}/${id}`, shiftObj, {
            withCredentials: true
        });

    } catch (error) {
        alert(`Failed to update the shift Details, Please try again."`);
    }
};
export { getShifts, UpdateShiftDetails, addNewShift }