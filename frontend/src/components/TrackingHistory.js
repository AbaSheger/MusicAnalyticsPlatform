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

    const formatDate = (dateString) => {
        if (!dateString) return 'Unknown date';
        
        // The server sends ISO format dates in UTC
        const date = new Date(dateString);
        const now = new Date();
        
        // Convert both to UTC timestamps in milliseconds for accurate comparison
        const diffMs = now.getTime() - date.getTime();
        const diffSeconds = Math.floor(diffMs / 1000);
        
        // Debug timestamp info - remove in production
        console.log(`Date from server: ${dateString}`);
        console.log(`Parsed as local: ${date.toString()}`);
        console.log(`Now: ${now.toString()}`);
        console.log(`Difference ms: ${diffMs}, seconds: ${diffSeconds}`);
        
        // Less than a minute ago
        if (diffSeconds < 60) {
            return 'Just now';
        }
        
        // Less than an hour ago
        const diffMinutes = Math.floor(diffSeconds / 60);
        if (diffMinutes < 60) {
            return `${diffMinutes}m ago`;
        }
        
        // Less than a day ago
        const diffHours = Math.floor(diffMinutes / 60);
        if (diffHours < 24) {
            return `${diffHours}h ago`;
        }
        
        // Less than a week ago
        const diffDays = Math.floor(diffHours / 24);
        if (diffDays < 7) {
            return `${diffDays}d ago`;
        }
        
        // Format as date
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
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
                                            <div className="track-artist">{formatDate(event.timestamp)}</div>
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
                                            <div className="track-artist">{formatDate(event.timestamp)}</div>
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