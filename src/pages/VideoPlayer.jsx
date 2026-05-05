import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VimeoPlayer from '../components/VimeoPlayer';
import { getVideosByCourse, getVideoProgress, updateVideoProgress } from '../services/videoService';
import './VideoPlayer.css';

const VideoPlayer = () => {
  const { courseId, videoId } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [displayPercent, setDisplayPercent] = useState(0);
  const [startSeconds, setStartSeconds] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideo = async () => {
      try {
        const videos = await getVideosByCourse(courseId);
        const currentVideo = videos.find((v) => String(v.id) === String(videoId)) || videos[0];
        setVideo(currentVideo);

        if (currentVideo) {
          const savedProgress = await getVideoProgress(currentVideo.id);
          const seconds = savedProgress.watchedSeconds || 0;
          setStartSeconds(seconds);
          if (currentVideo.duration > 0) {
            setDisplayPercent((seconds / currentVideo.duration) * 100);
          }
        }
      } catch (error) {
        console.error('Failed to load video:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVideo();
  }, [courseId, videoId]);

  // Called by VimeoPlayer every few seconds with { percent, seconds, duration }
  const handleProgress = async (data) => {
    setDisplayPercent(data.percent);

    // Save to backend every 10 seconds of watch time
    if (Math.floor(data.seconds) % 10 === 0) {
      await updateVideoProgress(video?.id, data.seconds);
    }
  };

  const handleComplete = async () => {
    if (video) {
      await updateVideoProgress(video.id, video.duration);
    }
  };

  if (loading) {
    return (
      <div className="video-player-page loading">
        <div className="loading-spinner"></div>
        <p>Loading video...</p>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="video-player-page error">
        <p>Video not found</p>
        <button onClick={() => navigate('/learnpage')}>Back to Courses</button>
      </div>
    );
  }

  return (
    <div className="video-player-page">
      <div className="video-header">
        <h2>{video.title}</h2>
        <div className="progress-indicator">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${displayPercent}%` }}
            />
          </div>
          <span>{Math.round(displayPercent)}% completed</span>
        </div>
      </div>

      <VimeoPlayer
        videoId={video.vimeo_video_id}
        title={video.title}
        startTime={startSeconds}
        onProgress={handleProgress}
        onComplete={handleComplete}
        width="100%"
        height="500px"
      />

      <div className="video-info">
        <h3>{video.module}</h3>
        <p>Duration: {Math.round(video.duration / 60)} minutes</p>
      </div>
    </div>
  );
};

export default VideoPlayer;