import axios from "axios";
const departmentsUrl = "http://localhost:4000/departments";

const getDepartments = () => {
    try {
        return axios.get(departmentsUrl, { withCredentials: true });


    } catch (error) {
        alert(`Failed to fetch Data ,${error}`);
    }

};
const getDepartmentById = (id) => {
    try {
        return axios.get(`${departmentsUrl}/${id}`, {
            withCredentials: true
        });
    } catch (error) {
        alert(`Failed to get employee Data, Please try again."`);
    }

};
const updateDepartmentData = (id, departmentObj) => {
    try {
        return axios.put(`${departmentsUrl}/${id}`, departmentObj, {
            withCredentials: true
        });
    } catch (error) {
        alert(`Failed to update the department Data, Please try again."`);
    }

};
const addDepartment = (obj) => {
    try {
        return axios.post(departmentsUrl, obj, {
            withCredentials: true
        });
    } catch (error) {
        alert(`Failed to add Department ,${error}`);
    }
};
const deleteDepartment = (id) => {
    try {
        return axios.delete(`${departmentsUrl}/${id}`, {
            withCredentials: true
        });

    } catch (error) {
        alert("Failed to delete this department, Please try again.");
    }
};
export { getDepartments, getDepartmentById, updateDepartmentData, addDepartment, deleteDepartment }