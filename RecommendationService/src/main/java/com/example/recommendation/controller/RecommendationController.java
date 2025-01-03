package com.example.recommendation.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/recommendation")
public class RecommendationController {

    @GetMapping("/getRecommendations/{userId}")
    public List<String> getRecommendations(@PathVariable String userId) {
        // Implement the logic to get recommendations for the user
        return new ArrayList<>();
    }
}
