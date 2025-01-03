package com.example.usertracking.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user-tracking")
public class UserTrackingController {

    @PostMapping("/logPlayback")
    public void logPlayback(@RequestBody PlaybackLog playbackLog) {
        // Implement the logic to log playback activity
    }

    @PostMapping("/logSearch")
    public void logSearch(@RequestBody SearchLog searchLog) {
        // Implement the logic to log search activity
    }
}
