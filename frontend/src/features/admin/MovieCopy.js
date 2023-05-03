import { useEffect, useState } from "react";
import { copyShowtimeAPI, getMoviesByDateAPI } from "../../utils";
import Modal from "../movielist/Modal";

export default function MovieCopy() {

    const [newDate, setNewDate] = useState("");
    const [oldDate, setOldDate] = useState("");
    const [message, setMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [oldDates, setOldDates] = useState([]);
    const [newDates, setNewDates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getOldDates = async () => {
        const dates = new Array();
        const date = new Date();
        dates.push(new Date());
        for(let i=1; i<20; i++){
            date.setDate(date.getDate() + 1)
            let tempMovies = await getMoviesByDateAPI(date.toISOString().substring(0,10));
            if(tempMovies.length > 0){
                dates.push(new Date(date));
            }
        }
        dates.sort((a,b) =>{
            return a-b;
        });
        setOldDates([...dates])
    }

    const getNewDates = async () => {
        const dates = new Array();
        const date = new Date();
        dates.push(new Date());
        for(let i=1; i<20; i++){
            date.setDate(date.getDate() + 1)
            dates.push(new Date(date));
        }
        dates.sort((a,b) =>{
            return a-b;
        });
        setNewDates([...dates]);
    }

    async function submitMovie(e) {
        e.preventDefault();
        const message = await copyShowtimeAPI(oldDate.substring(0,10), newDate.substring(0,10));
        setMessage(message.message);
        open();  
    }


    function handleOldDateChange(e) {
        setOldDate(e.target.value);
    }
    function handleNewDateChange(e) {
        setNewDate(e.target.value);
    }

    let open = () => {
        setIsOpen(true);
    }

    let close = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        if(oldDates.length > 0 && newDates.length > 0)
            setIsLoading(false);
    }, [oldDates, newDates])

    useEffect(() => {
        const getDates = async () => {
            getOldDates();
            getNewDates();
        }
        getDates();
    }, [])

    return (
        <>
            <div className="container flex flex-col items-center justify-center z-0 mx-auto">
                {isLoading == false ? (
                <form onSubmit={submitMovie}>
                    <div className="flex flex-col items-center justify-center mx-auto md:space-x-10 md:flex-row">
                        <select 
                            name="dates"
                            onChange={handleOldDateChange}>
                                <option>Pick old date</option>
                                {oldDates.map((date, index) => {
                                    return <option key={index} value={date.toISOString()} >
                                        {date.toDateString()}
                                </option>
                                })}
                        </select>
                        <select 
                            name="dates"
                            onChange={handleNewDateChange}>
                                <option>Pick old date</option>
                                {newDates.map((date, index) => {
                                    return <option key={index} value={date.toISOString()} >
                                        {date.toDateString()}
                                </option>
                                })}
                        </select>
                        <button className="p-5 m-3 bg-orange-500 text-white">
                            Submit
                        </button>
                    </div>
                </form>
                ) : (
                    <></>
                )}
                <Modal openState={isOpen} handleClose={() => close()}>
                    <p className="text-2xl">{message}</p>
                </Modal>
            </div>
        </>
    )
}