import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {logout} from "../../store";
import {useDispatch} from "react-redux";
import {Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import "../../css/info.css"
import PasswordUpdateModal from "../../func/PasswordUpdateModal";

function UserInformation() {

    let params = useParams();
    let dispatch = useDispatch()
    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [showPasswordModal, setShowPasswordModal] = useState(false); // 모달 상태


    const [userDetails, setUserDetails] = useState({
        email: '',
        username: '',
    })
    const getUserDetails = () => {
        axios.get(`/user-service/api/users/${params.id}`)
            .then(resp => {
                setUserDetails(resp.data)
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                if (error.response.status === 410) {
                    alert("Please log in again.")
                    dispatch(logout())
                    navigate('/login')
                }
            })
    }

    useEffect(() => {
        getUserDetails()
    }, []);

    const [showDeleteModal, setShowDeleteModal] = useState(false); // 삭제 확인 모달 상태

    const handleDeleteAccount = () => {
        axios.delete(`/user-service/api/users/${params.id}`, {
        })
            .then(() => {
                alert('Account successfully deleted.');
                dispatch(logout());
                navigate('/');
            })
            .catch(error => {
                console.error('Failed to delete account', error);
                alert('Failed to delete the account.');
            });
    };

    return (
        <>
            {
                isLoading ? (
                    <p className='loading'>Loading...</p>
                ) : (
                    <Container>
                        <Row className="justify-content-center mt-5">
                            <Col md={6}>
                                <Card>
                                    <Card.Header>User Details</Card.Header>
                                    <Card.Body>
                                        <Card.Text className="text-left-align label-title">Email</Card.Text>
                                        <Card.Text className="text-left-align">{userDetails.email}</Card.Text>
                                        <Card.Text className="text-left-align label-title">Username</Card.Text>
                                        <Card.Text className="text-left-align">{userDetails.username}</Card.Text>
                                    </Card.Body>
                                    <Row className="justify-content-between p-3">
                                        <Col xs="auto">
                                            <Button variant="dark" onClick={() => navigate(-1)}>Back</Button>
                                            <PasswordUpdateModal show={showPasswordModal}
                                                                 onHide={() => setShowPasswordModal(false)}
                                                                 userId={params.id}/>
                                        </Col>
                                        <Col xs="auto">
                                            <Button variant="danger" className="ml-2"
                                                    onClick={() => setShowDeleteModal(true)}>Delete Account</Button>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Confirm Account Deletion</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want to delete your account? This action cannot be
                                undone.</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                                    Cancel
                                </Button>
                                <Button variant="danger" onClick={handleDeleteAccount}>
                                    Delete
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Container>
                )
            }
        </>
    )
}

export default UserInformation