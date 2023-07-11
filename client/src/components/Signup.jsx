import React, { useState } from 'react'
import './componentCss/Signup.css';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import PersonIcon from '@mui/icons-material/Person';
import HttpsIcon from '@mui/icons-material/Https';
import EmailIcon from '@mui/icons-material/Email';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import WorkIcon from '@mui/icons-material/Work';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import { Link, useNavigate } from 'react-router-dom';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import Loader from './Loader';

// import host backend url
import {host} from '../API/api';

const Signup = () => {

  // state which is control circular progress
  const [display, setDisplay] = useState('none');

  // state which is control circular progress
  const [visibility, setVisibility] = useState('visible');

  // create state for input file

  const [image, setImage] = useState("");

  // stored navigation 
  const navigate = useNavigate();

  // making object that store user registration data 
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    work: '',
    password: '',
    cpassword: ''
  });


  // declaring name value
  let name, value;

  // handle all input type field
  const handleInputs = (event) => {
    // console.log(event);
    // getting value of name and value of value
    name = event.target.name;
    value = event.target.value;

    // previous user + new user nameOfInput:valueOfInput
    // HERE ...user SPREAD OPERATOR MEANS making new object using property of user (
    setUser({ ...user, [name]: value })
    // (here not making two object by setUser, ... user is just initialize their object propety and 2nd argument is filling that property)
    // console.log(user);
  }

  // when clicked to signup button then sending data to db
  const PostData = async (e) => {


    // when data is found for load then display
    setDisplay('flex');
    // then visible contents
    setVisibility('hidden');

    // using destructuring method to taking all the details from user object 
    const { name, email, phone, work, password, cpassword } = user;



    // fetch all data from /register route
    const res = await fetch(`${host}/register`, {
      // set method which type
      method: "POST",
      headers: {
        // we send then write typeof data
        "Content-Type": 'application/json'
      },
      // what data we should send
      body: JSON.stringify({
        // we cannot use userData direclty, need indivisual data sent
        name, email, phone, work, password, cpassword, base64: image
      })

    });

    // when data is found for load then display
    setDisplay('none');
    // then visible contents
    setVisibility('visible');

    // we verify from backened that occur any error
    const data = await res.json();
    console.log(data);

    // VALIDATE DATA 
    // if not success then message print
    if (data.status !== 201) {
      // when data is found for load then display
      setDisplay('none');
      // then visible contents
      setVisibility('visible');
      window.alert(data.message);
    }
    // checking if success then print message and navigate to login
    else {
      window.alert("successfully submitted");
      navigate('/login');
    }
    // end
  }


  // file upload
  const convertToBase64 = (e) => {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = error => {
      console.log("Error : ", error);
    };
  }


  return (
    <>

      {/* this is loader when data is loading */}
      {/* <Loader display={display} message="It May Take Time to Upload Image" /> */}
      <Loader display={display} message="It May Take Time to Upload Image" />

      {/* full box of signup */}
      <div className="signup_box" style={{ visibility: visibility }}>

        {/* main content box of signup  */}
        <div className="main_signup_box">


          {/* left box contains  */}
          <div className="signup_left_content">
            <div className="signup_heading">
              <h1 className='text-3xl font-bold texts flex justify-center items-center' >Sign Up</h1>
            </div>

            {/* actual form user signup */}
            <form method="POST" id="form_signup" enctype="multipart/form-data" autoComplete="new-password" >

              {/* input name  */}
              <div className="signup_input_name signup_input_field">
                <PersonIcon />
                <input className="input_signup" type="text" name="name" id="signup_name_id" placeholder='Your Name' autoComplete='new-password'
                  value={user.name}
                  onChange={handleInputs}
                />
              </div>

              {/* inputs email */}
              <div className="signup_input_email signup_input_field">
                <EmailIcon />
                <input className="input_signup" type="email" name="email" id="signup_email_id" placeholder='Your Email' autoComplete='new-password'
                  value={user.email}
                  onChange={handleInputs}
                />
              </div>

              {/* inputs mobile number */}
              <div className="signup_input_mono signup_input_field">
                <PhoneForwardedIcon />
                <input className="input_signup" type="number" name="phone" id="signup_phone_id" placeholder='Mobile Number' autoComplete='new-password'
                  value={user.phone}
                  onChange={handleInputs}
                />
              </div>

              {/* inputs profession */}
              <div className="signup_input_profession signup_input_field">
                <WorkIcon />
                <input className="input_signup" type="text" name="work" id="signup_work_id" placeholder='Your Profession' autoComplete='new-password'
                  value={user.work}
                  onChange={handleInputs}
                />
              </div>

              {/* inputs password */}
              <div className="signup_input_password signup_input_field">
                <HttpsIcon />
                <input className="input_signup" type="password" name="password" id="signup_password_id" placeholder='Password' autoComplete='new-password'
                  value={user.password}
                  onChange={handleInputs}

                />
              </div>

              {/* inputs confirm password */}
              <div className="signup_input_cpassword signup_input_field">
                <EnhancedEncryptionIcon />
                <input className="input_signup" type="password" name="cpassword" id="signup_cpassword_id" placeholder='Confirm Your Password' autoComplete='new-password'
                  value={user.cpassword}
                  onChange={handleInputs}

                />
              </div>

              {/* inputs user photo password */}
              <div className="signup_input_photo signup_input_field">
                <InsertPhotoIcon />
                <input className="input_signup" type="file" name="image" id="signup_photo_id" accept='image/*'
                  onChange={convertToBase64}
                //  accept="image/*" means that only image files, such as JPEG, PNG, GIF, and others, will be allowed for selection.
                />
                {/* preview image */}
                {image === "" || image === null ? "" : <img width={100} height={100} alt="notfound" src={image} />}

              </div>

              {/* signup button */}
              <Tooltip className='signup_tooltip' title="signup">
                <Button className='signup_button' style={{ fontSize: '17px', fontFamily: 'signika negative', textTransform: 'capitalize' }} variant='contained'
                  onClick={PostData}
                >Signup
                </Button>
              </Tooltip>
            </form>
          </div>

          {/* right box contains  */}
          <div className="signup_right_content">
            <img src="/Images/Register.png" alt="" srcSet="" />
            <Link className='text-lg text-blue-500' to="/login">Have Account ? Log In</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup;