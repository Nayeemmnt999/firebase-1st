import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SingupContext } from '../../App';

const Navbar = () => {
    const { signIn ,signOutProfile} = useContext(SingupContext)
    // console.log(signIn);
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <NavLink to={'home'} className="btn btn-ghost normal-case text-xl">Nayeem.Dev</NavLink>
                </div>
                <div className="flex-none gap-2">
                    <div className="form-control">

                    </div>
                    <input type="text" placeholder="Search" className="input input-bordered" />
                    {
                        signIn.uid ? '' : <NavLink className={' ms-5 me-5 font-bold'} to={'signup'}>Signup</NavLink>
                    }

                    <h4>{signIn.displayName}</h4>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                          <div className="w-10 rounded-full">
                                {
                                    signIn.uid ? <img src={signIn.photoURL} alt="" /> : <img src="https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg" alt="" />
                                }
                            </div>


                        </label>
                        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <Link to={'signup'} className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a onClick={signOutProfile}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;