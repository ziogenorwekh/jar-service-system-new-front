import {Col, Container, Image, Row} from "react-bootstrap";
import picture from "../structure.png"

function AppStructure() {


    return (
        <>
            <Container fluid>
                <Row className="my-4">
                    <Col className={"m-2 p-2"}>
                        <h3 className="text-start mb-3">웹 애플리케이션 구조</h3>
                        <div className="clearfix">
                            <Image src={picture} className="float-start mb-2 img-fluid" alt={"이미지 없음"}></Image>
                        </div>
                        <h4 className="text-start">프로젝트 구조 상세 설명</h4>
                        <p className="text-start">이 웹 애플리케이션은 클라우드 서버 리소스를 활용하여 사용자가 스프링 기반의 애플리케이션을 쉽게 배포하고 관리할 수 있도록
                            만들었습니다.</p>
                        <hr/>
                        <ul>
                            <li className="text-start">
                                <strong className="text-start">백엔드 서버(로컬 서버)</strong>
                                <ul>
                                    <li className="text-start">사용자의 요청을 처리하는 API 서버로, 온프레미스 형태의 서버이고,
                                        유저의 스프링 JAR 파일을 클라우드의 도커 서버에 배포하는
                                        서버 로직을 가지고 있습니다.
                                    </li>
                                    <li className="text-start">자신의 컨테이너의 CPU 사용량 및 Memory 사용량을 추적할 수 있고, 애플리케이션의 로그를 확인할
                                        수 있습니다.
                                    </li>
                                    <li className="text-start">유저의 요청에 따라 Amazon RDS에 데이터베이스와 유저의 계정을 생성 및 삭제할 수 있습니다.
                                    </li>
                                </ul>
                            </li>
                            <li className="text-start">
                                <strong className="text-start">프론트 엔드 서버(클라우드 서버)</strong>
                                <ul>
                                    <li className="text-start">
                                        <strong className="text-start">프론트엔드 서버</strong>: 사용자에게 UI를 제공합니다.
                                        클루우드 인스턴스를 대여한 가상 서버로, 백엔드 서버와는 API 게이트웨이만을 통해 통신하며, 사용자가
                                        원격 데이터베이스 생성 및 삭제, JAR 파일 업로드 등의 작업을 통해 애플리케이션을 배포할 수 있습니다.
                                    </li>
                                    <li className="text-start">
                                        <strong className="text-start">도커 제어 서버</strong>: 로컬 서버에서 받은 스프링 JAR 파일을 도커
                                        컨테이너로 배포하는 역할을 합니다.
                                    </li>
                                </ul>
                            </li>
                            <li className="text-start">
                                <strong className="text-start">클라우드 서비스</strong>
                                <ul>
                                    <li className="text-start">
                                        <strong className="text-start">Amazon S3</strong>: 파일 저장소로 사용되며, 사용자의 JAR 파일 등
                                        대용량 파일을 저장 및 관리합니다.
                                    </li>
                                    <li className="text-start">
                                        <strong className="text-start">Amazon RDS</strong>: 사용자가 직접 원격으로 접근 및 관리할 수 있는
                                        데이터베이스 서비스를 제공합니다. 백엔드
                                        서버는 사용자 대신 RDS에 데이터베이스와 사용자 계정을 생성 및 삭제하는 기능을 수행합니다.
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <hr/>
                        <h4 className="text-start">주요 기능 및 특징</h4>
                        <p className="text-start">- 사용자는 프론트엔드 서버를 통해 자신의 스프링 애플리케이션을 쉽게 클라우드에 배포할 수 있습니다.</p>
                        <p className="text-start">- 백엔드 서버는 사용자의 요청에 따라 Amazon RDS에 데이터베이스와 사용자 계정을 자동으로 생성 및 삭제할 수 있어,
                            사용자는 별도의 데이터베이스 관리 없이 원격 데이터베이스를 즉시 사용할 수 있습니다.</p>
                        <p className="text-start">- 이 구조는 사용자에게 배포에 있어 편리함을 제공하며, 클라우드와 로컬 리소스의 조합을 통해 높은 성능, 보안, 효과적인
                            서버 비용 절감을 얻습니다.</p>
                        <hr/>
                        <div className="text-start">
                            결론은 다음과 같습니다. 클라우드의 복잡한 배포 서비스를 사용자가 보다 쉽게 자신의 애플리케이션을 배포하고 관리할 수 있게 하는 동시에, 복잡한 데이터베이스 설정
                            없이 바로 원격 데이터베이스를 사용할 수 있는 편리성을 제공합니다.
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default AppStructure