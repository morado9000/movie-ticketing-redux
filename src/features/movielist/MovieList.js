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
    const [currID, setCurrID] = useState(0);
    const [currTime, setCurrTime] = useState(0);
    const [quantity, setQuantity] = useState(1);


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
    
    useEffect(() => {
        dispatch(moviesLoadAsync('09cb9a6c9f94cea4a897ff9b9faf68a5'));
    }, [])

    return (
        <>
           <section id="list">
                <div className={"container relative flex flex-wrap flex-col z-0 items-center justify-center px-6 py-10 mx-auto md:flex-row"}>
                        {status == "idle" ? (
                            <>
                                {movies.map(movie => 
                                    <div className="flex flex-col border-2 border-black rounded-lg items-center text-center justify-center px-6 mx-auto my-3">

                                        <h1 className="font-bold text-1xl mt-6 mb-6">{movie.title}</h1>
                                        <img onClick={() => {setCurrID(movie.id); open();}} className="md:w-1/2" src={movie.poster_path} alt="" />
                                        <div className="flex flex-row flex-wrap items-center text-center justify-center px-6 mx-auto md:w-1/2">
                                            {movie.theatre.showtimes.map((showtime, index) =>
                                                <div className="px-6 py-6 my-3 mx-auto rounded-full bg-orange-500 text-white">
                                                    <p onClick={() => {setCurrID(movie.id); setCurrTime(index); open();}} className="text-1xl cursor-pointer">{showtime.time}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>     
                                )}

                                <Modal openState={isOpen} handleClose={close}>
                                    <h1 className="font-bold text-1xl mt-6 mb-6">{movies[currID].title}</h1>
                                    <img className="md:w-1/2" src={movies[currID].poster_path} alt="" />
                                    <div className="flex flex-row flex-wrap items-center text-center justify-center px-6 mx-auto md:w-1/2">
                                        <p className="mx-3 text-1xl font-bold">{movies[currID].theatre.showtimes[currTime].time}</p>
                                        <p className="mx-3 text-1xl font-bold">Seats left: {movies[currID].theatre.showtimes[currTime].size}</p>
                                        <p className="mx-3 text-1xl font-bold">Tickets</p>
                                        <select 
                                            name="quantity" 
                                            value={quantity} 
                                            onChange={(e) => setQuantity(e.target.value)}>
                                            {options}
                                        </select>
                                        <div className="px-6 py-6 my-3 mx-3 rounded-full bg-orange-500 text-white">
                                            <Link to="/checkout" state={{movieName: movies[currID].title, price:10.00, ticketNum:quantity, theater:(currID+1), time:movies[currID].theatre.showtimes[currTime].time }}>Checkout</Link>
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