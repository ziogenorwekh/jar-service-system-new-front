import {Nav} from "react-bootstrap";
import {useState} from "react";
import "../css/info.css"
import HowToUseDatabase from "./HowToUseDatabase";
import HowToUseApplication from "./HowToUseApplication";
function HowToUse() {

    let [ctrLink,setCtrLink] = useState(0);

    return (
        <>
            <Nav className={"mx-3 mb-0 text-black"} fill variant="tabs">
                <Nav.Item>
                    <Nav.Link className={"navLink-style"} onClick={() => {
                        setCtrLink(1)
                    }}>How to create a database</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className={"navLink-style"} onClick={() => {
                        setCtrLink(2)
                    }}>How to register an application</Nav.Link>
                </Nav.Item>
            </Nav>
            <hr className={"mx-3 mt-0"}/>
            {
                ctrLink === 1 ? <HowToUseDatabase/> : ctrLink === 2 ? <HowToUseApplication/> : null
            }
        </>
    );
}

export default HowToUse