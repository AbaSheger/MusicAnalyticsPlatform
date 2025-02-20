package com.example.statistics.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Arrays;

import static org.mockito.Mockito.when;

@WebMvcTest(StatisticsController.class)
public class StatisticsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private StatisticsController statisticsController;

    @Test
    public void testGetTopTracks() throws Exception {
        when(statisticsController.getTopTracks()).thenReturn(Arrays.asList("Track A", "Track B"));

        mockMvc.perform(MockMvcRequestBuilders.get("/statistics/topTracks"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0]").value("Track A"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1]").value("Track B"));
    }
}
