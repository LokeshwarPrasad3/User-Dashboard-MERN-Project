import React, { useContext, useState } from 'react'

import './componentCss/Login.css';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import GitHubIcon from '@mui/icons-material/GitHub';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import GoogleIcon from '@mui/icons-material/Google';
import PersonIcon from '@mui/icons-material/Person';
import HttpsIcon from '@mui/icons-material/Https';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import Loader from './Loader';

// get js-cookie to set in cookie
import Cookies from 'js-cookie';



// import host backend url
import { host } from '../API/api';

// WE MAKE WHEN LOGIN USER THEN IT AUTOMATICALLY FETCH ALL DATA OF USER AND PUT INTO THEIR PAGE

const Login = () => {
  // state which is control circular progress
  const [display, setDisplay] = useState('none');

  // state which is control circular progress
  const [visibility, setVisibility] = useState('visible');

  // here using UserContext which i created in app then i get all values of context
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);

  // using navigate to navigating after login to main page
  const navigate = useNavigate();

  // making state to store login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  // when user clicked login button then verify server and go to home page (account)
  const loginUser = async (e) => {

    // when data is found for load then display
    setDisplay('flex');
    // then visible contents
    setVisibility('hidden');

    e.preventDefault();
    // fetching from /login 
    const res = await fetch(`${host}/login`, {
      // browser post a data to server
      method: "POST",
      headers: {
        // data is json format storing
        "Content-Type": "application/json"
      },
      // storing data in json for
      // here checking all the validation from server /login 
      body: JSON.stringify({
        email,
        password
      })
    })
    // always read line either server give error or not validate or validate


    // when data is found for load then display
    setDisplay('none');
    // then visible contents
    setVisibility('visible');

    // data convert to objec so authenticate
    const data = await res.json();

    // getting token
    // eslint-disable-next-line
    const token = data.token;
    // now getting token and set in cookie
    Cookies.set('jwtToken', data.token, { expires: 3, path: '/' });

    // can set in localStorage
    // localStorage.setItem("jwtoken", data.token);

    // if except success
    if (res.status !== 200) {
      // when data is found for load then display
      setDisplay('none');
      // then visible contents
      setVisibility('visible');
      window.alert(data.message);
    }
    // if all data is authenticate successfully
    else {
      // dispatch is from useReducer defined in reducer folder, type:'user' and change state value by extra payload
      // this chage display menu of navbar (home,about,contact,logout)
      dispatch({ type: 'USER', payload: true });
      // {/* popup call when needed */}
      window.alert(data.message);
      navigate('/');
    }

  }


  return (
    <>

      {/* this is loader when data is loading */}
      <Loader display={display} message="Fetching Data" />


      {/* full box of login */}
      <div className="login_box" style={{ visibility: visibility }}>

        {/* main content box of login  */}
        <div className="main_login_box">

          {/* left box contains  */}
          <div className="login_left_content">
            <img src="/Images/LoginImage.jpg" alt="" srcSet="" />
            <Link className='text-lg text-blue-500' to="/register">Create an Account</Link>
          </div>

          {/* right box contains  */}
          <div className="login_right_content">
            <div className="login_heading">
              <h1 className='text-3xl font-bold texts' >Sign In</h1>
            </div>

            {/* actual form user login */}
            <form id="form_login" action="" autoComplete='off'>

              {/* inputs email */}
              <div className="login_input_email">
                <PersonIcon />
                <input className="input_login" type="email" name="email" id="input_name_id" placeholder='Your Email' autoComplete='off'
                  value={email}
                  onChange={(e) => { setEmail(e.target.value) }}
                />
              </div>

              {/* inputs password */}
              <div className="login_input_password">
                <HttpsIcon />
                <input className="input_login" type="password" name="password" id="input_password_id" placeholder='Password' autoComplete='off'
                  value={password}
                  onChange={(e) => { setPassword(e.target.value) }}
                />
              </div>

              {/* login button */}
              <Tooltip className='login_tooltip' title="Login">
                <Button className="login_button" style={{ fontSize: '17px', fontFamily: 'signika negative', textTransform: 'capitalize' }} variant='contained'
                  onClick={loginUser}
                >Log In
                </Button>
              </Tooltip>
            </form>

            {/* other login methods */}
            <div className="other_login">
              <h3 className='another_login_heading'>OR login with <br /><strong style={{ fontSize: '1rem' }} >Google Facebook Github</strong></h3>

              <div className="login_methods">
                <button className="auth0Btn">Sign Up</button>
              </div>

              {/*<div className="method_button bg-orange-600">
                  <GoogleIcon className="" />
                </div>
                <div className="method_button bg-blue-500">
                  <TwitterIcon className="" />
                </div>
                <div className="method_button bg-blue-900" >
                  <GitHubIcon className="" />
                </div>
                <div className="method_button bg-blue-900" >
                  <FacebookIcon className="" />
                </div>
                */}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Login
