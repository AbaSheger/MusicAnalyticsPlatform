package com.example.usertracking.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Entity
public class PlaybackEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String playback;
    private LocalDateTime timestamp;

    public PlaybackEvent() {
        // Use UTC time to ensure consistent timestamps across different server/client timezones
        this.timestamp = LocalDateTime.now(ZoneOffset.UTC);
    }

    public PlaybackEvent(String playback) {
        this();
        this.playback = playback;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlayback() {
        return playback;
    }

    public void setPlayback(String playback) {
        this.playback = playback;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}