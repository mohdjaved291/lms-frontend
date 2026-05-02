import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faKey, faCalendar, faExternalLinkAlt, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { getLiveSession, isSessionActive, getTimeUntilSession } from '../services/liveSessionService';
import './LiveSessionCard.css';

const LiveSessionCard = ({ courseId }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);
  const [countdown, setCountdown] = useState('');
  const sessionRef = useRef(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const data = await getLiveSession(courseId);
        sessionRef.current = data;
        setSession(data);
        setActive(isSessionActive(data));
        setCountdown(getTimeUntilSession(data));
      } catch (error) {
        console.error('Failed to fetch live session:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();

    // Update countdown every minute using ref so interval always sees latest session
    const interval = setInterval(() => {
      setActive(isSessionActive(sessionRef.current));
      setCountdown(getTimeUntilSession(sessionRef.current));
    }, 60000);

    return () => clearInterval(interval);
  }, [courseId]);

  const handleJoinSession = () => {
    if (session?.meetingUrl) {
      window.open(session.meetingUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <div className="live-session-card loading">
        <div className="loading-spinner"></div>
        <span>Loading session info...</span>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="live-session-card empty">
        <FontAwesomeIcon icon={faVideo} className="empty-icon" />
        <p>No live session scheduled</p>
        <span className="empty-subtitle">Check back later for updates</span>
      </div>
    );
  }

  return (
    <div className={`live-session-card ${active ? 'active' : 'upcoming'}`}>
      <div className="session-header">
        <div className="session-status">
          <FontAwesomeIcon icon={faVideo} className="status-icon" />
          <span className="status-badge">
            {active ? '🔴 Live Now' : '⏳ Upcoming'}
          </span>
        </div>
        {!active && countdown && (
          <div className="countdown-badge">
            <FontAwesomeIcon icon={faHourglassHalf} />
            <span>{countdown}</span>
          </div>
        )}
      </div>

      <div className="session-details">
        <div className="detail-row">
          <FontAwesomeIcon icon={faCalendar} className="detail-icon" />
          <div className="detail-content">
            <span className="detail-label">Meeting Time</span>
            <span className="detail-value">{session.timing}</span>
          </div>
        </div>

        <div className="detail-row">
          <FontAwesomeIcon icon={faKey} className="detail-icon" />
          <div className="detail-content">
            <span className="detail-label">Password</span>
            <span className="detail-value password">{session.password}</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleJoinSession}
        className={`join-session-btn ${active ? 'active' : 'disabled'}`}
        disabled={!active}
      >
        <FontAwesomeIcon icon={faExternalLinkAlt} />
        {active ? 'Join Live Session' : 'Session Not Started'}
      </button>

      {!active && (
        <p className="session-note">
          The join button will be enabled when the session starts
        </p>
      )}
    </div>
  );
};

export default LiveSessionCard;
