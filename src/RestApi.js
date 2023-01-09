import axios from "axios";

const url = 'http://localhost:4600';

class RestApi {

    async getUser(id) {
        return await axios.get(`${url}/users/${id}`);
    }

    async getReceipe(foodType) {
        return await axios.get(`${url}/${foodType}`);
    }

    async getAllUsers() {
        return await axios.get(`${url}/users`);
    }

    async saveUser(userObject) {
        await axios.post(`${url}/users`, userObject);
    }

    async changeUser(userObject, id) {
        await axios.put(`${url}/users/${id}`, userObject);
    }

    async saveReceipe(receipeObject, type) {
        await axios.post(`${url}/${type}`, receipeObject);
    }

}
export default new RestApi();