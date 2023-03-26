import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { selectLoginUser, login, logout } from "./admin/authSlice"

import { default as facebook } from "../img/icon-facebook.svg";
import { default as instagram } from "../img/icon-instagram.svg";
import { default as pinterest } from "../img/icon-pinterest.svg";
import { default as twitter } from "../img/icon-twitter.svg";
import { default as youtube } from "../img/icon-youtube.svg";
import Modal from "./movielist/Modal";


const AppHeader = () => {
    const logusername = useSelector(selectLoginUser);
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    let open = () => {
        setIsModalOpen(true);
    }

    let close = () => {
        setIsModalOpen(false);
    }

    function handleUserNameChange(e) {
        setUserName(e.target.value)
    }

    function handlePasswordChange (e) {
        setPassword(e.target.value)
    }


    function handleFormSubmit(e) {
        e.preventDefault();
        console.log("Logging in User: " + username);
        let user = username, pass =  password;
        dispatch(login({username: user, password: pass}));
        close();
        
    }


    return (
        <div className="flex flex-col h-screen justify-between">
            <div className="relative border-solid border-b-2 border-gray bg-orange-500">
            <nav className="relative container mx-auto p-5 text-white">
                <div className="container flex flex-row items-center justify-between drop-shadow-md ">
                    <div className="pt-2">
                        <h1 className="font-bold text-4xl">
                            Movie Tickets
                        </h1>
                    </div>
                    <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 flex-row hidden md:block">
                        <Link to="/list">Home</Link>
                        {logusername == null ? (
                            <button onClick={open}>Login</button>
                        ) : (
                            <>
                                <button>{logusername}</button>
                                <button onClick={() => dispatch(logout())}>Logout</button>
                            </>
                        )}
                        

                    </div>
                    <div onClick={() => setIsOpen((prev) => !prev)} className="cursor-pointer space-y-2 md:hidden">
                        <span className="block h-0.5 w-8 animate-pulse bg-white"></span>
                        <span className="block h-0.5 w-8 animate-pulse bg-white"></span>
                        <span className="block h-0.5 w-8 animate-pulse bg-white"></span>
                    </div>
                    
                </div>
                <div className={isOpen ? "flex flex-col absolute items-center self-end bg-white text-black z-10 py-8 mt-10 left-6 right-6 space-y-6 md:hidden sm:w-auto sm:self-center drop-shadow-md" : "hidden"}>
                        <Link to="/home">Home</Link>
                    </div>
            </nav>
            <Modal openState={isModalOpen} handleClose={close}>
                <div className="flex flex-col justify-content-center items-center">
                    <h2 className="text-4xl mb-6">Login</h2>
                    <form onSubmit={handleFormSubmit}>
                        <div>
                            <label htmlFor="username">Username: </label>
                            <input 
                                id="username"
                                name="username"
                                type="text" 
                                placeholder="Username"  
                                value={username}
                                onChange={handleUserNameChange}
                                className="rounded-full outline outline-gray-500 mb-3 p-1"
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password: </label>
                            <input 
                                id="password"
                                name="password"
                                type="password" 
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="rounded-full outline outline-gray-500 mb-3 p-1"
                            />
                        </div>
                        <div>
                            <button type="submit">Go</button>
                        </div>
                </form>
            </div>
            </Modal>

        </div>

        <Outlet />

        <section id="footer">
            <footer className="bg-slate-400">
                <div className="container flex flex-col-reverse justify-between px-6 py-10 mx-auto space-y-8 md:flex-row md:space-y-0">
                    <div className="flex flex-col-reverse items-center justify-between space-y-12 md:flex-col md:space-y-0 md:items-start">
                        <div className="mx-auto my-6 text-center md:hidden">
                            Copyright &copy; 2022, All Rights Reserved
                        </div>
    
                        <div className="flex justify-center space-x-4">
                            <a href="#">
                                <img src={facebook} alt="" />
                            </a>
                            <a href="#">
                                <img src={instagram} alt="" />
                            </a>
                            <a href="#">
                                <img src={pinterest} alt="" />
                            </a>
                            <a href="#">
                                <img src={twitter} alt="" />
                            </a>
                            <a href="#">
                                <img src={youtube} alt="" />
                            </a>
                        </div>
                    </div>
                    <div className="flex justify-around space-x-32">
                        <div className="flex flex-col space-y-3">
                            <Link to="/list">Home</Link>
                        </div>
                    </div>
    
                    <div className="flex flex-col justify-between">
                        <form action="">
                            <div className="flex space-x-3">
                                <input type="text" className="flex-1 px-4 rounded-full focus:outline-none" placeholder="Update in your inbox"/>
                                <button className="px-6 py-2 rounded-full focus:outline-none">
                                    Go
                                </button>
                            </div>
                        </form>
                        <div className="hidden md:block">
                            Copyright &copy; 2022, All Rights Reserved
                        </div>
                    </div>
                </div>
    
            </footer>
        </section>
      </div>
    )
}

export default AppHeader;