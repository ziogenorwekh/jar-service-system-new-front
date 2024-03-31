import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import axios from "axios";
import "../../css/info.css"
import {logout} from "../../store";
import {Button, Card, Col, Container, Modal, Row} from "react-bootstrap";


function DatabaseDetails() {
    let params = useParams();
    let dispatch = useDispatch()
    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [databasePort, setDatabasePort] = useState('')


    const [showDeleteModal, setShowDeleteModal] = useState(false); // 삭제 확인 모달 상태

    const [databaseDetails, setDatabaseDetails] = useState({
        accessUrl: '',
        databaseName: '',
        databaseUsername: '',
    })
    useEffect(() => {
        getDatabaseDetails()
    }, []);

    const getDatabaseDetails = () => {

        axios.get(`/database-service/api/databases/${params.id}`)
            .then(resp => {
                setDatabaseDetails(resp.data)
                setDatabasePort('3306')
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                if (error.response.status === 410) {
                    alert("Please log in again.")
                    dispatch(logout())
                    navigate('/')
                    return;
                }
                if (error.response.status === 404) {
                    setDatabaseDetails({
                        accessUrl: 'NONE',
                        databaseName: 'NONE',
                        databaseUsername: 'NONE',
                    });
                    setDatabasePort('NONE')
                }
            })
    }

    const deleteDatabase = () => {
        axios.delete(`/database-service/api/databases/${params.id}`)
            .then(resp => {
                alert('Database successfully deleted.');
                navigate(-1);
            })
            .catch(error => {
                console.error('Failed to delete database', error.response);
                alert('Failed to delete the database.');
            })
    }


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
                                    <Card.Header>Database Details(MYSQL)</Card.Header>
                                    <Card.Body>
                                        <Card.Text className="text-left-align label-title">Endpoint</Card.Text>
                                        <Card.Text className="text-left-align">{databaseDetails.accessUrl}</Card.Text>
                                        <Card.Text className="text-left-align label-title">Port</Card.Text>
                                        <Card.Text className="text-left-align">{databasePort}</Card.Text>
                                        <Card.Text className="text-left-align label-title">Database Name</Card.Text>
                                        <Card.Text
                                            className="text-left-align">{databaseDetails.databaseName}</Card.Text>
                                        <Card.Text className="text-left-align label-title">Username</Card.Text>
                                        <Card.Text
                                            className="text-left-align">{databaseDetails.databaseUsername}</Card.Text>
                                    </Card.Body>
                                    <Row className="justify-content-between p-3">
                                        <Col xs="auto">
                                            <Button variant="dark" onClick={() => navigate(-1)}>Back</Button>
                                        </Col>
                                        <Col xs="auto">
                                            <Button variant="danger" className="ml-2" onClick={() =>
                                                setShowDeleteModal(true)}>Delete Database</Button>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Confirm Database Deletion</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want to delete your Database? This action cannot be
                                undone.</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                                    Cancel
                                </Button>
                                <Button variant="danger" onClick={() => {
                                    deleteDatabase()
                                }}>
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

export default DatabaseDetails