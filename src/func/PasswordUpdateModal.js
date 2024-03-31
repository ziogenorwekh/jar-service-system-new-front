import React, {useState} from "react";
import {Modal, Button, Form, Alert} from "react-bootstrap";
import axios from "axios";
import "../css/info.css"
import {logout} from "../store";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

function PasswordUpdateModal({userId}) {
    const [show, setShow] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [errMessage, setErrMessage] = useState([]);
    let dispatch = useDispatch();
    let navigate= useNavigate();
    const handleClose = () => {
        setShow(false);
        setErrMessage([]); // 모달 닫힐 때 에러 메시지 초기화
    };
    const handleShow = () => setShow(true);

    const handlePasswordChange = async () => {
        await axios.put(`/user-service/api/users/${userId}`, {
            currentPassword,
            newPassword
        })
            .then(resp => {
                alert("successful change password.")
                setCurrentPassword('')
                setNewPassword('')
                handleClose();
            })
            .catch(error => {
                if (error.response.status === 410) {
                    alert("Please log in again.")
                    dispatch(logout())
                    navigate('/login')
                }
                const errorMessage = error.response.data.errorMessage;
                const messageArray = Array.isArray(errorMessage) ? errorMessage : [errorMessage];
                setErrMessage(messageArray);
            });
    };

    return (
        <>
            <Button className="margin-left" variant="dark" onClick={handleShow}>
                Change Password
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formCurrentPassword">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter current password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formNewPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </Form.Group>
                        {
                            errMessage.map(msg => {
                                return (
                                    <Alert className={"alert-danger"}>{msg}</Alert>
                                )
                            })
                        }
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="dark" onClick={handlePasswordChange}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PasswordUpdateModal;