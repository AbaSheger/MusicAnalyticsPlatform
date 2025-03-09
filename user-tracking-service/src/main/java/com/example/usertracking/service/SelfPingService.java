package com.example.usertracking.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Profile;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

/**
 * Service to keep the application alive on platforms that sleep inactive services (like Render's free tier)
 * This service will ping itself every 14 minutes to stay active
 */
@Service
@Profile("production") // Only activate in production environment
@ConditionalOnProperty(name = "app.self-ping.enabled", havingValue = "true", matchIfMissing = false)
public class SelfPingService {
    private static final Logger logger = LoggerFactory.getLogger(SelfPingService.class);
    
    private final RestTemplate restTemplate;
    private final String serviceUrl;
    
    @Autowired
    public SelfPingService(
            @Value("${app.self-ping.service-url:}") String serviceUrl) {
        this.restTemplate = new RestTemplate();
        this.serviceUrl = serviceUrl;
        logger.info("Self-pinging service initialized with URL: {}", serviceUrl);
    }
    
    /**
     * Pings the service every 14 minutes (840000 ms)
     * Render's free tier has a timeout of 15 minutes, so we ping just before that
     */
    @Scheduled(fixedRate = 840000)
    public void pingService() {
        if (serviceUrl == null || serviceUrl.isEmpty()) {
            logger.warn("Self-ping URL is not configured");
            return;
        }
        
        try {
            logger.info("Executing self-ping to keep service alive");
            String response = restTemplate.getForObject(serviceUrl, String.class);
            logger.info("Self-ping successful: {}", response != null ? "Response received" : "No response");
        } catch (Exception e) {
            logger.error("Error during self-ping: {}", e.getMessage());
        }
    }
}