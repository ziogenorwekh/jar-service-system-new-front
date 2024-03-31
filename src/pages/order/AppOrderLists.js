import {useEffect, useState} from "react";
import axios from "axios";
import "../../css/board.css"
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../store";

function AppOrderLists() {

    const [apporderList, setApporderList] = useState([]);
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = useState(true);

    const callLists = () => {
        axios.get(`/apporder-service/api/apporders/${user.userId}/all`, )
            .then(resp => {
                let copy = [...resp.data];
                setIsLoading(false);
                setApporderList(copy);
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
        callLists()
    }, [])

    return (
        <>
            {
                isLoading ? (
                    <p className='loading'>Loading...</p>
                ) : (
                    <>
                        <div className="applications-count">My Applications: {apporderList.length}</div>
                        <hr className={"m-0"}/>
                        {
                            apporderList.map((item, index) => (
                                <div key={index} className={"post-list"}
                                     onClick={() => navigate(`/application/${item.appOrderId}`)}>
                                    <div className="title">{item.applicationName}</div>
                                    <div className={"username"}>{item.containerId}</div>
                                </div>
                            ))
                        }
                    </>
                )
            }
        </>
    )
}

export default AppOrderLists