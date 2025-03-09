package com.example.apigateway.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Profile;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

/**
 * Service to keep the API Gateway alive on platforms that sleep inactive services
 */
@Service
@Profile("production")
@ConditionalOnProperty(name = "app.self-ping.enabled", havingValue = "true", matchIfMissing = false)
public class SelfPingService {
    private static final Logger logger = LoggerFactory.getLogger(SelfPingService.class);
    
    private final WebClient webClient;
    private final String serviceUrl;
    
    @Autowired
    public SelfPingService(
            @Value("${app.self-ping.service-url:}") String serviceUrl) {
        this.webClient = WebClient.create();
        this.serviceUrl = serviceUrl;
        logger.info("Self-pinging service initialized with URL: {}", serviceUrl);
    }
    
    @Scheduled(fixedRate = 840000)
    public void pingService() {
        if (serviceUrl == null || serviceUrl.isEmpty()) {
            logger.warn("Self-ping URL is not configured");
            return;
        }
        
        try {
            logger.info("Executing self-ping to keep service alive");
            webClient.get()
                    .uri(serviceUrl)
                    .retrieve()
                    .bodyToMono(String.class)
                    .defaultIfEmpty("No response body")
                    .doOnSuccess(response -> logger.info("Self-ping successful: {}", response))
                    .doOnError(e -> logger.error("Error during self-ping: {}", e.getMessage()))
                    .onErrorResume(e -> Mono.empty())
                    .block();
        } catch (Exception e) {
            logger.error("Error during self-ping: {}", e.getMessage());
        }
    }
}