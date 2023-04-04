package com.mattm.showtime.movie;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    @Query("SELECT m FROM Movie m WHERE movieName = ?1")
    Optional<Movie> getMovieByName(String movieName);
    @Query("SELECT m FROM Movie m JOIN showtimes s WHERE s.screenNum = ?1")
    Optional<List<Movie>> getMoviesByScreen(Integer screenNum);
    @Query("SELECT m FROM Movie m JOIN showtimes s WHERE s.screenNum = ?1 AND s.time=?2")
    Optional<List<Movie>> getMovieByScreenAndTime(Integer screenNum, LocalDateTime time);

}
