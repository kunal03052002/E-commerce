import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
const Nav = () =>{
    const auth =localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = ()=>{
        // console.warn("apple");
        localStorage.clear();
        navigate('/signup');
    }
    return (
        <div className='nav-div' >
            <ul className="nav-ul" >
                {
                    auth ? (
                        <>
                        <li><Link to = "/">Products</Link></li>
                        <li><Link to = "/add">Add products</Link></li>
                        <li><Link to = "/update">Update products</Link></li>
                        <li><Link to = "/profile">Profile</Link></li>
                        <li><Link to="/signup" onClick={logout}>Logout </Link></li>
                        {/* ({JSON.parse(auth).name}) */}
                        </>
                    ) : (
                        <ul className="nav-right">
                            <>
                            <li><Link to="/signUp">Signup</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            </>
                        </ul>
                    )
                }
            </ul>
        </div>
    )
}

export default Nav;







