import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Col, Modal, Row} from "react-bootstrap";
import "../../css/board.css"
import {logout} from "../../store";
import {useDispatch} from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BsArrowRepeat} from "react-icons/bs";

function AppOrderDetails() {

    let params = useParams();
    const [applicationDetails, setApplicationDetails] = useState({
        applicationName: '',
        appOrderStatus: '',
        endPoint: '',
        serverPort: '',
        javaVersion: '',
        error: '',
        containerId: '',
        appOrderId: ''
    })
    const [isLoading, setIsLoading] = useState(true);
    let navigate = useNavigate();
    const [desc, setDesc] = useState('')
    const statusDescriptions = (data, result) => {
        // eslint-disable-next-line default-case
        switch (data) {
            case 'PENDING':
                setDesc("Upload your jar file")
                break
            case 'SAVED':
                setDesc("App info and file are containerizing...")
                break
            case 'CONTAINERIZING':
                setDesc("Application Containerizing...")
                break
            case 'COMPLETE':
                setDesc("Complete your application")
                break
            case 'FAILED':
                setDesc("FAILED")
                break
        }
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let dispatch = useDispatch();

    const deleteAppOrder = () => {
        axios.delete(`/apporder-service/api/apporders/${applicationDetails.appOrderId}`)
            .then(resp => {
                alert("deleted")
                navigate('/application/list')
            })
            .catch(error => {
                if (error.response.status === 410) {
                    alert("Please log in again.")
                    dispatch(logout())
                    navigate('/login')
                }
            })
    }

    const getStatusClass = (status) => {
        return "status-circle " + (status === applicationDetails.appOrderStatus ? "active " + status.toLowerCase() : "");
    };


    const getDetails = async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        await axios.get(`/apporder-service/api/apporders/${params.id}`)
            .then(resp => {
                setApplicationDetails(resp.data);
                setIsLoading(false);
                statusDescriptions(resp.data.appOrderStatus, resp.data.error)
                return resp.data;
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
        getDetails()
    }, [desc]);

    return (
        <>
            {
                isLoading ? (
                    <p className='loading'>Loading...</p>
                ) : (
                    <div>
                        <div className={"apporder-list"}>
                            <div className="apporder-list-header d-flex justify-content-between align-items-center">
                                <div className="title">{applicationDetails.applicationName}</div>
                                <Button variant="dark" onClick={getDetails}>
                                    <BsArrowRepeat/> Reload Data
                                </Button>
                            </div>
                            <div className={"info"}>Application Status</div>
                            <div className={"apporder-column"}>{applicationDetails.appOrderStatus}</div>
                            <div className={"info"}>Error Status</div>
                            {
                                applicationDetails.error === '' ?
                                    <div className={"apporder-column"}>에러 없음</div>
                                    : <div className={"error"}>{applicationDetails.error}</div>
                            }
                            <div className={"info"}>EndPoint Url</div>
                            <div className={"href-click"} onClick={() => window.open(applicationDetails.endPoint)}
                            >{applicationDetails.endPoint}</div>
                            <div className={"info"}>Container Id</div>
                            <div className={"apporder-column"}>{applicationDetails.containerId}</div>
                            <div className={"info"}>Server Port</div>
                            <div className={"apporder-column"}>{applicationDetails.serverPort}</div>
                            <div className={"info"}>Java Version</div>
                            <div className={"apporder-column"}>{applicationDetails.javaVersion}</div>
                            <Row className="justify-content-between mt-2">
                                {/* 왼쪽 끝에 "Back" 버튼 추가 */}
                                <Col xs="auto">
                                    <Button variant="dark" className="m-left" onClick={() => navigate(-1)}>Back</Button>
                                    <Button variant="dark" onClick={() => handleShow()}>Delete</Button>
                                </Col>
                                {/* 나머지 버튼들은 오른쪽 끝에 위치 */}
                                <Col>
                                </Col>

                                {/* 조건부 렌더링으로 "Container Details" 버튼 표시 */}
                                <Col xs="auto">
                                    {
                                        applicationDetails.appOrderStatus === 'FAILED' ?
                                            <Button variant="dark" className="m-left" disabled>Upload Server
                                                File</Button>
                                            :
                                            <Button variant="dark" className="m-left"
                                                    onClick={() =>
                                                        navigate(`/application/file/upload/${applicationDetails.appOrderId}`)}>
                                                Upload Server File</Button>
                                    }
                                    {
                                        applicationDetails.appOrderStatus === 'COMPLETE' ?
                                            <Button variant="dark" onClick={() =>
                                                navigate(`/application/container/${applicationDetails.containerId}`)}>
                                                Container Details</Button>
                                            :
                                            <Button variant="dark" disabled>Container Details</Button>
                                    }
                                </Col>
                            </Row>
                        </div>
                        <Row>
                            <div className="status-indicator mt-5">
                                <div className="arrow-and-description">
                                    <div className="status-description">{desc}</div>
                                </div>
                                <div className={getStatusClass('PENDING')}>PENDING</div>
                                <div className="arrow">-></div>
                                <div className={getStatusClass('SAVED')}>SAVED</div>
                                <div className="arrow">-></div>
                                <div className={getStatusClass('CONTAINERIZING')}>CONTAINERING</div>
                                <div className="arrow">-></div>
                                <div className={getStatusClass('COMPLETE')}>COMPLETE</div>
                            </div>
                        </Row>
                        <Row className="justify-content-center">
                            <Col md={12} className="d-flex justify-content-center">
                                <div className="failed-description">
                                    {applicationDetails.appOrderStatus === 'FAILED' &&
                                        <div className={getStatusClass('FAILED')}>FAILED</div>
                                    }
                                </div>
                            </Col>
                        </Row>
                    </div>
                )
            }


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Alert!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Delete your application?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="dark" onClick={deleteAppOrder}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default AppOrderDetails