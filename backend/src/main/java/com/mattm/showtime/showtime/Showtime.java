package com.mattm.showtime.showtime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mattm.showtime.movie.Movie;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table
public class Showtime {

    @Id
    @SequenceGenerator(
            name = "showtime_theater",
            sequenceName = "showtime_theater",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "student_sequence"
    )
    private Long id;
    private Integer screenNum;
    private Integer capacity;
    private LocalDate date;
    private LocalTime time;

    @ManyToOne(cascade = CascadeType.ALL)
    @JsonIgnoreProperties(value = {"showtimes", "handler","hibernateLazyInitializer"}, allowSetters = true)
    @JoinColumn(name="movie_id", nullable = false)
    Movie movie;

    public Showtime() {
    }


    public Showtime(Long id, Integer screenNum, Integer capacity, LocalDate date, LocalTime time, Movie movie) {
        this.id = id;
        this.screenNum = screenNum;
        this.capacity = capacity;
        this.date = date;
        this.time = time;
        this.movie = movie;
    }

    public Showtime(Integer screenNum, Integer capacity, LocalDate date, LocalTime time, Movie movie) {
        this.screenNum = screenNum;
        this.capacity = capacity;
        this.date = date;
        this.time = time;
        this.movie = movie;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getScreenNum() {
        return screenNum;
    }

    public void setScreenNum(Integer screenNum) {
        this.screenNum = screenNum;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    @Override
    public String toString() {
        return "Showtime{" +
                "id=" + id +
                ", screenNum=" + screenNum +
                ", capacity=" + capacity +
                ", date=" + date +
                ", time=" + time +
                '}';
    }


}