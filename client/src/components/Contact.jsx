import React, { useCallback, useEffect, useState } from 'react'
import './componentCss/Contact.css';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import PersonIcon from '@mui/icons-material/Person';
// import HttpsIcon from '@mui/icons-material/Https';
// import EmailIcon from '@mui/icons-material/Email';
// import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
// import WorkIcon from '@mui/icons-material/Work';
// import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
// import { Link } from 'react-router-dom';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import PlaceIcon from '@mui/icons-material/Place';
import EmailIcon from '@mui/icons-material/Email';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

// import host backend url
import {host} from '../API/api';

const Contact = () => {
    // state which is control circular progress
    const [display, setDisplay] = useState('flex');

    // state which is control circular progress
    const [visibility, setVisibility] = useState('hidden');

    // storing data in user object form
    const [userData, setUserData] = useState({
        name: '', email: '', phone: '', message: ''
    });

    const navigate = useNavigate();


    // defineing showData which show all data
    const showData = useCallback(async () => {
        try {
            // fetch response from /about page which give user details token , from db
            const res = await fetch(`${host}/getData`, {
                // now getting data from db
                method: "GET",
                headers: {
                    // page accept their content type json
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    // send token via headers to authenticate in backend
                    "token" : localStorage.getItem("jwtoken")
                },
                // including that for getting data
                credentials: "include"
                // not need body because only getting data from server not post (write in db)
            })

            // hide loader 
            setDisplay('none');
            // show content 
            setVisibility('visible');

            if (res.status !== 200) {
                // it console window
                throw new Error(res.error);
            }

            // change response to object that checking details
            // eslint-disable-next-line
            const data = await res.json();
            // now data is received in data
            // console.log(data);
            setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });

            // WE CANNOT CONSOLE USERDATA IMMEDIETELY BECAUSE OF LATE (make useEffect to console userData)

        }
        catch (err) {
            console.error('Error fetching or parsing data:', err);
            // if error then unauthorized then navigate to login
            navigate('/login');
        }
        // eslint-disable-next-line
    }, [navigate]);

    // when render first time then show all details
    useEffect(() => {
        showData();
    }, [showData])




    // when input changes then it reflect handleInput
    const handleInput = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        setUserData({ ...userData, [name]: value });
    }

    // handle when clicked then sending to backend
    const contactForm = async () => {
        const { name, email, phone, message } = userData;
        const res = await fetch(`${host}/contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // we cannot use userData direclty, need indivisual data sent
                name, email, phone, message
            })
        })

        // change to object for validation data
        const data = res.json();
        // console.log(data);

        if (!data) {
            // if data is not ok then navigate to login
            console.log("Mesage not send");
        } else {
            alert("Message sent");
            setUserData({ ...userData, message: "" }); // indirectly userData.message = "" 
        }
    }

    return (
        <>
            {/* this is loader when data is loading */}
            <Loader display={display} message="Fetching Data" />

            {/* full box of contact */}
            <div className="contact_box" style={{ visibility: visibility }}>
                {/* box where some details showing */}
                <div className="user_contact_details">
                    {/* phone details box */}
                    <div className="phone_details">
                        {/* ico of phone */}
                        <div className="icon">
                            <PhoneIphoneOutlinedIcon />
                        </div>
                        <div className="details">
                            <h3 className='text-lg' > Phone </h3>
                            <h4 className="text-sm" > +91{userData.phone} </h4>
                        </div>
                    </div>

                    {/* email details box */}
                    <div className="email_details">
                        {/* ico of email */}
                        <div className="icon">
                            <EmailIcon />
                        </div>
                        <div className="details">
                            <h3 className='text-lg' > Email </h3>
                            <h4 className="text-sm" > {userData.email} </h4>
                        </div>
                    </div>

                    {/* address details box */}
                    <div className="address_details">
                        {/* icon of place */}
                        <div className="icon">
                            <PlaceIcon />
                        </div>
                        <div className="details">
                            <h3 className='text-lg' > Address </h3>
                            <h4 className="text-sm" > empty address </h4>
                        </div>
                    </div>
                </div>

                {/* main content where user send message to admin */}
                <form method="POST" className="main_contact_box">
                    <h2 className="text-3xl font-bold pt-1" > Get In Touch </h2>
                    {/* filling their some inputs */}
                    <div className="fill_inputs">
                        <input
                            type="text" name="name" className='input_message' placeholder='Your Name'
                            value={userData.name}
                            onChange={handleInput}
                        />
                        <input
                            type="email" name="email" className='input_message' placeholder='Your email'
                            value={userData.email}
                            onChange={handleInput}
                        />
                        <input
                            type="number" name="phone" className='input_message' placeholder='Your phone Number'
                            value={userData.phone}
                            onChange={handleInput}
                        />
                    </div>
                    {/* fill their message */}
                    <div className="text_message">
                        <textarea name="message" className="textarea_contact" placeholder='Type Your Message Here !'
                            value={userData.message}
                            onChange={handleInput}
                        ></textarea>
                    </div>
                    {/* sending message btn */}
                    <div className="send_btn">
                        <Tooltip className="tooltip_contact" title="Send Message">
                            <Button className="button_contact" style={{ fontSize: '17px', fontFamily: 'signika negative', textTransform: 'capitalize' }} variant='contained'
                                onClick={contactForm}
                            >send Message
                            </Button>
                        </Tooltip>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Contact;
