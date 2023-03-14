import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from './firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';


//check whether user is signed in or not and which user it is

export const AuthDetails = () => {
    const [authUser, setAuthuser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if(user) {
                setAuthuser(user) //if user us logged in, set authuser to the logged in user
            }else{
                setAuthuser(null);//otherwise authuser is null
            }
        });

        return () => {
            listen();
        }
    
    

    }, []);

        const userSignOut = () => {
            signOut(auth).then(() => {
                console.log('sign out successful')
                navigate("/");
            }).catch(error => console.log(error));
        }
    return (
        <div>
            { authUser ? <> 
            
            <p>{`Signed in as ${authUser.email}`}</p> <a onClick={userSignOut} ><h5>Sign Out</h5><LogoutIcon /></a></>: <p>Signed Out</p>} {/**display authUser (email) if they are logged in or if they are signed out */}
        </div> 
    )
}

