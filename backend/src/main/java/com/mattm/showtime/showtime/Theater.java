package com.mattm.showtime.showtime;


import java.time.LocalDateTime;

public class Theater {
    private int screen;
    private LocalDateTime[] times;
    private int capacity;

    public Theater(int screen, LocalDateTime[] times, int capacity) {
        this.screen = screen;
        this.times = times;
        this.capacity = capacity;
    }

    public int getScreen() {
        return screen;
    }

    public void setScreen(int screen) {
        this.screen = screen;
    }

    public LocalDateTime[] getTimes() {
        return times;
    }

    public void setTimes(LocalDateTime[] times) {
        this.times = times;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }
}
