import { useState, useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { FaBlackTie } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Input, Label } from 'reactstrap';
import { getDashUsers } from '../../../features/dashUsers/dashUsersSlice';
import UserDetails from './AllUserDetails';
import AllAddNewUser from './AllAddNewUser';

function DashUsers() {
    const dispatch = useDispatch();
    const users = useSelector(state => state.dashUsers.dashUsers);//state.reducerName.sliceName
    const [add, setAdd] = useState(false);
    const [searchUser, setSearchUser] = useState("");

    const usersList = users.filter((val) => {
        if (searchUser === "") {
            return val;
        } else if (
            val.firstName.toLowerCase().includes(searchUser.toLowerCase())) {
            return val;
        }
    }).map((user, i) => {
        return (
            <UserDetails key={i} data={user} />
        );
    })

    const onClick = () => {
        setAdd(current => !current)
    }

    const closeAdd = () => {
        setAdd(current => !current)
    }

    useEffect(() => {
        dispatch(getDashUsers());
    }, [users]);

    return (
        <div className="center">
            <div className="ViewAll">
                <div className="option">
                    <h4><FaBlackTie />&nbsp; Users</h4>
                    <div>
                        <Link to="/Dashboard">Back to Dashboard</Link>&nbsp;&nbsp;
                        <Link to="/AllUsers" onClick={onClick}>Create New User</Link>
                    </div>
                </div>  
                <div>
                {add === true && (
                    <AllAddNewUser closeAdd={closeAdd} />
                )}
            </div>
                <div className="Inputs">
                    <Label>Total <b>{users.length}</b> Users</Label>
                    <div >
                        <Label>Sort by: </Label>&nbsp;
                        <select>
                            <option value="recentlyAdded">Recently Added</option>
                            <option value="leastAdded">Least Added</option>
                            <option value="a-z">A-Z By Username</option>
                            <option value="z-a">Z-A By Username</option>
                        </select><br />
                    </div>
                    <Input type="search" placeholder="Search" name="search" onChange={(e) => { setSearchUser(e.target.value) }} />
                </div>
                <div>{usersList}</div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return { data: state }
}

export default connect(mapStateToProps)(DashUsers);