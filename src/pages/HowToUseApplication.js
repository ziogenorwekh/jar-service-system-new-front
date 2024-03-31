import {Alert, Badge, Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import "../css/form.css"
import {BsArrowRepeat} from "react-icons/bs";
import "../css/container.css"
import CustomPieChart from "../func/CustomPieChart";
import picture from "../containerLogs.png";
import Joyride from "react-joyride";
function HowToUseApplication() {

    const [containerDetails] = useState({
        applicationName: 'exampleProject',
        dockerContainerId: '',
        cpuUsage: '3.2%',
        memoryUsage: '17.4%',
    });

    const [startJoyride, setStartJoyride] = useState(false);

    useEffect(() => {
        // 페이지가 렌더링될 때 Joyride를 시작합니다.
        setStartJoyride(true);
    }, []);

    const [steps] = useState([
        {
            disableBeacon: true,
            target: '.joy-application-name',
            content: '1. 애플리케이션 프로젝트 이름을 소문자로 적어주세요.',
            placement: "right",
        },
        {
            target: '.joy-application-server-port',
            content: '2. 애플리케이션이 사용할 포트를 입력해주세요.(서버 설정파일의 port번호)',
            placement: "right",
        },
        {
            target: '.joy-java-version',
            content: '3. 애플리케이션이 사용하는 자바 버전을 입력해주세요.',
            placement: "right",

        },
        {
            target: '.joy-application-register',
            content: '4. 제약사항에 맞춰 입력했다면 등록을 눌러주세요.',
            placement: "right",
        },
        {
            target: '.joy-application-details',
            content: '5. 등록이 완료되면 등록 세부사항으로 진입합니다.',
            placement: "right",
        },
        {
            target: '.joy-upload-jar-file',
            content: '6. 처음 등록이 완료되면, PENDING 상태를 확인할 수 있으며, 자바 파일을 업로드해주세요.',
            placement: "right",
        },
        {
            target: '.joy-upload-only-jar-file',
            content: '7. jar파일이 아니면 등록이 안되므로 유의해주세요.',
            placement: "right",
        },
        {
            target: '.joy-wait-containerizing',
            content: '8. 컨테이너화가 시작되고 잠시 기다려주세요. 2분정도 소요됩니다.',
            placement: "top",
        },
        {
            target: '.joy-cpu-pie-chart',
            content: '9. cpu 사용량 비율을 알 수 있습니다.(vCPU 1코어 기준)',
            placement: "right",
        },
        {
            target: '.joy-memory-pie-chart',
            content: '10. 메모리 사용 비율을 알 수 있습니다.(컨테이너 당 512MB 할당)',
            placement: "right",
        },
        {
            target: '.joy-view-logs',
            content: '11. 로그 보기 버튼을 누르면 컨테이너의 로그 상태를 확인할 수 있습니다.',
            placement: "top",
        },
        {
            target: '.joy-container-logs',
            content: '12. 다음 사진과 같이 프로젝트의 컨테이너 로그를 확인할 수 있습니다.',
            placement: "right",
        },
    ])

    return (
        <>
            <div className="container">
                <div className={"text-start"}>
                    <h4>1. Menu 버튼에서 Database Create를 클릭합니다.</h4>
                    <div className={"text-gray"}>Home</div>
                </div>
                <form className="login-form">
                    <h3>Application registration</h3>
                    <div className="form-group">
                        <label><h4>Application Name</h4></label>
                        <input type="text" className="form-control joy-application-name" placeholder="Enter application name"/>
                        <div className="text-start gray mb-4">
                            Application name must be less than 4
                        </div>
                    </div>
                    <div className="form-group">
                        <label><h4>Application Server Port</h4></label>
                        <input type="number" className="form-control joy-application-server-port" placeholder="Enter server port"/>
                        <div className="text-start gray mb-4 mt-0">
                            Server port only can use between 10000 ~ 30000.
                        </div>
                    </div>
                    <div className="form-group">
                        <label><h4>Java Version</h4></label>
                        <input type="number" className="form-control joy-java-version" placeholder="Enter java version"/>
                    </div>
                    <Row>
                        <Col>
                            <Button variant={"dark"} disabled>Back</Button>
                        </Col>
                        <Col>
                            <Button variant={"dark"} disabled className={"joy-application-register"}>Register</Button>
                        </Col>
                    </Row>
                </form>
            </div>
            <div className={"container mt-3"}>
                <div className={"text-start"}>
                    <h4>2. 애플리케이션 정보를 입력했다면, PENDING에 초록불이 들어올 것이며, Upload server file을 통해서
                        <br/>자바 웹 애플리케이션 파일(.jar)을 등록합니다.
                    </h4>
                    <div className={"text-gray"}>Menu -> Lists -> 등록한 애플리케이션</div>
                </div>
                <div className={"apporder-details-exp joy-application-details"}>
                    <div className="apporder-list-header d-flex justify-content-between align-items-center">
                        <div className="title">유저 애플리케이션 이름</div>
                        <Button variant="dark" disabled>
                            <BsArrowRepeat/> Reload Data
                        </Button>
                    </div>
                    <div className={"info"}>Application Status</div>
                    <div className={"apporder-column"}>유저 애플리케이션 진행 상태</div>
                    <div className={"info"}>Error Status</div>
                    <div className={"error"}>유저 애플리케이션의 에러 상태</div>
                    <div className={"info"}>EndPoint Url</div>
                    <div className={"apporder-column"}>유저 애플리케이션의 EndPoint</div>
                    <div className={"info"}>Container Id</div>
                    <div className={"apporder-column"}>유저 애플리케이션이 컨테이너 ID</div>
                    <div className={"info"}>Server Port</div>
                    <div className={"apporder-column"}>유저의 서버 포트</div>
                    <div className={"info"}>Java Version</div>
                    <div className={"apporder-column"}>유저의 자바 버전</div>
                    <Row className="justify-content-between mt-2">
                        {/* 왼쪽 끝에 "Back" 버튼 추가 */}
                        <Col xs="auto">
                            <Button variant="dark" disabled className="m-left">Back</Button>
                            <Button variant="dark" disabled>Delete</Button>
                        </Col>
                        {/* 나머지 버튼들은 오른쪽 끝에 위치 */}
                        <Col>
                        </Col>
                        {/* 조건부 렌더링으로 "Container Details" 버튼 표시 */}
                        <Col xs="auto">
                            <Button variant="dark" className="m-left joy-upload-jar-file"
                                    disabled>
                                Upload Server File</Button>
                            <Button variant="dark" disabled>
                                Container Details</Button>
                        </Col>
                    </Row>
                </div>
                <Row>
                    <div className="status-indicator mt-5">
                        <div className="arrow-and-description">
                            <div className="text-start status-description">Application status or description of next
                                steps
                            </div>
                        </div>
                        <div className="m-0 status-circle active pending">PENDING</div>
                        <div className="col-1 arrow">-></div>
                        <div className="m-0 status-circle active">SAVED</div>
                        <div className="col-1 arrow">-></div>
                        <div className="m-0 status-circle active">CONTAINERING</div>
                        <div className="col-1 arrow">-></div>
                        <div className="status-circle active">COMPLETE</div>
                    </div>
                </Row>
            </div>
            <div className="container">
                <div className={"text-start"}>
                    <h4>3. 파일을 등록합니다.</h4>
                    <div className={"text-gray"}>Menu -> Lists -> 등록한 애플리케이션 -> Upload Server File</div>
                </div>
                <form className="login-form">
                    <h3>Upload .jar file</h3>
                    <div className="form-group">
                        <label>jar file</label>
                        <Form.Control type="file" disabled className={"joy-upload-only-jar-file"}/>
                    </div>
                    <Row>
                        <Col>
                            <Button variant={"dark"} disabled>Back</Button>
                        </Col>
                        <Col>
                            <Button variant={"dark"} disabled>Upload</Button>
                        </Col>
                    </Row>
                </form>
            </div>
            <div className={"container text-start mt-2"}>
                <h4>4. 파일이 정상적으로 등록되면 서버에서 컨테이너화를 시작합니다.</h4>
                <div className={"text-gray"}>Menu -> Lists -> 등록한 애플리케이션(정보가 제대로 표시되지 않는다면 Reload Data 클릭)</div>
            </div>
            <div className="status-indicator mt-5">
                <div className="arrow-and-description">
                    <div className="text-start status-description">Application Containering...
                    </div>
                </div>
                <div className="m-0 status-circle active">PENDING</div>
                <div className="col-1 arrow">-></div>
                <div className="m-0 status-circle active">SAVED</div>
                <div className="col-1 arrow">-></div>
                <div className="m-0 status-circle active containerizing joy-wait-containerizing">CONTAINERING</div>
                <div className="col-1 arrow">-></div>
                <div className="status-circle active">COMPLETE</div>
            </div>
            <div className={"container text-start mt-2"}>
                <h4>5. 완료 시, Container Details를 선택해서 컨테이너 상태를 확인하세요.</h4>
                <div className={"text-gray"}>Menu -> Lists -> 등록한 애플리케이션(정보가 제대로 표시되지 않는다면 Reload Data 클릭)</div>
            </div>
            <Container>
                <Row className="mt-2">
                    <Col>
                        <Card>
                            <Card.Header className={""}>Container Details</Card.Header>
                            <Card.Body>
                                <Card.Title
                                    className={"text-info-emphasis"}>{containerDetails.applicationName}</Card.Title>
                                <Card.Text className="d-flex justify-content-center label-title mb-0">CPU
                                    Usage</Card.Text>
                                <Card.Text
                                    className="d-flex justify-content-center mb-0">{containerDetails.cpuUsage}</Card.Text>
                                <div className="d-flex justify-content-center my-3 mt-0 mb-0 joy-cpu-pie-chart">
                                    <CustomPieChart memoryUsage={containerDetails.cpuUsage}/>
                                </div>
                                <Card.Text className="d-flex justify-content-center label-title mb-0">Memory
                                    Usage</Card.Text>
                                <Card.Text className="d-flex justify-content-center label-title mb-0">Allocated :
                                    512MB</Card.Text>
                                <Card.Text
                                    className="d-flex justify-content-center mb-0">{containerDetails.memoryUsage}</Card.Text>
                                <div className="d-flex justify-content-center my-3 mt-0 mb-0 joy-memory-pie-chart">
                                    <CustomPieChart memoryUsage={containerDetails.memoryUsage}/>
                                </div>
                                <Card.Text>Container Status: <Badge bg="success">Started</Badge></Card.Text>
                                <Button variant="dark" disabled>Back</Button>{' '}
                                <Button variant="success" disabled>Start</Button>{' '}
                                <Button variant="danger" disabled>Stop</Button>{' '}
                                <Button variant="info" disabled className={"joy-view-logs"}>View Logs</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>

                    </Col>
                </Row>
            </Container>
            <div className={"container text-start mt-2"}>
                <h4>6. 완료 시, View Logs를 통해서 컨테이너의 상태정보를 확인할 수 있습니다.</h4>
                <div className={"text-gray"}>Menu -> Lists -> Container Details -> View logs</div>
                <Image src={picture} className="float-start mb-2 joy-container-logs" alt={"이미지 없음"}></Image>
            </div>
            <Joyride steps={steps} run={startJoyride}
                     showOverlay={false}
                     spotlightClicks showProgress showSkipButton continuous scrollToFirstStep scrollToSteps disableScrolling/>
        </>
    )
}

export default HowToUseApplication