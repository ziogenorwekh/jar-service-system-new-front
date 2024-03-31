import {Col, Row, Alert} from "react-bootstrap";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {logout} from "../../store";
import {useDispatch, useSelector} from "react-redux";
import "../../css/form.css"

function DatabaseRegister() {

    const [errMessage, setErrMessage] = useState([]);
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const [databaseName, setDatabaseName] = useState('')
    const [databaseUsername, setDatabaseUsername] = useState('')
    const [databasePassword, setDatabasePassword] = useState('')

    const databaseRegister = () => {
        let registerDatabase = {
            'userId':user.userId,
            'databaseName': databaseName,
            'databaseUsername': databaseUsername,
            'databasePassword': databasePassword,
        }
        axios.post('/database-service/api/databases', JSON.stringify(registerDatabase), {
            headers: {
                "Content-Type": `application/json`,
            }
        }).then((resp) => {
            alert("생성되었습니다.")
            navigate(`/database/${user.userId}`)
        }).catch((error) => {
            const errorMessage = error.response.data.errorMessage;
            const messageArray = Array.isArray(errorMessage) ? errorMessage : [errorMessage];
            setErrMessage(messageArray);
            if (error.response.status === 410) {
                alert("Please log in again.")
                dispatch(logout())
                navigate('/')
            }
        })
    }
    return (
        <>

            <div className="login-container">
                <form className="login-form">
                    <h3>Database Registration</h3>
                    <div className="form-group">
                        <label><h4>Database Name</h4></label>
                        <input type="text" autoComplete={"on"} onChange={e => {
                            setDatabaseName(e.target.value)
                        }} className="form-control" placeholder="Enter database name"/>
                        <div className="text-start gray mb-4">
                            Database name must be less than 6
                        </div>
                    </div>
                    <div className="form-group">
                        <label><h4>Database Username</h4></label>
                        <input type="text" autoComplete={"on"} onChange={e => {
                            setDatabaseUsername(e.target.value)
                        }} className="form-control" placeholder="Enter database username"/>
                        <div className="text-start gray mb-4 mt-0">
                            Database name must be less than 4
                        </div>
                    </div>
                    <div className="form-group">
                        <label><h4>Database user password</h4></label>
                        <input type="password" autoComplete="current-password" onChange={e => {
                            setDatabasePassword(e.target.value)
                        }} className="form-control" placeholder="Enter database user password"/>
                        <div className="text-start gray mb-4 mt-0">
                            Database password must be between 8
                        </div>
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
                            <button type="button" onClick={() => navigate(-1)}
                                    className="btn btn-primary login-button">Back
                            </button>
                        </Col>
                        <Col>
                            <button type="button" onClick={() => {
                                databaseRegister()
                            }}
                                    className="btn btn-primary login-button">Register
                            </button>
                        </Col>
                    </Row>
                </form>
            </div>
        </>
    );
}

export default DatabaseRegister