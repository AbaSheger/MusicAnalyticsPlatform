package com.example.usertracking.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Entity
public class SearchEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String searchQuery;
    private LocalDateTime timestamp;

    public SearchEvent() {
        // Use UTC time to ensure consistent timestamps across different server/client timezones
        this.timestamp = LocalDateTime.now(ZoneOffset.UTC);
    }

    public SearchEvent(String searchQuery) {
        this();
        this.searchQuery = searchQuery;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSearchQuery() {
        return searchQuery;
    }

    public void setSearchQuery(String searchQuery) {
        this.searchQuery = searchQuery;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}