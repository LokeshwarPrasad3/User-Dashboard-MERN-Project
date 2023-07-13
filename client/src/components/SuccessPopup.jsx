import React, { useState } from 'react'
import './componentCss/SuccessPopup.css';
import rightImage from '../TempImg/rightImage.png';
import { useNavigate } from 'react-router-dom';

const SuccessPopup = (props) => {

    const navigate = useNavigate();

    const { message, navigateLink } = props;

    // popup style manage
    const [popupStyle, setPopupStyle] = useState({
        visibility: 'visible',
        top: '50%',
        transform: 'translate(-50%, -50%) scale(1)'
    });
    // // when open pop then make style
    // const openPopup = () => {
    //     setPopupStyle({

    //     });
    // }
    // when close popup then remove style
    const closePopup = () => {
        setPopupStyle({});
        navigate(navigateLink);
    }

    return (
        <>
            {/* <button style={{ padding: '20px', backgroundColor: 'yellow' }} onClick={openPopup} >hey bro clicke me</button> */}
            <div id="popup_body">
                <div style={popupStyle} className="popup_box" id="main_popup">
                    <img className="popup_image" src={rightImage} alt="searching" />
                    <h2 className='main_message' >Thank You!</h2>
                    <p className='meesage_description' >{message}</p>
                    <button className='ok_btn' type="button" onClick={closePopup}>OK</button>
                </div>
            </div>
        </>
    )
}

export default SuccessPopup
