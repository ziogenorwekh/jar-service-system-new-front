import React, {useEffect, useState} from "react";
import {Alert, Col, Form, Row} from "react-bootstrap";
import UserService from "../../func/UserService";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function EmailVerify() {

    const [code, setCode] = useState('');
    const [email, setEmail] = useState('');
    const [errMsg, setErrMsg] = useState('');
    let navigate = useNavigate();

    useEffect(() => {
        let item = sessionStorage.getItem('email');
        if (item !== null) {
            setEmail(item);
        }
        UserService.sendEmailVerification(item)
    }, []);
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const verify = ()=>{
        let verifyCode = {
            'email' : email,
            'emailCode' : code
        }
        axios.put(`/user-service/api/mails`, JSON.stringify(verifyCode), {
            headers: {
                "Content-Type": "application/json",
            }
        }).then(response => {
            alert('email successful Authenticated.')
            sessionStorage.removeItem('email')
            navigate('/login')
        }).catch(error => {
            let errorMsg = error.response.errorMessage;
            setErrMsg(errorMsg);
        });
    }

    const resend = () =>{
        UserService.sendEmailVerification(email);
    }

    return (
        <div className={"login-container"}>
            <form className="login-form" onClick={handleSubmit}>
                <h3>Email</h3>
                <div className="form-group">
                    <label>Email</label>
                    {
                        email === '' ?
                            <input type="text" autoComplete={"on"} onChange={e => {
                                setEmail(e.target.value)
                            }} className="form-control" placeholder="Enter email"/>
                            : <div className="text-start gray"><h4>{email}</h4></div>
                    }
                </div>
                <h3>Verify Email Code</h3>
                <div className="form-group">
                    <label>Number</label>
                    <input type="text" autoComplete={"on"} onChange={e => {
                        setCode(e.target.value)
                    }} className="form-control" placeholder="Enter verify code."/>
                </div>
                {
                    errMsg === '' ? null : <Alert className={"alert-danger mt-4"}>{errMsg}</Alert>
                }
                <Row>
                    <Col>
                        <button type="button" onClick={() => {
                            resend()
                        }} className="btn btn-primary login-button">Resend
                        </button>
                    </Col>
                    <Col>
                        <button type="button" onClick={() => {
                            verify()
                        }} className="btn btn-primary login-button">Verify
                        </button>
                    </Col>
                </Row>
            </form>
        </div>
    );
}

export default EmailVerify