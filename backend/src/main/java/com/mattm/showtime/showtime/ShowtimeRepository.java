package com.mattm.showtime.showtime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ShowtimeRepository extends JpaRepository<Showtime, Long> {

    @Query("SELECT s FROM Showtime s WHERE date=?1 AND time=?2 AND screenNum = ?3")
    Optional<List<Showtime>> getShowtimeByTimeAndScreen(LocalDate date, LocalTime time, Integer screenNum);
    @Query("SELECT s FROM Showtime s WHERE date=?1")
    Optional<List<Showtime>> getShowtimeByDate(LocalDate date);
    @Query("SELECT s FROM Showtime s WHERE s.movie.id=?1 AND date=?2")
    Optional<List<Showtime>> getShowtimeByMovieAndDate(Long movie_id, LocalDate date);
}
