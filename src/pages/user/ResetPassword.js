import React, {useState} from "react";
import {Alert} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function ResetPassword() {

    const [enterEmail, setEnterEmail] = useState('')
    let navigate = useNavigate();

    const sendEmailPassword = () => {
      let json = {
          email : enterEmail
      }
      axios.patch(`/user-service/api/users`,JSON.stringify(json),{
          headers: {
              "Content-Type": `application/json`,
          }
      }).then(resp=>{
        alert("successful send email")
      }).catch(error=>{
        alert("Unknown error")
      })
    }

    return (
        <>
            <div className="login-container">
                <form className="login-form">
                    <h3>Reset Password</h3>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="text" autoComplete={"on"} onChange={e => {
                            setEnterEmail(e.target.value)
                        }} className="form-control" placeholder="Enter email"/>
                    </div>
                <div className="join-container">
                    <p className="join-text">Send new password</p>
                    <button type="button" className="join-button w-25" onClick={() => {
                        sendEmailPassword()
                    }}>Send
                    </button>
                </div>
                </form>
            </div>
        </>
    )
}

export default ResetPassword