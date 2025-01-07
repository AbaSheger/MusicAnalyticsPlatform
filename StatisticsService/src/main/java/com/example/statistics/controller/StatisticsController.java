package com.example.statistics.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping("/statistics")
public class StatisticsController {

    private static final String SPOTIFY_API_URL = "https://api.spotify.com/v1/me/top/tracks";

    @GetMapping("/topTracks")
    public List<String> getTopTracks() {
        RestTemplate restTemplate = new RestTemplate();
        Map<String, Object> response = restTemplate.getForObject(SPOTIFY_API_URL, Map.class);

        List<String> topTracks = new ArrayList<>();
        if (response != null && response.containsKey("items")) {
            List<Map<String, Object>> items = (List<Map<String, Object>>) response.get("items");
            for (Map<String, Object> item : items) {
                topTracks.add((String) item.get("name"));
            }
        }

        return topTracks;
    }
}
