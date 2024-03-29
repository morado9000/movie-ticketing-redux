import { useLocation, useNavigate } from "react-router-dom"


export default function Checkout() {


    const location = useLocation();
    const navigate = useNavigate();

    function stateClear(){
        navigate("/list", {});
    }

    return (
   
        <>
            <section id="checkout">
                <div className="container flex flex-col justify-between mx-auto py-6 md:flex-row md:w-1/2">
                    <div className="flex flex-col py-6">
                            <form className="flex flex-col">
                                <label className="text-1xl font-bold mx-3">Name</label>
                                <input className="bg-gray-200 rounded-full mb-6" type="text" />

                                <label className="text-1xl font-bold mx-3">Email</label>
                                <input className="bg-gray-200 rounded-full mb-6" type="text" />
                                
                                <label className="text-1xl font-bold mx-3">Billing Address</label>
                                <input className="bg-gray-200 rounded-full mb-12" type="text" />

                                <label className="text-1xl font-bold mx-3">Card Number</label>
                                <input className="bg-gray-200 rounded-full mb-6" type="text" />

                                <label className="text-1xl font-bold mx-3">Security code</label>
                                <input className="bg-gray-200 rounded-full mb-6" type="text" />

                                <label className="text-1xl font-bold mx-3">Expiration Date</label>
                                <input className="bg-gray-200 rounded-full mb-6" type="text" />

                                <button type="submit" onClick={() => stateClear()}>Submit</button>

                            </form> 
                    </div>

                    <div className="flex flex-col w-1/2 bg-slate-50 self-start p-6">
                        <div className="flex flex-row justify-between mb-3">
                            <p className="text-1xl">Movie: </p>
                            <p className="text-1xl">{location.state.movieName}</p>
                        </div>

                        <div className="flex flex-row justify-between mb-3">
                            <p className="text-1xl">Screen: </p>
                            <p className="text-1xl">{location.state.theater}</p>
                        </div>

                        <div className="flex flex-row justify-between mb-3">
                            <p className="text-1xl">Date: </p>
                            <p className="text-1xl">{location.state.date}</p>
                        </div>

                        <div className="flex flex-row justify-between mb-3">
                            <p className="text-1xl">Time: </p>
                            <p className="text-1xl">{location.state.time}</p>
                        </div>

                        <div className="flex flex-row justify-between mb-3">
                            <p className="text-1xl">Tickets: </p>
                            <p className="text-1xl">{location.state.ticketNum}</p>
                        </div>

                        <div className="flex flex-row justify-between mb-3">
                            <p className="text-1xl">Price: </p>
                            <p className="text-1xl">${parseInt(location.state.price) * parseInt(location.state.ticketNum)}</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}