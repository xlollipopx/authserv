
import axios from "axios";
import Cookies from 'js-cookie';


export default class PostService {

    static async activateLicence() {

        try {

            const response = await axios.post('http://78.140.252.69/api/activateLicence', {
                token: Cookies.get('token')
            })

            return response;
        } catch (e) {
            return null;
        }
    }

    static async getInfo() {
        try {
            const response = await axios.post('http://78.140.252.69/api/userSiteInfo', {
                token: Cookies.get('token')
            })
            return response.data;

        } catch (e) {
            return null;
        }
    }
}