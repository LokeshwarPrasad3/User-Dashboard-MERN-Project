import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './componentCss/Navbar.css';

import { UserContext } from '../App';

const Navbar = () => {

    // const navigate = useNavigate();

    // making for responsive navbar by default menu is not open (closed)
    const [isOpen, setIsOpen] = useState(false);
    // const ulRef = useRef(null);

    // wheen clicked to menu btns list anchor then close ul
    const handleLinkClick = () => {
        // changing to ul stlyle
        setIsOpen(false);
    };


    // when clicked to checkbox aur menu btn which is three line
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };


    // here using UserContext which i created in app then it get all values of context
    // eslint-disable-next-line
    const { state, dispatch } = useContext(UserContext);
    // using dispatch for changing value of state true/false
    // HERE state value changing by login, logout component 
    // then if true:then login show home about contact logout
    // false:then logout show home login register

    // by default close when render first time
    useEffect(() => {
        setIsOpen(false);
    }, []);

    // making function component which is render using state 
    const RenderMenu = () => {
        // if state is true means login successfully 
        if (state) {
            // login then returning home about contact logout
            return (
                <>
                    <li>
                        <Link className="nav-link"
                            onClick={handleLinkClick}
                            to="/" aria-current="page"> Home </Link>
                    </li>
                    <li>
                        <Link className="nav-link"
                            onClick={handleLinkClick}
                            to="/about"> AboutMe </Link>
                    </li>
                    <li>
                        <Link className="nav-link"
                            onClick={handleLinkClick}
                            to="/contact"> Contact </Link>
                    </li>
                    <li>
                        <Link className="nav-link"
                            onClick={handleLinkClick}
                            to="/logout"> Logout </Link>
                    </li>
                </>
            )
        } else {
            //if state is false (logout) then returning home login register
            return (
                <>
                    <li>
                        <Link className="nav-link"
                            onClick={handleLinkClick}
                            to="/" aria-current="page"> Home </Link>
                    </li>
                    <li>
                        <Link className="nav-link"
                            onClick={handleLinkClick}
                            to="/login"> Login </Link>
                    </li>
                    <li>
                        <Link className="nav-link"
                            onClick={handleLinkClick}
                            to="/register"> Register </Link>
                    </li>
                </>
            )
        }
    }

    // using for redirecting to page
    // const navigate = useNavigate();

    return (
        <>
            <nav id="navbar" className="xyz">
                <Link to="" id="heading">
                    <h1 className='nav_name' >Lokeshwar Prasad</h1>
                </Link>
                <input type="checkbox" checked={isOpen} id="click" onChange={toggleMenu} />
                <label htmlFor="click" className="menu-btn">
                    <i className="fas fa-bars"></i>
                </label>
                <div id="menuBtns">
                    <ul id="links" style={{ left: isOpen ? '0%' : '-100%' }}>

                        {/* rendering rule of login and logout which is show or not show */}
                        <RenderMenu />
                        {/* RenderMenu function component defining in top  */}

                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
