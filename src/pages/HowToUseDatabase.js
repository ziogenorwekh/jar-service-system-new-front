import "../css/form.css"
import {Alert, Button, Col, Image, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import picture from "../databaseMenuClick.png";
import picture2 from "../completedatabase.png";
import Joyride from "react-joyride";

function HowToUseDatabase() {


    const [startJoyride, setStartJoyride] = useState(false);

    useEffect(() => {
        // 페이지가 렌더링될 때 Joyride를 시작합니다.
        setStartJoyride(true);
    }, []);
    const [steps] = useState([
        {
            disableBeacon: true,
            target: '.image-explain',
            content: '1. 로그인 후, Menu 버튼의 Database Create를 선택합니다.',
            placement: "top",
        },
        {
            target: '.joy-databaseName',
            content: '2. 데이터베이스 이름을 설정합니다.',
            placement: "right",
        },
        {
            target: '.joy-databaseUsername',
            content: '3. 데이터베이스 유저 이름을 설정합니다.',
            placement: "right",

        },
        {
            target: '.joy-databasePwd',
            content: '4. 데이터베이스로 접근할 유저의 비밀번호를 생성합니다.',
            placement: "right",
        },
        {
            target: '.joy-register',
            content: '5. 제약조건에 부합하게 작성했다면 등록을 눌러주세요.',
            placement: "right",
        },
        {
            target: '.image-details',
            content: '6. 데이터베이스 정보란에서 엔드포인트와 포트를 확인할 수 있습니다.',
            placement: "bottom",
        },
    ])

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className={"text-start"}>
                        <h4>1. Menu 버튼에서 Database Create를 클릭합니다.</h4>
                        <div className={"text-gray"}>Home</div>
                    </div>
                    <div className="col">
                        <div className="clearfix">
                            <Image src={picture} className="float-start image-explain" alt="이미지 없음"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className={"text-start"}>
                    <h4>2. 제시된 제약사항에 맞게 폼을 작성합니다.</h4>
                    <div className={"text-gray"}>Menu -> Database Create</div>
                </div>
                <form className="login-form">
                    <h3>Database Registration</h3>
                    <div className="form-group">
                        <label><h4>Database Name</h4></label>
                        <input id={"joy-databaseName"} type="text" className="joy-databaseName form-control"
                               placeholder="Enter database name"/>
                        <div className="text-start gray mb-4">
                            Database name must be less than 6
                        </div>
                    </div>
                    <div className="form-group">
                        <label><h4>Database Username</h4></label>
                        <input id={"joy-databaseUsername"} type="text" className="joy-databaseUsername form-control"
                               placeholder="Enter database username"/>
                        <div className="text-start gray mb-4 mt-0">
                            Database name must be less than 4
                        </div>
                    </div>
                    <div className="form-group">
                        <label><h4>Database user password</h4></label>
                        <input id={"joy-databasePwd"} type="password" className="joy-databasePwd form-control"
                               placeholder="Enter database user password"/>
                        <div className="text-start gray mb-4 mt-0">
                            Database password must be between 8
                        </div>
                    </div>
                    <div className="error-messages-container">
                    </div>
                    <Row>
                        <Col>
                            <Button variant={"dark"} disabled>Back</Button>
                        </Col>
                        <Col>
                            <Button variant={"dark"} className={"joy-register"} disabled>Register</Button>
                        </Col>
                    </Row>
                </form>
            </div>
            <div className="container">
                <div className={"text-start mt-2 mb-0"}>
                    <h4>1. 폼 작성 후, 등록이 완료된다면 내 데이터베이스 정보 페이지에서 엔드포인트를 확인할 수 있습니다.</h4>
                    <div className={"text-gray"}>Menu -> Information</div>
                </div>
                <div className="row">
                    <div className={"text-start"}>
                    </div>
                    <div className="col">
                        <div className="clearfix">
                            <Image src={picture2} className="float-start image-details" alt="이미지 없음"/>
                        </div>
                    </div>
                </div>
            </div>
            <Joyride steps={steps} run={startJoyride}
                     showOverlay={false}
                     spotlightClicks showProgress showSkipButton continuous scrollToFirstStep disableScrolling/>
        </>
    )
}

export default HowToUseDatabase