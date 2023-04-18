import { IoIosCreate } from 'react-icons/io';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { ImEye } from 'react-icons/im';
import { ImWarning } from 'react-icons/im';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { BiAddToQueue} from 'react-icons/bi';
import {AiFillCheckCircle} from  'react-icons/ai'



export const ManagerHome = (props) => {

    return (
        <>

            <Link to="addaccount">
                <div className = "card">
                    <h3>Add<br></br> Account</h3>
                    <br></br>
                    <BiAddToQueue size={50}/>
                </div>
            </Link>
            <Link to="viewaccounts">
                <div className = "card">
                    <h3>View<br></br> Accounts</h3>
                    <br></br>
                    <ImEye size={50}/>
                </div>
            </Link>
            <Link to="/ApproveReject">
  <div className="card">
    <h3>Approve/Reject<br />Journal Entries</h3>
    <br />
    <AiFillCheckCircle size={50} />
  </div>
</Link>

            <Link to="viewusers">
                <div className = "card">
                    <h3>View</h3>
                    
                    <h3>Users</h3>
                    <br></br>
                    <AccountCircleIcon sx={{ fontSize: 50 }}/>
                </div>
            </Link>
         
        </>
        
        );
}

