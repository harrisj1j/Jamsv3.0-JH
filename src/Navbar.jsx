import React, {useState} from "react";
import menuLogo from './img/JAMS_313X313.png'
import {AuthDetails } from './AuthDetails';
import {Link, NavLink} from "react-router-dom"


import "./NavbarStyles.css"


//Main navigation menu
export function Navbar(){
    const [click, setClick] = useState(false)
    const handleClock = () => setClick(!click)
    

    return (
        <nav>
        
        <div>
            <ul id="navbar">
                <li><Link  to="adminhome"><a>Dashboard</a></Link></li>
                <li><Link to="adminhome/viewaccounts"><a>View Accounts</a></Link></li>
                <li><Link to="adminhome/addaccount"><a>Add Accounts</a></Link></li>
                <li className="authdetails">< AuthDetails/></li>  {/*sign in info displayed in */}
            </ul>
        </div>
    </nav>
    );
}

