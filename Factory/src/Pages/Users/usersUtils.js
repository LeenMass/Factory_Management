import axios from "axios";
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
const countOfUserActions = async () => {
    try {
        const { data } = await axios.post(`${usersUrl}/actions`, {}, {
            withCredentials: true
        });
        return data.remaining;

    }
    catch (error) {
        alert("You reached your daily action limit. Logging out...");
        return 0
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