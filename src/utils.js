export const getMovies = async () => {
    let res = await fetch('/moviedb');
    let json = await res.json();
    return json.results;
}

export const getAPI = async () => {
    let res = await fetch('/api/v1/showtime');
    let json = await res.json();
    return json;
}

export const postShowtimeAPI = async (req, movie_id) => {
    let res = await fetch("/api/v1/showtime/" + movie_id, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: req,
     });
    let json = await res.json();
    return json;
}

export const deleteShowtimeAPI = async (id) => {
    let res = await fetch("/api/v1/showtime/" + id, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
     });
    return res;
}

export const getMovieAPI = async() => {
    let res = await fetch("/api/v1/movie", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    let json = await res.json();
    return json;
}

export const getMovieAPIById = async(id) => {
    let res = await fetch("/api/v1/movie/" + id, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    let json = await res.json();
    return json;
}

export const postMovieAPI = async(req) => {
    let res = await fetch("/api/v1/movie", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: req
    });
    let json = await res.json();
    return json;
}

export const deleteMovieAPI = async(id) => {
    let res = await fetch("/api/v1/movie/" + id, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    return res;
}