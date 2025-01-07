package com.example.recommendation.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Arrays;

import static org.mockito.Mockito.when;

@WebMvcTest(RecommendationController.class)
public class RecommendationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RecommendationController recommendationController;

    @Test
    public void testGetRecommendations() throws Exception {
        when(recommendationController.getRecommendations("1")).thenReturn(Arrays.asList("Recommended Track A", "Recommended Track B"));

        mockMvc.perform(MockMvcRequestBuilders.get("/recommendation/getRecommendations/1"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0]").value("Recommended Track A"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1]").value("Recommended Track B"));
    }

    @Test
    public void testGetAIRecommendations() throws Exception {
        when(recommendationController.getAIRecommendations("1")).thenReturn(Arrays.asList("Track A", "Track B"));

        mockMvc.perform(MockMvcRequestBuilders.get("/recommendation/getAIRecommendations/1"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0]").value("Track A"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1]").value("Track B"));
    }
}
