package com.example.usertracking.controller;

import com.example.usertracking.model.PlaybackEvent;
import com.example.usertracking.model.SearchEvent;
import com.example.usertracking.repository.PlaybackRepository;
import com.example.usertracking.repository.SearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/user-tracking")
public class UserTrackingController {

    @Autowired
    private PlaybackRepository playbackRepository;

    @Autowired
    private SearchRepository searchRepository;

    @PostMapping("/logPlayback")
    public Map<String, String> logPlayback(@RequestBody Map<String, String> payload) {
        String playback = payload.get("playback");
        PlaybackEvent event = new PlaybackEvent(playback);
        playbackRepository.save(event);
        return Map.of("status", "success", "message", "Playback logged successfully");
    }

    @PostMapping("/logSearch")
    public Map<String, String> logSearch(@RequestBody Map<String, String> payload) {
        String search = payload.get("search");
        SearchEvent event = new SearchEvent(search);
        searchRepository.save(event);
        return Map.of("status", "success", "message", "Search logged successfully");
    }

    @GetMapping("/playbacks")
    public List<PlaybackEvent> getPlaybacks() {
        return playbackRepository.findAll();
    }

    @GetMapping("/searches")
    public List<SearchEvent> getSearches() {
        return searchRepository.findAll();
    }
}