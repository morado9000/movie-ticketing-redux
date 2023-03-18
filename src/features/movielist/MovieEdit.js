import { useEffect, useState } from "react"
import { getMovieAPI, getMovies, postMovieAPI, postShowtimeAPI } from "../../utils"


export default function MovieEdit() {

    const [movies, setMovies] = useState([]);
    const [currMovie, setCurrMovie] = useState("");
    const [currTime, setCurrTime] = useState("7:00");
    const [currDate, setCurrDate] = useState("");
    const [currScreen, setCurrScreen] = useState(1);
    const [currCapacity, setCurrCapacity] = useState(0)
    const [loading, setLoading] = useState(true);

    const options = Array.from(Array(12).keys());

    const times = [];
    for (let i=7; i < 23; i++) {
        for (let j=0; j < 4; j++) {
            times.push(`${i < 10 ? `0` : ``}${i}:${j === 0 ? `00` : 15*j}`);
        }
    }

    const dates = new Array();
    const date = new Date();
    dates.push(date);
    for(let i=1; i<20; i++){
        date.setDate(date.getDate() + 1)
        const newDate = new Date(date);
        dates.push(newDate);
    }
    dates.sort((a,b) =>{
        return a-b;
    });

    const submitMovie = (e) => {
        e.preventDefault();
        const json = JSON.parse(currMovie);
        console.log(currDate.substring(0,11) + currTime)
        postShowtimeAPI(`{
            "screenNum": "${currScreen}",
            "capacity": ${currCapacity},
            "time": "${currDate.substring(0,11) + currTime}:00"
        }`,json.id)
    }

    function handleCurrMovieChange(e) {
        setCurrMovie(e.target.value);
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

    useEffect(() => {
        setLoading(true);
        const myFunction = async () => {
            await getMovieAPI()
            .then(mov => setMovies([...mov]))
            .then(setLoading(false));
        }
        myFunction();
        
    }, []);


    return (
        <>
            <div className="container flex flex-col items-center justify-center mx-auto">
            {loading === false ? (
                    <form onSubmit={submitMovie}> 
                        <div className="flex flex-col space-y-6">

                            <select 
                                name="movie"
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
                                name="times"
                                onChange={handleCurrDateChange}>
                                    <option>Pick a time</option>
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
            ) : (
                <div>
                    <p>Loading</p>
                </div>
            )}
            </div>
        </>
    )
}