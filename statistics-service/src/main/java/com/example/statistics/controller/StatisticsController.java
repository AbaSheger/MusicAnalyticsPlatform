package com.example.statistics.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Arrays;

@RestController
@RequestMapping("/statistics")
public class StatisticsController {

    @GetMapping("/topTracks")
    public List<String> getTopTracks() {
        // For demo purposes, returning static data
        // In a real application, this would fetch from a database or external service
        return Arrays.asList(
            "Bohemian Rhapsody - Queen",
            "Hotel California - Eagles",
            "Sweet Child O' Mine - Guns N' Roses",
            "Billie Jean - Michael Jackson",
            "Stairway to Heaven - Led Zeppelin"
        );
    }
}
