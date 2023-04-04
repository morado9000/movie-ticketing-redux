import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { deleteMovieAPI, deleteShowtimeAPI, getMovieAPI, getMovieAPIById, getMovies, postMovieAPI, postShowtimeAPI } from "../../utils"
import Modal from "./Modal";


export default function MovieEdit({movie = {movieName: "", posterUrl: "", showtimes: [] }}) {

    const [movies, setMovies] = useState([]);
    const [currMovie, setCurrMovie] = useState({});
    const [currShowtime, setCurrShowtime] = useState(0);
    const [currTime, setCurrTime] = useState("7:00");
    const [currDate, setCurrDate] = useState("");
    const [currScreen, setCurrScreen] = useState(1);
    const [currCapacity, setCurrCapacity] = useState(0)
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isDeletShowtimeOpen, setIsDeleteShowtimeOpen] = useState(false);
    const [message, setMessage] = useState("");

    const location = useLocation();
    
    

    const options = Array.from(Array(12).keys());

    const times = [];
    for (let i=7; i < 23; i++) {
        for (let j=0; j < 4; j++) {
            times.push(`${i < 10 ? `0` : ``}${i}:${j === 0 ? `00` : 15*j}`);
        }
    }

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

    async function reloadList(newMovie){
        let res = await getMovieAPI()
        let newList = [...res];
        setMovies(newList);
        let newCurrMovie = {};
        if(newMovie){
            newCurrMovie = await getMovieAPIById(newMovie)
        }
        else{
            newCurrMovie = movie;
        }
        
        setCurrMovie(newCurrMovie);  
    }

    async function submitMovie(e) {
        e.preventDefault();
        const message = await postShowtimeAPI(`{
            "screenNum": "${currScreen}",
            "capacity": ${currCapacity},
            "date": "${currDate.substring(0,10)}",
            "time": "${currTime}:00"
        }`,currMovie.id)
        setMessage(message.message);
        open();
        
    }

    async function deleteMovie() {
        const message = await deleteMovieAPI(currMovie.id)
        setMessage(message.message);
        await reloadList();
        deleteClose();  
    }

    async function deleteShowtime() {
        const message = await deleteShowtimeAPI(currShowtime);
        await reloadList(currMovie.id)
        .then(deleteShowtimeClose());  
    }

    function handleCurrMovieChange(e) {
        setCurrMovie(JSON.parse(e.target.value));
    }

    function handleCurrScreenChange(e) {
        setCurrScreen(e.target.value);
    }

    function handleCurrDateChange(e) {
        setCurrDate(e.target.value);
    }

    function handleCurrTimeChange(e) {
        setCurrTime(e.target.value);
    }

    function handleCapacityChange(e) {
        setCurrCapacity(e.target.value);
    }

    let open = () => {
        setIsOpen(true);
    }

    let close = async (movie) => {
        await reloadList(movie)
        setIsOpen(false);
    }

    async function deleteOpen(){
        setIsDeleteOpen(true);
    }

    async function deleteClose(){
        setIsDeleteOpen(false);
    }

    async function deleteShowtimeOpen(showtime){
        setCurrShowtime(showtime);
        setIsDeleteShowtimeOpen(true);     
    }

    async function deleteShowtimeClose(){
        setIsDeleteShowtimeOpen(false);
    }

    useEffect(() => {
        setLoading(true);
        const myFunction = async () => {
            await getMovieAPI()
            .then(res => setMovies([...res]))
            .then(location.state == null ? (setCurrMovie(movie)) : (setCurrMovie(location.state.myCurrMovie)))
            .then(setLoading(false));
            if(location.state == null){
                setCurrMovie(movie)
            }
            else{
                setCurrMovie(location.state.myCurrMovie);
            }
            
        }
        myFunction();
        
    }, []);

    return (
        <>
            
            <div className="w-full flex flex-col items-center justify-content-center z-0 mx-auto">
                {loading == false ? (
                    <div className="flex flex-col md:w-1/2 md:flex-row">
                        <form onSubmit={submitMovie}> 
                            <div className="flex flex-col items-center justify-content-center space-y-6">
                                {currMovie.movieName != "" ? (
                                    <>
                                        <h1 className="font-bold text-2xl mt-6 mb-6">{currMovie.movieName}</h1>
                                        <img className="mb-6 md:w-1/2" src={currMovie.posterUrl} alt="" />
                                        <button type="button" onClick={deleteOpen} className="px-6 py-6 m-3 rounded-full bg-red-500 text-white text-1xl">Delete</button>

                                    </>
                                ) : (
                                    <>
                                        <h1 className="font-bold text-2xl mt-6 mb-6"></h1>
                                        <img className="mb-6 md:w-1/2" src="" alt="" />

                                    </>
                                )}

                                <select 
                                    name="movie"
                                    value={JSON.stringify(currMovie)}
                                    onChange={handleCurrMovieChange}>
                                        <option>Pick a movie</option>
                                        {movies.map((movie, index) => {
                                            return <option value={JSON.stringify(movie)} key={index} >
                                                {movie.movieName}
                                        </option>
                                        })}
                                    </select>
                                <select
                                    name="screens"
                                    value={currScreen}
                                    onChange={handleCurrScreenChange}>
                                        <option>Pick a screen</option>
                                        {options.map((option, index) => {
                                            return <option key={index} >
                                                {option+1}
                                        </option>
                                        })}
                                </select>
                                <select 
                                    name="dates"
                                    onChange={handleCurrDateChange}>
                                        <option>Pick a date</option>
                                        {dates.map((date, index) => {
                                            return <option key={index} value={date.toISOString()} >
                                                {date.toDateString()}
                                        </option>
                                        })}
                                </select>
                                <select 
                                    name="times"
                                    value={currTime}
                                    onChange={handleCurrTimeChange}>
                                        <option>Pick a time</option>
                                        {times.map((time, index) => {
                                            return <option key={index} >
                                                {time}
                                        </option>
                                        })}
                                </select>
                                <input type="text" placeholder="Theater Size" onChange={handleCapacityChange}/>
                                <button>
                                    Submit
                                </button>
                            </div>
                        </form>
                         <div className="flex flex-col content-start md:flex-row md:flex-wrap">
                            {currMovie.showtimes.map((showtime, index) =>
                                <div className="flex flex-col text-center">
                                    <p className="mt-3">{(new Date(showtime.date + "T" + showtime.time)).toLocaleDateString()}</p>
                                    <button onClick={() => deleteShowtimeOpen(showtime.id)} className="px-6 py-6 mb-3 mx-3 rounded-full bg-red-500 text-white text-1xl"
                                        >{(new Date(showtime.date + "T" + showtime.time)).toLocaleTimeString()}
                                    </button>
                                </div>
                            )}
                         </div>
                        <Modal openState={isOpen} handleClose={() => close(currMovie.id)}>
                            <p className="text-2xl">{message}</p>
                        </Modal>

                        <Modal openState={isDeleteOpen} handleClose={deleteClose}>
                            <div className="flex flex-col justify-content-center items-center">
                                <p className="text-2xl">Are you sure?</p>
                                <div className="flex flex-col justify-content-center items-center md:flex-row">
                                    <button onClick={deleteClose} className="px-6 py-6 m-3 rounded-full bg-white text-black text-1xl">Cancel</button>
                                    <button onClick={deleteMovie} className="px-6 py-6 m-3 rounded-full bg-red-500 text-white text-1xl">Delete</button>
                                </div>
                            </div>
                        </Modal>

                        <Modal openState={isDeletShowtimeOpen} handleClose={deleteShowtimeClose}>
                            <div className="flex flex-col justify-content-center items-center">
                                <p className="text-2xl">Are you sure?</p>
                                <div className="flex flex-col justify-content-center items-center md:flex-row">
                                    <button onClick={deleteShowtimeClose} className="px-6 py-6 m-3 rounded-full bg-white text-black text-1xl">Cancel</button>
                                    <button onClick={deleteShowtime} className="px-6 py-6 m-3 rounded-full bg-red-500 text-white text-1xl">Delete</button>
                                </div>
                            </div>
                        </Modal>
                    </div>
                ) : (
                    <p>Loading</p>
                )}
            </div>
        </>
    )
}