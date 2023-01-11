import axios from "axios";

const url = 'http://localhost:4600';
class RestApi {

    // User fetch //
    getUser(id) {
        return axios.get(`${url}/users/${id}`);
    }
    getAllUsers() {
        return axios.get(`${url}/users`);
    }
    async saveUser(userObject) {
        try {
            await axios.post(`${url}/users`, userObject);
        } catch (error) {
            alert(error.message);
        }
    }
    async changeUser(userObject, id) {
        try {
            await axios.put(`${url}/users/${id}`, userObject);
        } catch (error) {
            alert(error.message);
        }
    }


    // Receipe fetch //
    getReceipe(foodType) {
        return axios.get(`${url}/${foodType}`);
    }
    async saveReceipe(receipeObject, type) {
        try {
            await axios.post(`${url}/${type}`, receipeObject);
        } catch (error) {
            alert(error.message);
        }
    }
    async changeReceipe(foodtype, id, receipeObject) {
        try {
            await axios.put(`${url}/${foodtype}/${id}`, receipeObject);
        } catch (error) {
            alert(error.message);
        }
    }
    async deleteReceipe(foodtype, id) {
        try {
            await axios.delete(`${url}/${foodtype}/${id}`);
        } catch (error) {
            alert(error.message);
        }
    }
}
export default new RestApi();