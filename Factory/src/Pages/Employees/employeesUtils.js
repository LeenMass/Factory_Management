import axios from "axios";


const EmployeesUrl = "http://localhost:4000/employees";


const getemployees = async () => {
    try {
        const res = await axios.get(EmployeesUrl, { withCredentials: true });
        return res;
    } catch (error) {
        alert(`Failed to fetch Data: ${error}`);
        return { data: [] };
    }
}
const getEmployeeById = (id) => {
    try {
        return axios.get(`${EmployeesUrl}/${id}`, {
            withCredentials: true
        });
    } catch (error) {
        alert(`Failed to get employee Data, Please try again."`);
    }

};
const addEmployee = (obj) => {
    try {
        return axios.post(EmployeesUrl, obj, {
            withCredentials: true
        });
    } catch (error) {
        alert(`Failed to add Employee ,${error}`);
    }
};
const UpdateEmployeeData = (id, employeeObj) => {
    try {
        return axios.put(`${EmployeesUrl}/${id}`, employeeObj, {
            withCredentials: true
        });

    } catch (error) {
        alert(`Failed to update the employee Data, Please try again."`);
    }
};
const DeleteEmployee = (id) => {
    try {
        return axios.delete(`${EmployeesUrl}/${id}`, {
            withCredentials: true
        });

    } catch (error) {
        alert("Failed to delete the employee, Please try again.");
    }
};

export { getemployees, UpdateEmployeeData, addEmployee, DeleteEmployee, getEmployeeById }