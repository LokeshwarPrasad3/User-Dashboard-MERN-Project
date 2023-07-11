import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../App';

// import host backend url
import { host } from '../API/api';

const Logout = () => {
    // here using UserContext which i created in app then i get all values of context
    // eslint-disable-next-line
    const { state, dispatch } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${host}/logout`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                // send token via headers to authenticate in backend
                "token": localStorage.getItem("jwtoken")
            },
            credentials: "include"
        }).then((res) => {
            // mean successfully clicked logout button then delete cookie
            localStorage.removeItem('jwtoken');

            // dispatch is from useReducer defined in reducer folder, type:'user' and change state value by extra payload
            // this chage display menu of navbar (home,login,logut)
            dispatch({ type: "USER", payload: false });
            navigate('/login');
            if (res.status !== 200) {
                throw new Error(res.error);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [navigate, dispatch]);

    return (
        <>

            {/* <h1>Logut page</h1> */}
            <div className="logout" style={{ height: '100vh' }}></div>
        </>
    )
}

export default Logout
