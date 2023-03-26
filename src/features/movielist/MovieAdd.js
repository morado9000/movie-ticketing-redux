import { useEffect, useState } from "react"
import { getMovies, postMovieAPI } from "../../utils"
import Modal from "./Modal";


export default function MovieAdd() {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");

    async function submitMovie(e) {
        e.preventDefault();
        const json = JSON.parse(e.target.value)
        const message = await postMovieAPI(`{
            "movieName": "${json.title}",
            "posterUrl": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2${json.posterUrl}"
        }`);
        setMessage(message.message);
        open();
    }

    function generateAll() {
        for(let movie of movies) {
            postMovieAPI(`{
                "movieName": "${movie.title}",
                "posterUrl": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}"
            }`)
        }
    }

    let open = () => {
        setIsOpen(true);
    }

    let close = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        setLoading(true);
        const myFunction = async () => {
            await getMovies()
            .then(mov => setMovies([...mov]))
            .then(setLoading(false));
        }
        myFunction();
        
    }, []);


    return (
        <>
            <div className="container relative z-0 flex flex-col items-center justify-center my-6 mx-auto">
            {loading === false ? (
                        <>
                            <>
                                <h2 className="text-4xl bold">Add New Movie</h2>
                                <div className="flex flex-col my-6 divide-y divide-solid">
                                
                                    {movies.map((movie, index) => {
                                        return (
                                            <div className="flex flex-row items-center justify-between space-x-6 py-6">
                                                <p>{movie.title}</p>
                                                <button className="p-3 bg-orange-500 text-white " type="button" value={JSON.stringify({title: movie.title, posterUrl: movie.poster_path})} onClick={submitMovie}>Add Movie</button>
                                            </div>
                                        )
                                    })}
                                </div>

                                <button className="p-3 bg-orange-500 text-white" onClick={generateAll}>Generate All</button>
                            </>
                            <Modal openState={isOpen} handleClose={close}>
                                <div className="flex flex-col flex-wrap justify-center items-center">
                                    <p className="text-2xl">{message}</p>
                                </div>
                                    
                            </Modal>
                        </>
                            
            ) : (
                <div>
                    <p>Loading</p>
                </div>
            )}
            </div>
        </>
    )
}