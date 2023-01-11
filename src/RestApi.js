import axios from "axios";

const url = 'http://localhost:4600';

class RestApi {

    getUser(id) {
        return axios.get(`${url}/users/${id}`);
    }

    getReceipe(foodType) {
        return axios.get(`${url}/${foodType}`);
    }

    getAllUsers() {
        return axios.get(`${url}/users`);
    }

    saveUser(userObject) {
        axios.post(`${url}/users`, userObject);
    }

    changeUser(userObject, id) {
        axios.put(`${url}/users/${id}`, userObject);
    }

    saveReceipe(receipeObject, type) {
        axios.post(`${url}/${type}`, receipeObject);
    }

    changeReceipe(foodtype, id, receipeObject) {
        axios.put(`${url}/${foodtype}/${id}`, receipeObject);
    }

    deleteReceipe(foodtype, id) {
        axios.delete(`${url}/${foodtype}/${id}`);
    }

}
export default new RestApi();