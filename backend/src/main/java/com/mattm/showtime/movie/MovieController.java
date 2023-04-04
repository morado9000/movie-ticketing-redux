package com.mattm.showtime.movie;

import com.mattm.showtime.showtime.Showtime;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/movie")
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping
    public List<Movie> getMovies(){
        return movieService.getMovies();
    }

    @GetMapping("{movie}")
    public Movie getMovieById(@PathVariable("movie") Long id){
        return movieService.getMovieById(id);
    }

    @GetMapping("showtimes/{movie}")
    public List<Showtime> getShowtimesByMovieId(@PathVariable("movie") Long id){
        return movieService.getShowtimesByMovieId(id);
    }

    @GetMapping("filter/screenandtime/{screen}&{time}")
    public Optional<List<Movie>> getMoviesByScreenAndTime(@PathVariable("screen") Integer screen, @PathVariable("time") LocalDateTime time){
        return movieService.getMoviesByScreenAndTime(screen, time);
    }

    @GetMapping("filter/screen/{screen}")
    public Optional<List<Movie>> getMoviesByScreen(@PathVariable("screen") Integer screen){
        return movieService.getMoviesByScreen(screen);
    }

    @GetMapping("filter/date/{date}")
    public List<Movie> getMoviesByDate(@PathVariable("date") LocalDate date){
        return movieService.getMoviesByDate(date);
    }

    @ResponseStatus(value = HttpStatus.CREATED, reason = "Movie added")
    @PostMapping
    public void addMovie(@RequestBody Movie movie){
        movieService.addMovie(movie);
    }

    @ResponseStatus(value = HttpStatus.OK, reason = "Movie deleted")
    @DeleteMapping("{movie}")
    public void deleteMovie(@PathVariable("movie") Long id){
        movieService.deleteMovie(id);
    }

    @ResponseStatus(value = HttpStatus.NO_CONTENT, reason = "Movie updated")
    @PutMapping("{movie}")
    public void updateMovie(@PathVariable("movie") Long id, Movie movie){
        movieService.updateMovie(id, movie);
    }
}
