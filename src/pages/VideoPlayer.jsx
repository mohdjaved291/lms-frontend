import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VimeoPlayer from '../components/VimeoPlayer';
import { getVideosByCourse, getVideoProgress, updateVideoProgress } from '../services/videoService';
import './VideoPlayer.css';

const VideoPlayer = () => {
  const { courseId, videoId } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideo = async () => {
      try {
        const videos = await getVideosByCourse(courseId);
        const currentVideo = videos.find(v => v.id === videoId) || videos[0];
        setVideo(currentVideo);

        if (currentVideo) {
          const savedProgress = await getVideoProgress(currentVideo.id);
          setProgress(savedProgress.progress || 0);
        }
      } catch (error) {
        console.error('Failed to load video:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVideo();
  }, [courseId, videoId]);

  const handleProgress = async (data) => {
    setProgress(data.percent);
    
    // Save progress every 10%
    if (Math.floor(data.percent) % 10 === 0) {
      await updateVideoProgress(video?.id, data.percent);
    }
  };

  const handleComplete = async () => {
    await updateVideoProgress(video?.id, 100);
    // Optionally mark as completed and show next video
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
              style={{ width: `${progress}%` }}
            />
          </div>
          <span>{Math.round(progress)}% completed</span>
        </div>
      </div>

      <VimeoPlayer
        videoId={video.vimeo_video_id}
        title={video.title}
        startTime={(progress / 100) * video.duration}
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
