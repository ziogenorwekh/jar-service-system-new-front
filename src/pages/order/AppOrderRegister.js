import {Col, Row, Alert} from "react-bootstrap";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {logout} from "../../store";
import {useDispatch} from "react-redux";
import "../../css/form.css"

function AppOrderRegister() {

    const [applicationName, setApplicationName] = useState('');
    const [serverPort, setServerPort] = useState(0);
    // const [javaVersion, setJavaVersion] = useState(0);
    const navigate = useNavigate();
    const [errMessage, setErrMessage] = useState([]);
    let dispatch = useDispatch();

    const [javaVersion, setJavaVersion] = useState('');
    const selectList = [
        {value: null, name: "Select Java version"},
        {value: "11", name: "Java 11"},
        {value: "12", name: "Java 12"},
        {value: "13", name: "Java 13"},
        {value: "14", name: "Java 14"},
        {value: "15", name: "Java 15"},
        {value: "16", name: "Java 16"},
        {value: "17", name: "Java 17"},
    ];
    const handleSelect = (e) => {
        setJavaVersion(e.target.value);
    };
    const appOrderRegister = () => {
        let registerAppOrder = {
            'applicationName': applicationName,
            'serverPort': serverPort,
            'javaVersion': javaVersion,
        }
        axios.post('/apporder-service/api/apporders', JSON.stringify(registerAppOrder), {
            headers: {
                "Content-Type": `application/json`,
            }
        }).then((resp) => {
            let apporderId = resp.data.appOrderId;
            navigate(`/application/${apporderId}`)
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
                    <h3>Application registration</h3>
                    <div className="form-group">
                        <label><h4>Application Name</h4></label>
                        <input type="text" autoComplete={"on"} onChange={e => {
                            setApplicationName(e.target.value)
                        }} className="form-control" placeholder="Enter application name"/>
                        <div className="text-start gray mb-4">
                            Application name must be less than 4
                        </div>
                    </div>
                    <div className="form-group">
                        <label><h4>Application Server Port</h4></label>
                        <input type="number" autoComplete={"on"} onChange={e => {
                            setServerPort(e.target.value);
                        }} className="form-control" placeholder="Enter server port"/>
                        <div className="text-start gray mb-4 mt-0">
                            Server port only can use between 10000 ~ 50000.
                        </div>
                    </div>
                    <div className="form-group">
                        <label><h4>Java Version</h4></label>
                        <select className={"form-control"} onChange={handleSelect} value={javaVersion}>
                            {selectList.map((item) => {
                                return (
                                    <option value={item.value} key={item.value}>
                                        {item.name}
                                    </option>
                            )
                            })}
                        </select>
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
                            <button type="button" onClick={() => navigate('/')}
                                    className="btn btn-primary login-button">Back
                            </button>
                        </Col>
                        <Col>
                            <button type="button" onClick={() => {
                                appOrderRegister()
                            }} className="btn btn-primary login-button">Register
                            </button>
                        </Col>
                    </Row>
                </form>
            </div>

        </>
    );
}

export default AppOrderRegister