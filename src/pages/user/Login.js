import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useDispatch} from "react-redux";
import '../../css/form.css';
import {setStoreEmail, setStoreUserId} from "../../store";
import {Alert} from "react-bootstrap";
import async from "async";

function Login() {

    let navigate = useNavigate();
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let dispatch = useDispatch();
    let [errMsg, setErrMsg] = useState('');
    useEffect(() => {
            isLogin()

        }
        , [])

    const isLogin = () => {
        if (axios.defaults.headers.common['Authorization'] != null) {
            alert("you are already login.")
            navigate('/');
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            loginAxios()
        }
    }

    const loginAxios = () => {
        let login = {'email': email, 'password': password}
        axios.post(`/user-service/api/login`, JSON.stringify(login), {
            headers: {
                "Content-Type": `application/json`,
            }
        }).then(resp => {
            dispatch(setStoreEmail(resp.data.email));
            dispatch(setStoreUserId(resp.data.userId));
            axios.defaults.headers.common['Authorization'] = null;
            axios.defaults.headers.common['Authorization'] = `Bearer ${resp.data.accessToken}`;
            navigate('/');
        }).catch((error) => {
            if (error.response.status === 403) {
                alert("이메일 인증을 진행해주세요.")
                sessionStorage.setItem('email',login.email)
                navigate('/verify/mail')
            }
            let copy = error.response.data.errorMessage;
            setErrMsg(copy);
        })
    }
    return (
        <>
            <div className="login-container">
                <form className="login-form">
                    <h3>Login</h3>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="text" autoComplete={"on"} onChange={e => {
                            setEmail(e.target.value)
                        }} className="form-control" placeholder="Enter email"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" autoComplete="current-password" onChange={e => {
                            setPassword(e.target.value)
                        }} className="form-control" onKeyDown={handleKeyDown} placeholder="Enter password"/>
                    </div>
                    <button type="button" onClick={() => {
                        loginAxios()
                    }} className="btn btn-primary login-button">Login
                    </button>
                    {
                        errMsg === '' ? null : <Alert className="alert-danger mt-2">{errMsg}</Alert>
                    }
                    <div className="join-container">
                        <p className="forgot-text mb-0" onClick={() => navigate('/reset/password')}>Forgot password?</p>
                    </div>
                    <div className="join-container">
                        <p className="join-text">Don't have an account?</p>
                        <button type="button" className="join-button w-25" onClick={() => {
                            navigate('/join')
                        }}>Join
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login