package com.mattm.showtime.movie;

import com.mattm.showtime.showtime.Showtime;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table
public class Movie{
        @Id
        @SequenceGenerator(
                name = "movie_seq",
                sequenceName = "movie_seq",
                allocationSize = 1
        )
        @GeneratedValue(
                strategy = GenerationType.SEQUENCE,
                generator = "movie_sequence"
        )
        private Long id;
        private String movieName;
        private String movieLength;
        private String posterUrl;
        @OneToMany(mappedBy = "movie", orphanRemoval = true)
        private List<Showtime> showtimes = new ArrayList<>();

        public Movie() {
        }

        public Movie(Long id, String movieName, String movieLength, String posterUrl) {
                this.id = id;
                this.movieName = movieName;
                this.movieLength = movieLength;
                this.posterUrl = posterUrl;
        }

        public Movie(String movieName, String movieLength, String posterUrl) {
                this.movieName = movieName;
                this.movieLength = movieLength;
                this.posterUrl = posterUrl;
        }


        public Long getId() {
                return id;
        }

        public void setId(Long id) {
                this.id = id;
        }

        public String getMovieName() {
                return movieName;
        }

        public void setMovieName(String movieName) {
                this.movieName = movieName;
        }

        public String getMovieLength() {
                return movieLength;
        }

        public void setMovieLength(String movieLength) {
                this.movieLength = movieLength;
        }

        public String getPosterUrl() {
                return posterUrl;
        }

        public void setPosterUrl(String posterUrl) {
                this.posterUrl = posterUrl;
        }

        public List<Showtime> getShowtimes() {
                return showtimes;
        }

        public void setShowtimes(List<Showtime> showtimes) {
                this.showtimes = showtimes;
        }

        @Override
        public String toString() {
                return "Movie{" +
                        "id=" + id +
                        ", movieName='" + movieName + '\'' +
                        ", movieLength='" + movieLength + '\'' +
                        ", posterUrl='" + posterUrl + '\'' +
                        '}';
        }


}
