
// importing useEffect for calling function before rendering
import React, { useCallback, useEffect, useState } from 'react'
import './componentCss/About.css';
import { Link, useNavigate } from 'react-router-dom';

import MyImage from '../TempImg/imageLoader.jpg';
import Loader from './Loader';
import Popup from './Popup';
// import EmptyImage from '../TempImg/empty-profile.png';

// import host backend url
import {host} from '../API/api';

const About = () => {

  // state which is control circular progress
  const [display, setDisplay] = useState('flex');

  // state which is control circular progress
  const [visibility, setVisibility] = useState('hidden');

  // set filter when show popup
  const [filter, setFilter] = useState('blur(0px)');

  // show popup or not
  const [popupVisible, setPopupVisible] = useState(false);

  // const MyImage = './Images/myPhoto.jpg';
  // const EmptyImage = './Images/myPhoto.jpg';


  // to storing user Data
  const [userData, setUserData] = useState({});


  // for image
  const [image, setImage] = useState("");

  // using for navigate other page after event
  const navigate = useNavigate();

  // function that authenticate user is valid
  const callAboutPage = useCallback(async () => {
    try {
      // fetch response from /about page which give user details token , from db
      const res = await fetch(`${host}/about`, {
        // now getting data from db
        method: "GET",
        headers: {
          // page accept their contenet type json
          Accept: "application/json",
          "Content-Type": "application/json",
          // send token via headers to authenticate in backend
          "token" : localStorage.getItem("jwtoken")
        },
        // including that for  getting data
        credentials: "include"
        // not need body because only getting data from server not post (write in db)
      });

      // when data is found for load then display
      setDisplay('none');
      // then visible contents
      setVisibility('visible');

      // change response to object so that checking details

      //eslint-disable-next-line
      const data = await res.json();
      // console.log(data);

      // set data to userData
      setUserData(data);

      setImage(data.image);


      if (res.status !== 200) {
        const error = new Error(res.error);
        throw error;
        // window.alert("Login to Access this Page");
      }
    } catch (err) {
      // console.log(err);
      navigate('/login');
    }
  }, [navigate]);

  // before page render we authenticate that user can access about page or not
  useEffect(() => {
    callAboutPage();
  }, [callAboutPage]);

  // show popup when clicked edit button
  const showPopup = (e) => {
    e.preventDefault();
    setPopupVisible(true);
    setFilter('blur(15px)');
    console.log(e);
  }


  return (
    <>
      {/* popoup visible here */}
      {
        popupVisible && <Popup setPopupVisible={setPopupVisible} setFilter={setFilter} />
      }

      {/* loader component */}
      <Loader display={display} message="Fetching Data" />

      {/* full box of about */}
      <div style={{ visibility: visibility, filter: filter }} className="about_box">

        {/* main content box of about  */}
        <div className="main_about_box">

          {/* left description having image and skills work link */}
          <div className="left_about">
            <div className="imageSection flex flex-col">
              {/* <img
                // src="./Images/myPhoto.jpg" 
                src={userData.name === "Lokeshwar" ? MyImage : EmptyImage}
                alt="myPhoto" /> */}

              {image ? (
                <img src={image} alt="searching.." />
              ) : (
                <img src={MyImage} alt="searching..." />
              )}


              {/* customize file input */}
              <label id="chooseImage" htmlFor="fileInput" className='custom-file-input'>
                <span >Change Picture</span>
              </label>
              <input type="file" id="fileInput" className="hidden" />
            </div>

            {/* description links */}
            <div className="short_description">

              {/* work links */}
              <div className="work_link">
                <h2 className='user_features font-bold text-lg space-x-2 p-1 ' >Social-Links</h2>
                <Link className=' user_links text-blue-900' to="#" >Facebook</Link>
                <Link className=' user_links text-blue-900' to="#" >Instagram</Link>
                <Link className=' user_links text-blue-900' to="#" >Linkedin</Link>
                <Link className=' user_links text-blue-900' to="#" >Github</Link>
              </div>

              {/* user skills */}
              <div className="my_skills">
                <h2 className='user_features font-bold text-lg space-x-2 p-1 ' >SKILLS</h2>
                <Link className=' user_links text-blue-900' to="#" >----</Link>
                <Link className=' user_links text-blue-900' to="#" >----</Link>
                <Link className=' user_links text-blue-900' to="#" >----</Link>
                <Link className=' user_links text-blue-900' to="#" >----</Link>
              </div>
            </div>
          </div>


          {/* right side components */}
          <div className="right_about">

            {/* basic details display */}
            <div className="basic_details">

              {/* here name, roll display */}
              <div className="my_details">
                <h2 className='text-2xl font-bold'  > {userData.name} </h2>
                <h3 className='text-xl' > {userData.work}</h3>
                <h4 className='' >Ranking 1/10</h4>
              </div>

              {/* we can edit our details */}
              <div className="edit_details">
                <button className='bg-blue-600 text-white rounded w-[90px] edit-btn'
                  onClick={showPopup}
                >Edit-Profile</button>
              </div>
            </div>

            {/* my- login registered details */}
            <div className="account_details">
              <div className="scroll_btn">
                <Link to="" className='text-3xl 
                
                text-blue-800 px-4 border-b-2 border-black'>About</Link>
                {/* <Link to="" className='text-xl text-blue-800'>Timeline</Link> */}

              </div>
              <div className="about_section">
                <div className="keys">
                  <p>User Id</p>
                  <p>Name </p>
                  <p>Email </p>
                  <p>Phone</p>
                  <p>Profession</p>
                </div>
                <div className="values">
                  <p> {userData._id}</p>
                  <p> {userData.name} </p>
                  <p> {userData.email}</p>
                  <p> {userData.phone}</p>
                  <p> {userData.work}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default About;
