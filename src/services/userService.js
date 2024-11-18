import axios from 'axios';

const apiUrl = "http://localhost:3000/api/user";

export const getUsers = async () => {
    const response = await axios.get(apiUrl);
    return response.data;
};

export const addUser = async (user) => {
    const response = await axios.post(apiUrl, user);
    return response.data;
};

export const updateUser = async (user) => {
    const response = await axios.put(`${apiUrl}/${user._id}`, user);
    return response.data;
};

export const deleteUserById = async (id) => {
    const response = await axios.delete(`${apiUrl}/${id}`);
    return response.data;
};

export default userService; // Asegúrate de que esto sea una exportación predeterminada
