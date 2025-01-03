package com.example.recommendation.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping("/recommendation")
public class RecommendationController {

    @GetMapping("/getRecommendations/{userId}")
    public List<String> getRecommendations(@PathVariable String userId) {
        // Implement the logic to get recommendations for the user
        List<String> recommendations = new ArrayList<>();
        recommendations.add("Track 1");
        recommendations.add("Track 2");
        recommendations.add("Track 3");
        return recommendations;
    }
}
