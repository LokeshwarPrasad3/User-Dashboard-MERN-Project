

import React from 'react'
import './componentCss/ErrorPage.css';
const ErrorPage = () => {
    return (
        <>
            <div id="error-container">
                <h1>404</h1>
                <h2>There is nothing Here</h2>
                <p>Sorry, the page you were looking for in this blog does not exist.</p>
                <i id="i" class="fa fa-home"></i>
                <i class="bi bi-house"></i>
                <a class="homepage" href="/">Home</a>
            </div>
        </>
    )
}

export default ErrorPage
