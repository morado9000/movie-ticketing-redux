package com.mattm.showtime.showtime;

import com.mattm.showtime.movie.Movie;
import com.mattm.showtime.movie.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1/showtime")
public class ShowtimeController {

    private final ShowtimeService showtimeService;

    private final MovieRepository movieRepository;

    @Autowired
    public ShowtimeController(ShowtimeService showtimeService, MovieRepository movieRepository) {
        this.showtimeService = showtimeService;
        this.movieRepository = movieRepository;
    }

    @GetMapping
    public List<Showtime> getShows(){
        return showtimeService.getShows();
    }

    @GetMapping(path = "filter/dts/{date}&{time}&{screen}")
    public Optional<List<Showtime>> getShowtimeByTimeAndScreen(@PathVariable("date") LocalDate date, @PathVariable("time") LocalTime time, @PathVariable("screen") Integer screen) { return showtimeService.getShowtimeByTimeAndScreen(date, time, screen); }

    @GetMapping(path = "filter/date/{date}")
    public Optional<List<Showtime>> getShowtimeByDate(@PathVariable("date") LocalDate date){
        return showtimeService.getShowtimeByDate(date);
    }

    @ResponseStatus(value = HttpStatus.CREATED,reason = "Showtime added")
    @PostMapping("{movie}")
    public void addNewShow(@RequestBody Showtime showtime, @PathVariable("movie") Long id){
        Movie movie = movieRepository.findById(id).orElseThrow(
                () -> new IllegalStateException(("FUCK"))
        );
        movie.getShowtimes().add(showtime);
        Showtime newShowtime = new Showtime();
        newShowtime.setScreenNum(showtime.getScreenNum());
        newShowtime.setCapacity(showtime.getCapacity());
        newShowtime.setDate(showtime.getDate());
        newShowtime.setTime(showtime.getTime());
        newShowtime.setMovie(movie);
        showtimeService.addNewShow(newShowtime);
    }

    @ResponseStatus(value = HttpStatus.NO_CONTENT, reason = "Showtime deleted")
    @DeleteMapping(path = "{show}")
    public void deleteShow(@PathVariable("show") Long id){
        showtimeService.deleteShow(id);
    }

    @ResponseStatus(value = HttpStatus.NO_CONTENT, reason = "Showtime updated")
    @PutMapping(path = "{show}")
    public void updateStudent(@PathVariable("show") Long id, @RequestBody Showtime newShowtime){
        showtimeService.updateShow(id, newShowtime);
    }

}
