import { useEffect, useState } from "react"
import { getMovies, postMovieAPI } from "../../utils"


export default function MovieAdd() {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const MOVIEDB_KEY = process.env.MOVIEDB_KEY;

    console.log("Movie key: " + MOVIEDB_KEY);

    async function submitMovie(e) {
        e.preventDefault();
        const json = JSON.parse(e.target.value)
        console.log(json);
        const message = await postMovieAPI(`{
            "movieName": "${json.title}",
            "posterUrl": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2${json.posterUrl}"
        }`);
        alert(message.message);
    }

    function generateAll() {
        for(let movie of movies) {
            postMovieAPI(`{
                "movieName": "${movie.title}",
                "posterUrl": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}"
            }`)
        }
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
            <div className="container flex flex-col items-center justify-center my-6 mx-auto">
            {loading === false ? (
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
                            
            ) : (
                <div>
                    <p>Loading</p>
                </div>
            )}
            </div>
        </>
    )
}