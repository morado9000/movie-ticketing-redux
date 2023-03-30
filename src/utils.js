export const getMovies = async () => {
    let res = await fetch('/moviedb');
    let json = await res.json();
    return json;
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
    json.sort((a,b) => {
        b.showtimes.sort((a,b) => {
            return new Date(a.date + 'T' + a.time)- new Date(b.date + 'T' + b.time);
        });
        const nameA = a.movieName.toUpperCase();
        const nameB = b.movieName.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
        return 1;
        }
        
        return 0;
    })
    await json
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