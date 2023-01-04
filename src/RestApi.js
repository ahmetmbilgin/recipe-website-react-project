import axios from "axios";

const url = 'http://localhost:4600/';

class RestApi {
    async getUser(username) {
        await axios.get(`${url}/user/${username}`);
    }

    async getAllUsers() {
        return await axios.get(`${url}/user`);
    }

    async saveUser(userObject) {
        await axios.post(`${url}/user`, userObject);
    }
}
export default new RestApi();