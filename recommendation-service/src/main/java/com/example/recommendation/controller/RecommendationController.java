package com.example.recommendation.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/recommendation")
public class RecommendationController {

    @GetMapping("/getRecommendations")
    public List<String> getRecommendations(@RequestParam("userId") String userId) {
        return Arrays.asList(
            "Shape of You - Ed Sheeran",
            "Blinding Lights - The Weeknd",
            "Dance Monkey - Tones and I"
        );
    }

    @GetMapping("/getAIRecommendations/{userId}")
    public List<String> getAIRecommendations(@PathVariable String userId) {
        // For demo purposes, return static recommendations
        // In a real application, this would use AI/ML models
        List<String> recommendations = new ArrayList<>();
        recommendations.add("Based on your rock preferences: November Rain - Guns N' Roses");
        recommendations.add("Based on your pop preferences: Bad Guy - Billie Eilish");
        recommendations.add("Trending in your area: Stay - The Kid LAROI & Justin Bieber");
        recommendations.add("Similar to your recent plays: Heat Waves - Glass Animals");
        return recommendations;
    }
}
