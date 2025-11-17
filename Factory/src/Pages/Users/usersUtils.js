import axios from "axios";
import { useNavigate } from "react-router-dom";
const usersUrl = "http://localhost:4000/users";
const getUsers = () => {
    try {
        return axios.get(usersUrl, {
            withCredentials: true
        });

    } catch (error) {
        alert(`Failed to fetch Users ,${error}`);
    }
};
const countOfUserActions = async (navigate) => {
    try {
        const { data } = await axios.post(`${usersUrl}/actions`, {}, {
            withCredentials: true
        });
        if (data.remaining === 0) {
            alert("You reached your daily action limit. Logging out...");
            navigate("/");
        }
    }
    catch (error) {
        alert(`Failed to fetch Users ,${error}`);
    }
};
const getUserById = (id) => {
    try {
        return axios.get(`${usersUrl}/${id}`, {
            withCredentials: true
        });

    } catch (error) {
        alert(`Failed to get this User ,${error}`);
    }
};
const addNewUser = (userObj) => {
    try {
        return axios.post(usersUrl, userObj, {
            withCredentials: true
        });
    } catch (error) {
        alert(`Failed to add User ,${error}`);
    }
};

export { getUserById, getUsers, addNewUser, countOfUserActions }