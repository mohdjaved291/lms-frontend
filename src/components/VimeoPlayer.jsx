import React, { useEffect, useRef, useState } from 'react';
import Player from '@vimeo/player';
import './VimeoPlayer.css';

const VimeoPlayer = ({
  videoId,
  onProgress,
  onComplete,
  startTime = 0,
  width = '100%',
  height = '400px',
  title = 'Course Video'
}) => {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!containerRef.current || !videoId) return;

    // Initialize Vimeo Player
    const initPlayer = async () => {
      try {
        playerRef.current = new Player(containerRef.current, {
          id: videoId,
          width: width,
          height: height,
          autoplay: false,
          controls: true,
          title: false,
          byline: false,
          portrait: false,
          dnt: true, // Do Not Track
        });

        // Set start time if resuming
        if (startTime > 0) {
          await playerRef.current.setCurrentTime(startTime);
        }

        // Listen for time updates
        playerRef.current.on('timeupdate', (data) => {
          const progress = (data.seconds / data.duration) * 100;
          onProgress?.({
            percent: progress,
            seconds: data.seconds,
            duration: data.duration,
          });
        });

        // Listen for video end
        playerRef.current.on('ended', () => {
          onComplete?.();
        });

        // Listen for errors
        playerRef.current.on('error', (err) => {
          setError('Failed to load video');
          console.error('Vimeo Player Error:', err);
        });

        await playerRef.current.ready();
        setIsReady(true);
      } catch (err) {
        setError('Failed to initialize video player');
        console.error('Player Init Error:', err);
      }
    };

    initPlayer();

    // Cleanup
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId, startTime]);

  if (error) {
    return (
      <div className="vimeo-player-error">
        <div className="error-icon">⚠️</div>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="retry-btn"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="vimeo-player-wrapper">
      <div className="video-title-bar">
        <h4>{title}</h4>
        {!isReady && <span className="loading-text">Loading video...</span>}
      </div>
      <div
        ref={containerRef}
        className="vimeo-player-container"
        style={{ width, height }}
      />
      <div className="video-controls-info">
        <span className="security-notice">
          🔒 This video is protected and cannot be downloaded
        </span>
      </div>
    </div>
  );
};

export default VimeoPlayer;
