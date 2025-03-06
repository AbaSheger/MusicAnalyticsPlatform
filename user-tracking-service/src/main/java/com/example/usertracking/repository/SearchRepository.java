package com.example.usertracking.repository;

import com.example.usertracking.model.SearchEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SearchRepository extends JpaRepository<SearchEvent, Long> {
}