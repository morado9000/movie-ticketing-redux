import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "./admin/AuthContext"

import { default as facebook } from "../img/icon-facebook.svg";
import { default as instagram } from "../img/icon-instagram.svg";
import { default as pinterest } from "../img/icon-pinterest.svg";
import { default as twitter } from "../img/icon-twitter.svg";
import { default as youtube } from "../img/icon-youtube.svg";
import Modal from "./movielist/Modal";
import LoginForm from "./admin/LoginForm";


const AppHeader = () => {
    const { loginUser, logout } = useContext(AuthContext);

    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    let open = () => {
        setIsModalOpen(true);
    }

    let close = () => {
        setIsModalOpen(false);
    }

    


    return (
        <div className="relative flex flex-col h-screen justify-between">
            <div className="border-solid border-b-2 border-gray bg-orange-500">
            <nav className="container mx-auto p-5 text-white">
                <div className="container flex flex-row items-center justify-between drop-shadow-md ">
                    <div className="pt-2">
                        <h1 className="font-bold text-4xl">
                            Movie Tickets
                        </h1>
                    </div>
                    <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 flex-row hidden md:block">
                        <Link to="/list">Home</Link>
                        {loginUser == "" ? (
                            <></>
                        ) : (
                            <>
                                <Link to="/admin/add">Add</Link>
                                <Link to="/admin/edit">Edit</Link>
                                <Link to="/admin/copy">Copy</Link>
                                <button>{loginUser}</button>
                                <button onClick={() => logout()}>Logout</button>
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
                        {loginUser == null ? (
                            <button onClick={open}>Login</button>
                        ) : (
                            <>
                                <Link to="/admin/add">Add</Link>
                                <Link to="/admin/edit">Edit</Link>
                                <Link to="/admin/copy">Copy</Link>
                                <button>{loginUser}</button>
                                <button onClick={() => logout()}>Logout</button>
                            </>
                        )}
                    </div>
            </nav>
            

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

        <Modal openState={isModalOpen} handleClose={close}>
                <LoginForm />
        </Modal>
      </div>
    )
}

export default AppHeader;