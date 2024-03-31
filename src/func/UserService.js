import axios from 'axios';

class UserService {
    constructor() {
        this.baseUrl = '/user-service/api';
    }

    sendEmailVerification(email) {
        let emailVerify = {
            'email' : email
        }
        return axios.post(`${this.baseUrl}/mails`, JSON.stringify(emailVerify), {
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(response => {
                console.log("successful send.")
            })
            .catch(error => {
                console.log("send error.")
                throw error;
            });
    }


}

export default new UserService();