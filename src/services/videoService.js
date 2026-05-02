// Video service for fetching video content
// Currently using mock data - replace with actual API calls when backend is ready

const mockVideos = {
  'web-development': [
    {
      id: '1',
      vimeo_video_id: '76979871',
      title: 'Introduction to Web Development',
      duration: 180,
      module: 'Module 1',
      completed: true,
    },
    {
      id: '2',
      vimeo_video_id: '76979871',
      title: 'HTML Basics',
      duration: 240,
      module: 'Module 1',
      completed: false,
    },
    {
      id: '3',
      vimeo_video_id: '76979871',
      title: 'CSS Fundamentals',
      duration: 300,
      module: 'Module 2',
      completed: false,
    },
  ],
  'python': [
    {
      id: '1',
      vimeo_video_id: '76979871',
      title: 'Python Introduction',
      duration: 150,
      module: 'Module 1',
      completed: true,
    },
    {
      id: '2',
      vimeo_video_id: '76979871',
      title: 'Variables and Data Types',
      duration: 200,
      module: 'Module 1',
      completed: false,
    },
  ],
};

export const getVideosByCourse = async (courseId) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockVideos[courseId] || []);
    }, 500);
  });
};

export const updateVideoProgress = async (videoId, progress) => {
  // Store progress in localStorage for now
  const key = `video_progress_${videoId}`;
  localStorage.setItem(key, JSON.stringify({
    progress,
    timestamp: new Date().toISOString(),
  }));
  return { success: true };
};

export const getVideoProgress = async (videoId) => {
  const key = `video_progress_${videoId}`;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : { progress: 0 };
};
