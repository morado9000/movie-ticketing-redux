require('dotenv').config();
const express = require('express');

const app = express();
const port = 3030;

const getMovieAPI = async () => { 
    const res = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=' + process.env.REACT_APP_MOVIEDB_KEY + '&language=en-US&page=1');
    const json = await res.json();

    let myList = [];
    for(result of json.results){
        let newRes = await fetch('https://api.themoviedb.org/3/movie/' + result.id + '?api_key=' + process.env.REACT_APP_MOVIEDB_KEY + '&language=en-US')
        let newJson = await newRes.json();
        myList.push(newJson);
    }
    app.get('/moviedb', (req, res) => {
        res.send(myList);
    });
}

getMovieAPI();

app.listen(port, () => {
    console.log("Listening at port " + port);
});

