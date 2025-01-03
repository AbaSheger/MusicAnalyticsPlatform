package com.example.usertracking.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/user-tracking")
public class UserTrackingController {

    private List<PlaybackLog> playbackLogs = new ArrayList<>();
    private List<SearchLog> searchLogs = new ArrayList<>();

    @PostMapping("/logPlayback")
    public void logPlayback(@RequestBody PlaybackLog playbackLog) {
        playbackLogs.add(playbackLog);
        System.out.println("Playback logged: " + playbackLog);
    }

    @PostMapping("/logSearch")
    public void logSearch(@RequestBody SearchLog searchLog) {
        searchLogs.add(searchLog);
        System.out.println("Search logged: " + searchLog);
    }
}
