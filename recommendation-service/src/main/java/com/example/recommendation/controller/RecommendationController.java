package com.example.recommendation.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/recommendation")
public class RecommendationController {

    @Value("${last.fm.api.key}")
    private String lastFmApiKey;

    @Value("${last.fm.api.url}")
    private String lastFmApiUrl;

    @GetMapping("/getRecommendations")
    public List<String> getRecommendations(@RequestParam("userId") String userId) {
        // Implement the logic to get recommendations for the user
        List<String> recommendations = new ArrayList<>();
        
        // Simulate user activity data
        Map<String, List<String>> userActivityData = getUserActivityData(userId);
        
        // Generate AI-based recommendations
        recommendations = generateAIRecommendations(userActivityData);
        
        return recommendations;
    }
    
    private Map<String, List<String>> getUserActivityData(String userId) {
        // Simulate user activity data retrieval
        Map<String, List<String>> userActivityData = new HashMap<>();
        List<String> playbackHistory = new ArrayList<>();
        playbackHistory.add("Track A");
        playbackHistory.add("Track B");
        playbackHistory.add("Track C");
        userActivityData.put("playbackHistory", playbackHistory);
        
        List<String> searchHistory = new ArrayList<>();
        searchHistory.add("Artist X");
        searchHistory.add("Artist Y");
        searchHistory.add("Artist Z");
        userActivityData.put("searchHistory", searchHistory);
        
        return userActivityData;
    }
    
    /**
     * Generates AI-based recommendations based on user activity data.
     *
     * @param userActivityData A map containing user activity data such as playback history and search history.
     * @return A list of recommended tracks.
     */
    private List<String> generateAIRecommendations(Map<String, List<String>> userActivityData) {
        // Implement AI-based recommendation algorithm
        List<String> recommendations = new ArrayList<>();
        
        // Example AI logic: Recommend tracks based on playback history
        List<String> playbackHistory = userActivityData.get("playbackHistory");
        if (playbackHistory != null && !playbackHistory.isEmpty()) {
            for (String track : playbackHistory) {
                recommendations.add("Recommended " + track);
            }
        }
        
        return recommendations;
    }

    @GetMapping("/getAIRecommendations")
    public List<String> getAIRecommendations(@RequestParam("userId") String userId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = String.format(lastFmApiUrl, userId, lastFmApiKey);
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);

        List<String> recommendations = new ArrayList<>();
        if (response != null && response.containsKey("toptracks")) {
            Map<String, Object> topTracks = (Map<String, Object>) response.get("toptracks");
            if (topTracks.containsKey("track")) {
                List<Map<String, Object>> tracks = (List<Map<String, Object>>) topTracks.get("track");
                for (Map<String, Object> track : tracks) {
                    recommendations.add((String) track.get("name"));
                }
            }
        }

        return recommendations;
    }
}
