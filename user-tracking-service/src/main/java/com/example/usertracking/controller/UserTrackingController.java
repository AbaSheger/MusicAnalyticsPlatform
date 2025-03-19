package com.example.usertracking.controller;

import com.example.usertracking.model.PlaybackEvent;
import com.example.usertracking.model.SearchEvent;
import com.example.usertracking.repository.PlaybackRepository;
import com.example.usertracking.repository.SearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.List;
import java.util.HashMap;

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
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Playback logged successfully");
        return response;
    }

    @PostMapping("/logSearch")
    public Map<String, String> logSearch(@RequestBody Map<String, String> payload) {
        String search = payload.get("search");
        SearchEvent event = new SearchEvent(search);
        searchRepository.save(event);
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Search logged successfully");
        return response;
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