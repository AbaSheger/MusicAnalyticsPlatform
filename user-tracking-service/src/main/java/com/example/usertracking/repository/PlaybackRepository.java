package com.example.usertracking.repository;

import com.example.usertracking.model.PlaybackEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaybackRepository extends JpaRepository<PlaybackEvent, Long> {
}