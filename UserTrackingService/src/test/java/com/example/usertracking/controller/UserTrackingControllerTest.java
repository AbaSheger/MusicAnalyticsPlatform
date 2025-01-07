package com.example.usertracking.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.mockito.Mockito.doNothing;

@WebMvcTest(UserTrackingController.class)
public class UserTrackingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserTrackingController userTrackingController;

    @Test
    public void testLogPlayback() throws Exception {
        PlaybackLog playbackLog = new PlaybackLog("Track A");
        doNothing().when(userTrackingController).logPlayback(playbackLog);

        mockMvc.perform(MockMvcRequestBuilders.post("/user-tracking/logPlayback")
                .contentType("application/json")
                .content("{\"playback\":\"Track A\"}"))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testLogSearch() throws Exception {
        SearchLog searchLog = new SearchLog("Artist X");
        doNothing().when(userTrackingController).logSearch(searchLog);

        mockMvc.perform(MockMvcRequestBuilders.post("/user-tracking/logSearch")
                .contentType("application/json")
                .content("{\"search\":\"Artist X\"}"))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }
}
