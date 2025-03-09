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
        const date = new Date(dateString);
        const now = new Date();
        const diffMinutes = Math.floor((now - date) / (1000 * 60));
        
        if (diffMinutes < 1) return 'Just now';
        if (diffMinutes < 60) return `${diffMinutes}m ago`;
        
        const diffHours = Math.floor(diffMinutes / 60);
        if (diffHours < 24) return `${diffHours}h ago`;
        
        const diffDays = Math.floor(diffHours / 24);
        if (diffDays < 7) return `${diffDays}d ago`;
        
        return date.toLocaleDateString();
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
                            {playbacks.map((event, index) => (
                                <div key={index} className="track-item">
                                    <span className="track-number">{index + 1}</span>
                                    <div className="track-info">
                                        <div className="track-title">{event.playback}</div>
                                        <div className="track-artist">{formatDate(event.timestamp)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Tab>
                    <Tab eventKey="searches" title="Search History">
                        <div className="tracks-container">
                            {searches.map((event, index) => (
                                <div key={index} className="track-item">
                                    <span className="track-number">{index + 1}</span>
                                    <div className="track-info">
                                        <div className="track-title">{event.searchQuery}</div>
                                        <div className="track-artist">{formatDate(event.timestamp)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Tab>
                </Tabs>
            )}
        </div>
    );
}

export default TrackingHistory;