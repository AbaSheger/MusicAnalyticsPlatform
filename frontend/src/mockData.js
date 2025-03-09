/**
 * Mock data for the Music Analytics Platform
 * Used as fallback when backend services are unavailable
 */

export const mockRecommendations = [
  "Shape of You - Ed Sheeran",
  "Blinding Lights - The Weeknd",
  "Dance Monkey - Tones and I",
  "Someone You Loved - Lewis Capaldi",
  "Bad Guy - Billie Eilish"
];

export const mockAIRecommendations = [
  "Based on your rock preferences: November Rain - Guns N' Roses",
  "Based on your pop preferences: Bad Guy - Billie Eilish",
  "Trending in your area: Stay - The Kid LAROI & Justin Bieber",
  "Similar to your recent plays: Heat Waves - Glass Animals",
  "From artists you might like: Easy On Me - Adele"
];

export const mockTopTracks = [
  "Bohemian Rhapsody - Queen",
  "Hotel California - Eagles",
  "Sweet Child O' Mine - Guns N' Roses",
  "Billie Jean - Michael Jackson",
  "Stairway to Heaven - Led Zeppelin",
  "Imagine - John Lennon",
  "Smells Like Teen Spirit - Nirvana",
  "One - U2",
  "Thriller - Michael Jackson",
  "Yesterday - The Beatles"
];

export const mockPlaybackEvents = [
  { id: 1, playback: "Shape of You - Ed Sheeran", timestamp: "2024-03-09T15:30:45" },
  { id: 2, playback: "Blinding Lights - The Weeknd", timestamp: "2024-03-09T16:15:22" },
  { id: 3, playback: "Bad Guy - Billie Eilish", timestamp: "2024-03-09T17:45:11" },
  { id: 4, playback: "Hotel California - Eagles", timestamp: "2024-03-09T19:10:30" },
  { id: 5, playback: "Bohemian Rhapsody - Queen", timestamp: "2024-03-09T20:22:15" }
];

export const mockSearchEvents = [
  { id: 1, searchQuery: "Ed Sheeran", timestamp: "2024-03-09T14:10:33" },
  { id: 2, searchQuery: "Queen best songs", timestamp: "2024-03-09T16:45:21" },
  { id: 3, searchQuery: "Billie Eilish new album", timestamp: "2024-03-09T18:30:05" },
  { id: 4, searchQuery: "rock classics", timestamp: "2024-03-09T19:55:47" },
  { id: 5, searchQuery: "The Weeknd hits", timestamp: "2024-03-09T21:15:12" }
];

export const isMockData = true;