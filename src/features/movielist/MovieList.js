import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { moviesLoadAsync, selectMovies, selectStatus } from "./movieListSlice"
import Modal from "./Modal";
import { Link } from "react-router-dom";
import MovieEdit from "./MovieEdit";


export default function MovieList() {
    const movies = useSelector(selectMovies);
    const status = useSelector(selectStatus);
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setEditIsOpen] = useState(false);

    const [quantity, setQuantity] = useState(1);
    const [currMovie, setCurrMovie] = useState({});
    const [currShowTime, setCurrShowtime] = useState({});
    const [dates, setDates] = useState([]);
    const [currDate, setCurrDate] = useState(new Date());
    const [loadDates, setLoadDates] = useState(true);

    let open = () => {
        setIsOpen(true);
    }

    let close = () => {
        setIsOpen(false);
    }

    let openEdit = () => {
        setEditIsOpen(true);
    }

    let closeEdit = () => {
        setEditIsOpen(false);
    }

    var options = []; 
    for (var i = 1; i <= 10; i++) {
        options.push(<option value={i} key={i} >{i}</option>);
    }

    

    function handleQuantityChange(e){
        setQuantity(e.target.value);
    }

    function handleCurrDateChange(newdate){
        setCurrDate(newdate)
    }
    
    useEffect(() => {
        const loadDates = async () => {
            setLoadDates(true);
            let newDates = [];
            const date = new Date();
            newDates.push(date);
            for(let i=1; i<20; i++){
                date.setDate(date.getDate() + 1)
                newDates.push(new Date(date));
            }
            newDates.sort((a,b) =>{
                return a-b;
            });
            setDates([...newDates]);
            return newDates;
        }
        loadDates()
        .then(sdates => setCurrDate(sdates[0]))
        .then(setLoadDates(false))
        .then(dispatch(moviesLoadAsync()))
    }, [])

    return (
        <>
           <section id="list">
                <div className="container flex flex-col justify-content-center mx-auto relative z-0">
                        {status == "idle" ? (
                            <>
                            {loadDates == false ? (
                                <div className="flex flex-row px-6 my-3 justify-self-center text-center overflow-x-scroll w-full">
                                            {dates.map(date => 
                                                <div value={date}>
                                                {date.toDateString() == currDate.toDateString() ? (
                                                    <button onClick={() => handleCurrDateChange(date)} className="border-2 border-solid border-orange-500 px-6 mx-3 text-2xl">{date.toDateString()}</button>
                                                ) : (
                                                    <button onClick={() => handleCurrDateChange(date)} className="border-2 border-solid border-black px-6 mx-3 text-2xl">{date.toDateString()}</button>
                                                )}
                                                </div>
                                            )}
                                </div>
                            ) : (<></>)}
                                
                                <div className="flex flex-col px-6 my-3">
                                    {movies.map(movie => 
                                        <div className="flex flex-col border border-black rounded-lg justify-start my-3 md:flex-row">
                                            <div className="flex flex-col items-center">
                                                <h1 className="font-bold text-2xl mt-6 mb-6">{movie.movieName}</h1>
                                                <img className="mb-6 md:w-1/2" src={movie.posterUrl} alt="" />
                                                <Link to="/admin/edit" state={{myCurrMovie: movie}} className="px-6 py-6 m-3 rounded-full bg-red-500 text-white text-1xl">Add</Link>
                                            </div>
                                            <div className="flex flex-row flex-wrap content-start md:w-1/2">
                                                {movie.showtimes.map((showtime, index) =>
                                                    <>
                                                        {(new Date(showtime.date + "T" + showtime.time)).toDateString() == currDate.toDateString() ? (
                                                            <button className="px-6 py-6 m-3 rounded-full bg-orange-500 text-white text-1xl"
                                                                onClick={() => {setCurrMovie(movie); setCurrShowtime(showtime); open();}}>{(new Date(showtime.date + "T" + showtime.time)).toLocaleTimeString()}
                                                            </button>
                                                        ) : (<></>)}
                                                        
                                                    </>
                                                )}
                                            </div>
                                        </div>     
                                    )}
                                </div>

                                <Modal openState={isOpen} handleClose={close}>
                                    <div className="flex flex-col justify-center items-center">
                                        <h1 className="font-bold text-1xl mt-6 mb-6">{currMovie.movieName}</h1>
                                        <img className="md:w-1/2" src={currMovie.posterUrl} alt="" />
                                            <p className="mx-3 text-1xl font-bold">{(new Date(currShowTime.time)).toLocaleTimeString()}</p>
                                            <p className="mx-3 text-1xl font-bold">Seats left: {currShowTime.capacity}</p>
                                        <div className="flex flex-row items-center text-center justify-center px-6 mx-auto md:w-1/2">
                                            <p className="mx-3 text-1xl font-bold">Tickets</p>
                                            <select 
                                                name="quantity" 
                                                value={quantity} 
                                                onChange={handleQuantityChange}>
                                                {options}
                                            </select>
                                            <div className="px-6 py-3 my-3 mx-3 rounded-full bg-orange-500 text-white">
                                                <Link to="/checkout" state={{movieName: currMovie.movieName, price:10.00, ticketNum:quantity, theater:currShowTime.screen, time:(new Date(currShowTime.time)).toLocaleTimeString() }}>Checkout</Link>
                                            </div>
                                        </div>
                                    </div>
                                 </Modal>

                                 <Modal openState={isEditOpen} handleClose={closeEdit}>
                                    <MovieEdit currMovie={currMovie} />
                                 </Modal>
                            </>
                        ) : (
                            <>
                                <p>Loading</p>
                            </>
                        )}
                            
                </div>
           </section>
            
        </>
    )
}