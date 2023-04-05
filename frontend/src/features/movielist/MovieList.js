import { useEffect, useState,useContext } from "react";
import { useDispatch, useSelector } from "react-redux"
import { moviesDateLoadAsync, moviesLoadAsync, selectMovies, selectStatus } from "./movieListSlice"
import Modal from "./Modal";
import { Link } from "react-router-dom";
import MovieEdit from "./MovieEdit";
import { AuthContext } from "../admin/AuthContext";


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

    const {loginUser} = useContext(AuthContext);

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

    function getConsistentDate(date){
        if(date.length == 10) {
            return  (<>0{(date.substring(0,4))}{(date.substring(7))}</>)
        } 
        else {
            return (<>{(date.substring(0,5))}{(date.substring(8))}</>)
        }
    }
    
    useEffect(() => {
        const loadDates = async () => {
            setLoadDates(true);
            let newDates = new Array(new Date());
            const date = new Date();
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
        .then(dispatch(moviesDateLoadAsync(currDate.toISOString().substring(0,10))))
    }, [])

    useEffect(() => {
        dispatch(moviesDateLoadAsync(currDate.toISOString().substring(0,10)))
    }, [currDate])

    return (
        <>
           <section id="list" className="mb-auto">
                <div className="container mx-auto relative z-0">
                    {loadDates == false ? (
                        <div className="flex flex-row px-6 my-3 text-center self-start overflow-x-scroll w-full flex-1">
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
                        <div className="flex flex-col self-start px-6 my-3">

                        {status == "idle" ? (
                            <>
                            
                                
                                    {movies.map(movie => 
                                        <div className="flex flex-col border border-black rounded-lg justify-start my-3 md:flex-row">
                                            <div className="flex flex-col items-center">
                                                <h1 className="font-bold text-2xl mt-6 mb-6">{movie.movieName}</h1>
                                                <img className="mb-6 md:w-1/2" src={movie.posterUrl} alt="" />
                                                {loginUser == process.env.REACT_APP_MOVIE_USER ? (
                                                    <Link to="/admin/edit" state={{myCurrMovie: movie}} className="px-6 py-6 m-3 rounded-full bg-red-500 text-white text-1xl">Add</Link>
                                                ): (<></>)}  
                                            </div>
                                            <div className="flex flex-row flex-wrap content-start md:w-1/2">
                                                {movie.showtimes.map((showtime, index) =>
                                                    <>
                                                            <button className="p-5 m-3 bg-orange-500 text-white"
                                                                onClick={() => {setCurrMovie(movie); setCurrShowtime(showtime); open();}}>{(getConsistentDate(new Date(showtime.date + "T" + showtime.time).toLocaleTimeString('en-US')))}
                                                            </button>
                                                        
                                                    </>
                                                )}
                                            </div>
                                        </div>     
                                    )}

                                <Modal openState={isOpen} handleClose={close}>
                                    <div className="flex flex-col justify-center items-center">
                                        <h1 className="font-bold text-1xl mt-6 mb-6">{currMovie.movieName}</h1>
                                        <img className="md:w-1/2" src={currMovie.posterUrl} alt="" />
                                            <p className="mx-3 text-1xl font-bold">{(new Date(currShowTime.date + "T" + currShowTime.time)).toLocaleTimeString()}</p>
                                            <p className="mx-3 text-1xl font-bold">Seats left: {currShowTime.capacity}</p>
                                        <div className="flex flex-row items-center text-center justify-center px-6 mx-auto md:w-1/2">
                                            <p className="mx-3 text-1xl font-bold">Tickets</p>
                                            <select 
                                                name="quantity" 
                                                value={quantity} 
                                                onChange={handleQuantityChange}>
                                                {options}
                                            </select>
                                            <div className="p-5 m-3 bg-orange-500 text-white">
                                                <Link to="/checkout" state={{movieName: currMovie.movieName, price:10.00, ticketNum:quantity, theater:currShowTime.screenNum, date:(new Date(currShowTime.date + "T" + currShowTime.time)).toLocaleDateString(), time:(new Date(currShowTime.date + "T" + currShowTime.time)).toLocaleTimeString() }}>Checkout</Link>
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

                            
                </div>
           </section>
            
        </>
    )
}