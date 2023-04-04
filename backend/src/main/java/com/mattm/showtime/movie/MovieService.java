package com.mattm.showtime.movie;

import com.mattm.showtime.showtime.Showtime;
import com.mattm.showtime.showtime.ShowtimeRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MovieService {
    private final MovieRepository movieRepository;

    private final ShowtimeRepository showtimeRepository;

    public MovieService(MovieRepository movieRepository, ShowtimeRepository showtimeRepository) {
        this.movieRepository = movieRepository;
        this.showtimeRepository = showtimeRepository;
    }

    public List<Movie> getMovies(){
        return movieRepository.findAll();
    }

    public Movie getMovieById(Long id) {
        return movieRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Movie doesn't exist"));
    }

    public Optional<List<Movie>> getMoviesByScreenAndTime(Integer screen, LocalDateTime time){
        return movieRepository.getMovieByScreenAndTime(screen, time);
    }
    public Optional<List<Movie>> getMoviesByScreen(Integer screen){
        return movieRepository.getMoviesByScreen(screen);
    }
    public List<Movie> getMoviesByDate(LocalDate date){
        List<Movie> movies = movieRepository.findAll();
        List<Movie> newMovies = new ArrayList<>();
        for(Movie movie :  movies){
            movie.setShowtimes(showtimeRepository.getShowtimeByMovieAndDate(movie.getId(), date).get());
            if(!movie.getShowtimes().isEmpty())
                newMovies.add(movie);
        }
        return newMovies;

    }

    public List<Showtime> getShowtimesByMovieId(Long id) {
        Movie currMovie = movieRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Movie doesn't exist"));
        return currMovie.getShowtimes();

    }

    public void addMovie(Movie movie){
        if(movieRepository.getMovieByName(movie.getMovieName()).isPresent()){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Movie '" + movie.getMovieName() + "'  already exists. Please use update.");
        }
        movieRepository.save(movie);
    }

    public void deleteMovie(Long id){
        for(Showtime showtime :  this.getShowtimesByMovieId(id)){
            //showtime.setMovie(null);
            showtimeRepository.deleteById(showtime.getId());
        }
        movieRepository.deleteById(id);
    }

    @Transactional
    public void updateMovie(Long id, Movie movie){
        Movie currMovie = movieRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Movie doesn't exist"));
        if(movie != null){
            if(movie.getMovieName() != null){
                currMovie.setMovieName(movie.getMovieName());
            }
            if(movie.getPosterUrl() != null){
                currMovie.setPosterUrl(movie.getPosterUrl());
            }
        }
    }
}
