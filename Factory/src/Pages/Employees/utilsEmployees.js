import axios from "axios";


const EmployeesUrl = "http://localhost:4000/employees";

const getemployees = async () => {
    try {

        return axios.get(EmployeesUrl);
    } catch (error) {
        alert(`Failed to fetch Data ,${error}`);
    }
};
const getEmployeeById = async (id) => {
    try {
        return axios.get(`${EmployeesUrl}/${id}`);
    } catch (error) {
        alert(`Failed to get employee Data, Please try again."`);
    }

};
const UpdateEmployeeData = (id, obj) => {
    try {
        return axios.put(`${EmployeesUrl}/${id}`, obj);

    } catch (error) {
        alert(`Failed to updates the employee Data, Please try again."`);
    }
};
const DeleteEmployee = async (id) => {
    try {
        return axios.delete(`${EmployeesUrl}/${id}`);

    } catch (error) {
        alert("Failed to delete the employee, Please try again.");
    }
};

export { getemployees, UpdateEmployeeData, DeleteEmployee, getEmployeeById }