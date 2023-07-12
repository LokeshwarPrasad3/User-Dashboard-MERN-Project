import React, { useState } from 'react'
import './componentCss/EditPopup.css';

const EditPopup = (props) => {
    // prpops that close or remove filter
    const { setPopupVisible, setFilter } = props;

    // store edited data
    const [editData, setEditData] = useState({
        name: "",
        email: "",
        phone: "",
        work: "",
        facebook_link: "",
        instagram_link: "",
        linkedin_link: "",
        github_link: ""
    });

    // store data when clicked
    const handleEvent = (e) => {
        const { value, name } = e.target;
        setEditData((prevData) => ({ ...prevData, [name]: value }));
        console.log(editData[name]);
    }

    // when clicked to changed then
    const saveData = (e) => {
        e.preventDefault();
        // prpops that close or remove filter
        setPopupVisible(false);
        setFilter('blur(0px)');
        console.log(editData);
    }

    return (
        // <div className="edit_profile">
        <form action="" className="edit_form_details">
            {/* basic details */}
            <div className="edit_basic_details">
                <h2 className='heading_edit_profile'>Basic Details</h2>
                <input type="text" className='edit_form_input'
                    onChange={handleEvent} name="name" placeholder='Enter Your Name' />
                <input type="email" className='edit_form_input'
                    onChange={handleEvent} name="email" placeholder='Enter Your Email' />
                <input type="number" className='edit_form_input'
                    onChange={handleEvent} name="phone" placeholder='Phone Number' />
                <input type="text" className='edit_form_input'
                    onChange={handleEvent} name="work" placeholder='Profession' />
            </div>
            {/* links of  social media */}
            <div className="social_media_details">
                <h2 className='heading_edit_profile'>Social Media</h2>
                <input type="text" className='edit_form_input'
                    onChange={handleEvent} name="facebook_link" placeholder='facebook link' />
                <input type="text" className='edit_form_input'
                    onChange={handleEvent} name="instagram_link" placeholder='Instagram link' />
                <input type="text" className='edit_form_input'
                    onChange={handleEvent} name="linkedin_link" placeholder='Linkedin link' />
                <input type="text" className='edit_form_input'
                    onChange={handleEvent} name="github_link" placeholder='Github link' />
            </div>


            {/* skills  */}
            {/* <div className="skills_details">
                <h2 className='heading_edit_profile'>Your Skills</h2>
                <input type="text" className='edit_form_input'
                    onChange={handleEvent} name="facebook_link" placeholder='facebook link' />
                <input type="text" className='edit_form_input'
                    onChange={handleEvent} name="instagram_link" placeholder='Instagram link' />
                <input type="text" className='edit_form_input'
                    onChange={handleEvent} name="linkedin_link" placeholder='Linkedin link' />
                <input type="text" className='edit_form_input'
                    onChange={handleEvent} name="github_link" placeholder='Github link' />
            </div> */}


            <div className="edit_profile_submit_btn">
                <input type="submit" className='edit_submit_btn' value="Change" onClick={saveData} />
            </div>
        </form>
        // {/* </div> */}
    )
}

export default EditPopup
