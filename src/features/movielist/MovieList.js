import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { moviesLoadAsync, selectMovies, selectStatus } from "./movieListSlice"
import Modal from "./Modal";
import { Link } from "react-router-dom";


export default function MovieList() {
    const movies = useSelector(selectMovies);
    const status = useSelector(selectStatus);
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [currMovie, setCurrMovie] = useState({});
    const [currShowTime, setCurrShowtime] = useState({});


    let open = () => {
        setIsOpen(true);
    }

    let close = () => {
        setIsOpen(false);
    }

    var options = []; 
    for (var i = 1; i <= 10; i++) {
        options.push(<option value={i} key={i} >{i}</option>);
    }

    function handleQuantityChange(e){
        setQuantity(e.target.value);
    }
    
    useEffect(() => {
        dispatch(moviesLoadAsync());
    }, [])

    return (
        <>
           <section id="list">
                <div className={"container flex justify-center mx-auto relative z-0"}>
                        {status == "idle" ? (
                            <>
                                <div className="flex flex-col px-6 my-3">
                                    {movies.map(movie => 
                                        <div className="flex flex-col border border-black rounded-lg justify-start my-3 md:flex-row">
                                            <div className="flex flex-col items-center">
                                                <h1 className="font-bold text-2xl mt-6 mb-6">{movie.movieName}</h1>
                                                <img className="mb-6 md:w-1/2" src={movie.posterUrl} alt="" />
                                            </div>
                                            <div className="flex flex-row flex-wrap content-start md:w-1/2">
                                                {movie.showtimes.map((showtime, index) =>
                                                    <button className="px-6 py-6 m-3 rounded-full bg-orange-500 text-white text-1xl"
                                                        onClick={() => {setCurrMovie(movie); setCurrShowtime(showtime); open();}}>{(new Date(showtime.time)).toLocaleTimeString()}
                                                    </button>
                                                )}
                                            </div>
                                        </div>     
                                    )}
                                </div>

                                <Modal openState={isOpen} handleClose={close}>
                                    <h1 className="font-bold text-1xl mt-6 mb-6">{currMovie.movieName}</h1>
                                    <img className="md:w-1/2" src={currMovie.posterUrl} alt="" />
                                    <div className="flex flex-row flex-wrap items-center text-center justify-center px-6 mx-auto md:w-1/2">
                                        <p className="mx-3 text-1xl font-bold">{(new Date(currShowTime.time)).toLocaleTimeString()}</p>
                                        <p className="mx-3 text-1xl font-bold">Seats left: {currShowTime.capacity}</p>
                                        <p className="mx-3 text-1xl font-bold">Tickets</p>
                                        <select 
                                            name="quantity" 
                                            value={quantity} 
                                            onChange={handleQuantityChange}>
                                            {options}
                                        </select>
                                        <div className="px-6 py-6 my-3 mx-3 rounded-full bg-orange-500 text-white">
                                            <Link to="/checkout" state={{movieName: currMovie.movieName, price:10.00, ticketNum:quantity, theater:currShowTime.screen, time:(new Date(currShowTime.time)).toLocaleTimeString() }}>Checkout</Link>
                                        </div>
                                    </div>
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