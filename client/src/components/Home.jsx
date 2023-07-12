import React, { useCallback, useContext, useEffect, useState } from 'react'
import './componentCss/Home.css';
// import Loader from './Loader';

// get js-cookie to set in cookie
import Cookies from 'js-cookie';

// import host backend url
import { host } from '../API/api';
import { UserContext } from '../App';

const Home = () => {
  // here using UserContext which i created in app then i get all values of context
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);

  // // state which is control circular progress
  // const [display, setDisplay] = useState('block');

  // // state which is control circular progress
  // const [visibility, setVisibility] = useState('hidden');

  // setting userDAta
  const [userData, setUserData] = useState({});

  const showHomeData = useCallback(async () => {
    try {
      const res = await fetch(`${host}/getData`, {
        // now getting data from db
        method: "GET",
        headers: {
          // page accept their content type json
          "Content-Type": "application/json",
          Accept: "application/json",
          // send token via headers to authenticate in backend
          "token": Cookies.get('jwtToken')
        },
        // including that for getting data
        credentials: "include"
        // not need body because only getting data from server not post (write in db)
      });

      // if res is true mean user logged in
      if (res.status !== 401) {
        // dispatch is from useReducer defined in reducer folder, type:'user' and change state value by extra payload
        // this chage display menu of navbar (home,about,contact,logout)
        dispatch({ type: 'USER', payload: true });
      }

      // // set display none when loaded data
      // setDisplay('none');
      // // visible content
      // setVisibility('visible');

      if (res.status !== 200) {
        // it console window
        throw new Error(res.error);
      }

      // change response to object that checking details
      // eslint-disable-next-line
      const data = await res.json();
      // now data is received in data
      // console.log(data);
      setUserData(data);

    }
    catch (err) {
      console.log(err);
    }
  }, [dispatch])

  useEffect(() => {
    showHomeData();
  }, [showHomeData]);

  return (
    <>
      {/* this is loader when data is loading */}
      {/* <Loader display={display} />
      <div className='home' style={{ visibility: visibility }}> */}

      <div className='home'>
        <p className='welcome' >WELCOME</p>
        <div className='message' >
          {userData.name && userData.name.length > 0 ? (
            <>
              <h1 className="message">{userData.name}</h1>
              {/* <br /> */}
              <span className="span">Happy, to see you back</span>
            </>
          ) : "We Are The MERN Developer"}
        </div>
        {/* <h1 className='message' ></h1> */}
      </div>
    </>
  )
}

export default Home
