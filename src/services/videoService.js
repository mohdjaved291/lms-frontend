import { get, post } from './api';

// Fetch all videos for a course from the backend.
// courseId must be the numeric course ID.
export const getVideosByCourse = async (courseId) => {
  const response = await get('/content/videos/', { course: courseId });
  return response.data;
};

// Save video watch progress to the backend.
// watchedSeconds is the number of seconds watched (from Vimeo player).
export const updateVideoProgress = async (videoId, watchedSeconds) => {
  await post('/progress/update-video-progress/', {
    video_id: videoId,
    watched_seconds: Math.floor(watchedSeconds),
  });
  return { success: true };
};

// Fetch watch progress for a specific video.
// Returns { watchedSeconds, isCompleted } from the backend.
export const getVideoProgress = async (videoId) => {
  const response = await get('/progress/my-progress/');
  const allProgress = response.data;
  const entry = allProgress.find((p) => p.video === videoId);

  if (!entry) return { watchedSeconds: 0, isCompleted: false };

  return {
    watchedSeconds: entry.watched_seconds || 0,
    isCompleted: entry.is_completed || false,
  };
};