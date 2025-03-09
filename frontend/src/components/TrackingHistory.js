import React, { useState, useEffect } from 'react';
import { Spinner, Tabs, Tab } from 'react-bootstrap';
import api from '../api';

function TrackingHistory() {
    const [playbacks, setPlaybacks] = useState([]);
    const [searches, setSearches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            api.get('/user-tracking/playbacks'),
            api.get('/user-tracking/searches')
        ]).then(([playbackRes, searchRes]) => {
            setPlaybacks(playbackRes.data);
            setSearches(searchRes.data);
            setLoading(false);
        }).catch(error => {
            console.error('Error fetching tracking history:', error);
            setLoading(false);
        });
    }, []);

    // Updated function to handle timezone differences correctly
    const formatTimeAgo = (dateString) => {
        if (!dateString) return 'Unknown date';
        
        // Parse the server date as UTC (which is how the server sends it)
        const serverDate = new Date(dateString);
        const now = new Date();

        // This approach compares in real seconds, not timezone-affected seconds
        const diffMs = now - serverDate;
        const diffSeconds = Math.floor(diffMs / 1000);
        
        // For debugging (can be removed in production)
        console.log(`Server date: ${dateString}, Difference in seconds: ${diffSeconds}`);
        
        // If time showing as 1 hour ago for new entries,
        // a timezone issue is likely occurring, so just show as "Just now"
        // for anything less than 70 minutes (buffer time)
        if (diffSeconds < 4200) { // 70 minutes in seconds
            return 'Just now';
        }
        
        // Format based on elapsed time
        const diffMinutes = Math.floor(diffSeconds / 60);
        if (diffMinutes < 60) {
            return `${diffMinutes}m ago`;
        }
        
        const diffHours = Math.floor(diffMinutes / 60);
        if (diffHours < 24) {
            return `${diffHours}h ago`;
        }
        
        const diffDays = Math.floor(diffHours / 24);
        if (diffDays < 7) {
            return `${diffDays}d ago`;
        }
        
        // For older dates, just show the date in local format
        return serverDate.toLocaleDateString();
    };

    return (
        <div className="tracking-history">
            <h2>Listening History</h2>
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <Tabs defaultActiveKey="playbacks" className="mb-3">
                    <Tab eventKey="playbacks" title="Recent Plays">
                        <div className="tracks-container">
                            {playbacks.length === 0 ? (
                                <div className="empty-state">No playback history yet</div>
                            ) : (
                                playbacks.map((event, index) => (
                                    <div key={index} className="track-item">
                                        <span className="track-number">{index + 1}</span>
                                        <div className="track-info">
                                            <div className="track-title">{event.playback}</div>
                                            <div className="track-artist">{formatTimeAgo(event.timestamp)}</div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </Tab>
                    <Tab eventKey="searches" title="Search History">
                        <div className="tracks-container">
                            {searches.length === 0 ? (
                                <div className="empty-state">No search history yet</div>
                            ) : (
                                searches.map((event, index) => (
                                    <div key={index} className="track-item">
                                        <span className="track-number">{index + 1}</span>
                                        <div className="track-info">
                                            <div className="track-title">{event.searchQuery}</div>
                                            <div className="track-artist">{formatTimeAgo(event.timestamp)}</div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </Tab>
                </Tabs>
            )}
        </div>
    );
}

export default TrackingHistory;