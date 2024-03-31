import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Button, Card, Container, Row, Col, Badge} from "react-bootstrap";
import "../../css/container.css"
import Convert from 'ansi-to-html';
import CustomPieChart from "../../func/CustomPieChart";
import {logout} from "../../store";
import {useDispatch} from "react-redux";
function ContainerDetails() {
    let params = useParams();
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    const [containerDetails, setContainerDetails] = useState({
        containerStatus: '',
        applicationName: '',
        dockerContainerId: '',
        cpuUsage: '',
        memoryUsage: '',
        logs: '',
    });

    // containerLogs 상태를 문자열로 초기화
    const [containerLogs, setContainerLogs] = useState('');

    useEffect(() => {
        getContainerDetails();
    }, []);

    const getContainerDetails = () => {
        axios.get(`/container-service/api/containers/${params.id}`)
            .then(resp => {
                setContainerDetails(resp.data);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                if (error.response.status === 410) {
                    alert("Please log in again.")
                    dispatch(logout())
                    navigate('/login')
                }
            });
    };

    const handleStartStop = async (action) => {
        await axios.put(`/container-service/api/containers/${action}/${params.id}`)
            .then(() => {
                alert(`Container ${action}ed successfully`);
                getContainerDetails();
            })
            .catch((error) => {
                alert(`Failed to ${action} the container`);
                if (error.response.status === 410) {
                    alert("Please log in again.")
                    dispatch(logout())
                    navigate('/login')
                }
            });
    };


    const getStatusBadge = (status) => {
        switch (status) {
            case 'STARTED':
                return <Badge bg="success">Started</Badge>;
            case 'STOPPED':
                return <Badge bg="danger">Stopped</Badge>;
            case 'INITIALIZED':
                return <Badge bg="primary">INITIALIZED</Badge>;
            case 'DELETED':
                return <Badge bg="dark">DELETED</Badge>;
            case 'REJECTED':
                return <Badge bg="danger">REJECTED</Badge>;
            default:
                return <Badge bg="secondary">Unknown</Badge>;
        }
    };

    const convert = new Convert({
        fg: '#ffffff', // 기본 전경색
        bg: '#ffffff', // 기본 배경색
        newline: false, // 개행 문자를 <br/>로 변환할지 여부
        escapeXML: false, // HTML 엔티티를 이스케이프할지 여부
        stream: true, // ANSI 코드가 여러 개의 메시지에 걸쳐있을 때 사용
    });


    const html = convert.toHtml(containerLogs);

    const [showLogs, setShowLogs] = useState(false);
    const handleViewLogs = () => {
        axios.get(`/container-service/api/containers/logs/${params.id}`)
            .then(resp => {
                setContainerLogs(resp.data.logs);
            })
            .catch((error) => {
                alert('Failed to fetch logs');
                if (error.response.status === 410) {
                    alert("Please log in again.")
                    dispatch(logout())
                    navigate('/login')
                }
            });
        setShowLogs(true)
    };

    const handleCloseLogs = () => {
        setShowLogs(false);
    };


    return (
        <>
        {
            isLoading ? (
                <p className='loading'>Loading...</p>
            ) : (

                <Container>
                    <Row className="mt-2">
                        <Col>
                            <Card>
                                <Card.Header className={""}>Container Details</Card.Header>
                                <Card.Body>
                                    <Card.Title className={"text-info-emphasis"}>{containerDetails.applicationName}</Card.Title>
                                    <Card.Text className="d-flex justify-content-center label-title mb-0">CPU Usage</Card.Text>
                                    <Card.Text className="d-flex justify-content-center mb-0">{containerDetails.cpuUsage}</Card.Text>
                                    <div className="d-flex justify-content-center my-3 mt-0 mb-0">
                                        <CustomPieChart memoryUsage={containerDetails.cpuUsage} />
                                    </div>
                                    <Card.Text className="d-flex justify-content-center label-title mb-0">Memory Usage</Card.Text>
                                    <Card.Text className="d-flex justify-content-center label-title mb-0">Allocated : 512MB</Card.Text>
                                    <Card.Text className="d-flex justify-content-center mb-0">{containerDetails.memoryUsage}</Card.Text>
                                    <div className="d-flex justify-content-center my-3 mt-0 mb-0">
                                        <CustomPieChart memoryUsage={containerDetails.memoryUsage} />
                                    </div>
                                    <Card.Text>Container Status: {getStatusBadge(containerDetails.containerStatus)}</Card.Text>
                                    <Button variant="dark" onClick={() => navigate(-1)}>Back</Button>{' '}
                                    <Button variant="success" onClick={() => handleStartStop('start')}>Start</Button>{' '}
                                    <Button variant="danger" onClick={() => handleStartStop('stop')}>Stop</Button>{' '}
                                    <Button variant="info" onClick={handleViewLogs}>View Logs</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            {showLogs && (
                                <Col>
                                    <Card>
                                        <Card.Header className="d-flex justify-content-between align-items-center m-0">
                                            <div>Container Logs</div>
                                            <Button variant="dark" onClick={handleCloseLogs}>Close</Button>
                                        </Card.Header>
                                        <Card.Body>
                                            <div className="log-container" dangerouslySetInnerHTML={{__html: html}}/>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )}
                        </Col>
                    </Row>
                </Container>
            )
        }
        </>
    );
}

export default ContainerDetails;