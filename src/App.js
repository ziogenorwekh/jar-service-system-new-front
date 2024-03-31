import './App.css';
import {Route, Routes, useNavigate} from 'react-router-dom';
import Home from "./pages/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./pages/user/Login";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import Join from "./pages/user/Join";
import AppOrderRegister from "./pages/order/AppOrderRegister";
import EmailVerify from "./pages/user/EmailVerify";
import SaveServerFile from "./pages/order/SaveServerFile";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {logout} from "./store";
import AppOrderLists from "./pages/order/AppOrderLists";
import AppOrderDetails from "./pages/order/AppOrderDetails";
import ContainerDetails from "./pages/container/ContainerDetails";
import UserInformation from "./pages/user/UserInformation";
import ResetPassword from "./pages/user/ResetPassword";
import DatabaseRegister from "./pages/database/DatabaseRegister";
import DatabaseDetails from "./pages/database/DatabaseDetails";
import AppStructure from "./pages/AppStructure";
import HowToUse from "./pages/HowToUse";
import HowToUseDatabase from "./pages/HowToUseDatabase";
import axios from "axios";

function App() {

    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    let dispatch = useDispatch();

    useEffect(() => {
    }, []);
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };


    return (
            <div className="App">
                <Navbar bg="dark" variant="dark" sticky={'top'} fixed={"top"}>
                    <Container fluid>
                        <Navbar.Brand className={"App-name"}
                                      onClick={() => navigate('/')}>ContainerSpringPlatform</Navbar.Brand>

                        <Nav className="me-auto">
                            <Nav.Link onClick={() => navigate('/structure')}>App Structure</Nav.Link>
                            <Nav.Link onClick={() => navigate('/how')}>How to Use</Nav.Link>
                            {user.email ? (
                                <>
                                    <NavDropdown
                                        menuVariant="info"
                                        title="Menu" id="joy-webMenu">
                                        <NavDropdown.Item id={"joy-databaseCreate"}
                                                          onClick={() => navigate('/database/create')}>Database
                                            Create</NavDropdown.Item>
                                        <NavDropdown.Item
                                            onClick={() => navigate(`/database/${user.userId}`)}>Information</NavDropdown.Item>
                                        <NavDropdown.Divider/>
                                        <NavDropdown.Item
                                            onClick={() => navigate('/application/create')}>Application
                                            Create</NavDropdown.Item>
                                        <NavDropdown.Item
                                            onClick={() => navigate(`/application/list`)}>Lists</NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            ) : (
                                <></>
                            )}
                        </Nav>
                        <Nav>
                            {
                                user.email ? (

                                    <NavDropdown
                                        id="nav-dropdown-dark-example"
                                        title={user.email}
                                        align={"end"}
                                        menuVariant="dark"
                                    >
                                        <NavDropdown.Item onClick={() => navigate(`/user/${user.userId}`)}>
                                            User Information
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            onClick={() => {
                                                handleLogout()
                                            }}
                                        >
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                ) : (
                                    <Nav.Link
                                        style={{color: '#afafaf', padding: '0.5em'}}
                                        onClick={() => navigate('/login')}
                                    >
                                        Login
                                    </Nav.Link>
                                )
                            }
                        </Nav>
                    </Container>
                </Navbar>

                <Routes>
                    <Route path={'/'} element={<Home/>}></Route>
                    <Route path={'/structure'} element={<AppStructure/>}></Route>
                    <Route path={'/how'} element={<HowToUse/>}></Route>
                    <Route path={'/how/database'} element={<HowToUseDatabase/>}></Route>

                    <Route path={'/login'} element={<Login/>}></Route>
                    <Route path={'/join'} element={<Join/>}></Route>

                    <Route path={'/verify/mail'} element={<EmailVerify/>}></Route>
                    <Route path={'/user/:id'} element={<UserInformation/>}></Route>
                    <Route path={'/reset/password'} element={<ResetPassword/>}></Route>

                    <Route path={'/database/create'} element={<DatabaseRegister/>}></Route>
                    <Route path={'/database/:id'} element={<DatabaseDetails/>}></Route>

                    <Route path={'/application/create'} element={<AppOrderRegister/>}></Route>
                    <Route path={'/application/:id'} element={<AppOrderDetails/>}></Route>
                    <Route path={'/application/list'} element={<AppOrderLists/>}></Route>

                    <Route path={'/application/container/:id'} element={<ContainerDetails/>}></Route>

                    <Route path={'/application/file/upload/:id'} element={<SaveServerFile/>}></Route>
                </Routes>
            </div>
    );
}

export default App;
