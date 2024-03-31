import "../../css/form.css"
import React, {useState} from "react";
import {Alert, Col, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import UserService from "../../func/UserService";

function Join() {
    let navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMessage, setErrMessage] = useState([]);
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const joinAxios = () => {
        let join = {
            'username': username,
            'email': email,
            'password': password,
        }
        axios.post(`/user-service/api/users`, JSON.stringify(join), {
            headers: {
                "Content-Type": `application/json`,
            }
        }).then(resp => {
            if (resp.status === 200) {
                sessionStorage.setItem('email', email);
                alert("Join Success.")
                navigate('/verify/mail');
            }
        }).catch(error => {
            const errorMessage = error.response.data.errorMessage;
            const messageArray = Array.isArray(errorMessage) ? errorMessage : [errorMessage];
            setErrMessage(messageArray);
        })
    }

    return (
        <div>
            <div className="login-container">
                <form className="login-form" onClick={handleSubmit}>
                    <h3>Join</h3>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" autoComplete={"on"} onChange={e => {
                            setEmail(e.target.value)
                        }} className="form-control" placeholder="Enter email"/>
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" autoComplete={"on"} onChange={e => {
                            setUsername(e.target.value);
                        }} className="form-control" placeholder="Enter username"/>
                        <div className="text-start gray mb-3 mt-0">
                            username must be at least than 4 characters.
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" autoComplete="current-password" onChange={e => {
                            setPassword(e.target.value)
                        }} className="form-control" placeholder="Enter password"/>
                    </div>
                    <div className="text-start gray mb-3 mt-0">
                        Password must be at least than 8 characters.
                    </div>
                    <div className="error-messages-container">
                        {
                            errMessage.map((msg, index) => {
                                return (
                                    <Alert key={index} className={"alert-danger"}>{msg}</Alert>
                                )
                            })
                        }
                    </div>
                    <Row>
                        <Col>
                            <button type="button" onClick={() => navigate('/login')}
                                    className="btn btn-primary login-button">Back
                            </button>
                        </Col>
                        <Col>
                            <button type="button" onClick={() => {
                                joinAxios()
                            }} className="btn btn-primary login-button">Join
                            </button>
                        </Col>
                    </Row>
                </form>
            </div>
        </div>
    );
}

export default Join