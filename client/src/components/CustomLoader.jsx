import React from 'react';
import './componentCss/CustomLoader.css';

const CustomLoader = (props) => {
    const { display, message } = props;

    return (
        <>
            {/* loading section */}
            <div id="custom_loader" style={{ display: display }}>
                <h3 style={{ textAlign: 'center' }} >{message}</h3>
                <div id="circle_box">
                    <div class="circle circle-1"></div>
                    <div class="circle circle-2"></div>
                    <div class="circle circle-3"></div>
                </div>
            </div>
        </>
    )
}

export default CustomLoader;

