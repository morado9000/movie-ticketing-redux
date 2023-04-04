package com.mattm.showtime.showtime;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class ShowtimeService {
    private final ShowtimeRepository showtimeRepository;

    public ShowtimeService(ShowtimeRepository showtimeRepository) {
        this.showtimeRepository = showtimeRepository;
    }

    public List<Showtime> getShows(){
        return showtimeRepository.findAll();
    }

    public Optional<List<Showtime>> getShowtimeByTimeAndScreen(LocalDate date, LocalTime time, Integer screenNum){
        return showtimeRepository.getShowtimeByTimeAndScreen(date, time, screenNum);
    }

    public Optional<List<Showtime>> getShowtimeByDate(LocalDate date){
        return showtimeRepository.getShowtimeByDate(date);
    }

    public void addNewShow(Showtime showtime){
        if(!showtimeRepository.getShowtimeByTimeAndScreen(showtime.getDate(), showtime.getTime(), showtime.getScreenNum()).get().isEmpty()){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Show already exists");
        }
        showtimeRepository.save(showtime);
    }

    public void deleteShow(Long id) {
        Showtime showtime = showtimeRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Show doesn't exist"));
        showtime.setMovie(null);
        showtimeRepository.deleteById(id);
    }

    public void updateShow(Long id, Showtime newShowtime) {
        if(!showtimeRepository.existsById(id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Show doesn't exist");
        }
        showtimeRepository.save(newShowtime);
    }

/*    public Optional<List<Showtime>> getShowsByScreen(Integer screen) {
        return showtimeRepository.getShowsByScreen(screen);
    }

 */
}
