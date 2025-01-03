package com.example.statistics.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping("/statistics")
public class StatisticsController {

    @GetMapping("/topTracks")
    public List<String> getTopTracks() {
        // Implement the logic to get the top tracks
        return new ArrayList<>();
    }
}