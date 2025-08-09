import axios from "axios";
const usersUrl = "http://localhost:4000/users";

const getUsers = () => {
    try {
        return axios.get(usersUrl);

    } catch (error) {
        alert(`Failed to fetch Users ,${error}`);
    }
};
const getUserById = (id) => {
    try {
        return axios.get(`${usersUrl}/${id}`);

    } catch (error) {
        alert(`Failed to get this User ,${error}`);
    }
};
const addNewUser = (userObj) => {
    try {
        return axios.post(usersUrl, userObj);
    } catch (error) {
        alert(`Failed to add User ,${error}`);
    }
};

export { getUserById, getUsers, addNewUser }