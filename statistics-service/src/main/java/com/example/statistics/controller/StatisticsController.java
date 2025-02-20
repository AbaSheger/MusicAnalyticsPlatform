package com.example.statistics.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping("/statistics")
public class StatisticsController {

    @Value("${SPOTIFY_API_URL}")
    private String spotifyApiUrl;

    @Value("${SPOTIFY_API_TOKEN}")
    private String spotifyApiToken;

    @GetMapping("/topTracks")
    public List<String> getTopTracks() {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + spotifyApiToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(spotifyApiUrl, HttpMethod.GET, entity, Map.class);

        List<String> topTracks = new ArrayList<>();
        if (response.getBody() != null && response.getBody().containsKey("items")) {
            List<Map<String, Object>> items = (List<Map<String, Object>>) response.getBody().get("items");
            for (Map<String, Object> item : items) {
                topTracks.add((String) item.get("name"));
            }
        }

        return topTracks;
    }
}
