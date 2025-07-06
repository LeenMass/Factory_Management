import axios from "axios";
const departmentsUrl = "http://localhost:4000/departments";

const getDepartments = async () => {
    try {
        return axios.get(departmentsUrl);
    } catch (error) {
        alert(`Failed to fetch Data ,${error}`);
    }
};
const getDepartmentById = async (id) => {
    try {
        return axios.get(`${departmentsUrl}/${id}`);
    } catch (error) {
        alert(`Failed to get employee Data, Please try again."`);
    }

};
export { getDepartments, getDepartmentById }