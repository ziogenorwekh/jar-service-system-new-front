import {Button, Col, Form, Row} from "react-bootstrap";
import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {logout} from "../../store";
import {useDispatch} from "react-redux";

function SaveServerFile() {
    const [selectedFile, setSelectedFile] = useState(null);
    let params = useParams();
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.name.endsWith('.jar')) {
            setSelectedFile(file);
        } else {
            alert("Only .jar files are allowed!");
            setSelectedFile(null);
        }
    };

    const sendFile =  (event) => {
        if (event) event.preventDefault();
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            axios.post(
                `/storage-service/api/storages/${params.id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            ).then((resp) => {
                alert('successful upload.')
                navigate(-1)
            }).catch(error => {
                if (error.response.status === 410) {
                    alert("Please log in again.")
                    dispatch(logout())
                    navigate('/login')
                }
            });
        }
    };

    return (
        <>
            <div className="file-container">
                <form className="login-form">
                    <h3>Upload .jar file</h3>
                    <div className="form-group">
                        <label>jar file</label>
                        <Form.Control type="file" onChange={handleFileChange}/>
                    </div>
                    <Row>
                        <Col>
                            <Button onClick={()=>navigate(-1)}>Back</Button>
                        </Col>
                        <Col>
                            <Button onClick={(event) => sendFile(event)}>Upload</Button>
                        </Col>
                    </Row>
                </form>
            </div>
        </>
    );
}

export default SaveServerFile