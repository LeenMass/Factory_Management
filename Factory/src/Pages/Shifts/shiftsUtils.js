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
const getShiftById = (id) => {
    try {
        return axios.get(`${shiftsUrl}/${id}`, {
            withCredentials: true
        });

    } catch (error) {
        alert(`Failed to get Shift ,${error}`);
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
const addEmployeesToShift = (object) => {
    try {
        return axios.post(`${shiftsUrl}/addingEmployeesToShift`, object, {
            withCredentials: true
        });

    } catch (error) {
        alert(`Failed to update the shift Details, Please try again."`);
    }
};
const DeleteEmployeeFromShift = (empIds) => {
    try {
        return axios.post(`${shiftsUrl}/employeesShift`, empIds, {
            withCredentials: true,

        });

    } catch (error) {
        alert(`Failed to delete employee from this shift, Please try again."`);
    }
};

export { getShifts, UpdateShiftDetails, addNewShift, getShiftById, DeleteEmployeeFromShift, addEmployeesToShift }