// Live Session Service
// Manages Google Meet/Zoom links for live classes
// Currently using localStorage/config - replace with API when backend is ready

const DEFAULT_SESSIONS = {
  'python': {
    meetingUrl: 'https://meet.google.com/abc-de',
    password: '923 9146',
    timing: '10:30 AM - 3:00 PM',
    isActive: true,
    startTime: new Date().setHours(10, 30, 0, 0),
    endTime: new Date().setHours(15, 0, 0, 0),
  },
  'web-development': {
    meetingUrl: 'https://meet.google.com/def-gh',
    password: '123 4567',
    timing: '2:00 PM - 5:00 PM',
    isActive: false,
    startTime: new Date().setHours(14, 0, 0, 0),
    endTime: new Date().setHours(17, 0, 0, 0),
  },
};

export const getLiveSession = async (courseId) => {
  // Check localStorage first (admin can update via some interface)
  const stored = localStorage.getItem(`live_session_${courseId}`);
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Return default
  return DEFAULT_SESSIONS[courseId] || null;
};

export const updateLiveSession = async (courseId, sessionData) => {
  // Store in localStorage for now
  localStorage.setItem(`live_session_${courseId}`, JSON.stringify({
    ...sessionData,
    updatedAt: new Date().toISOString(),
  }));
  return { success: true };
};

export const isSessionActive = (session) => {
  if (!session) return false;
  const now = new Date();
  const startTime = new Date(session.startTime);
  const endTime = new Date(session.endTime);
  return now >= startTime && now <= endTime;
};

export const getTimeUntilSession = (session) => {
  if (!session) return null;
  const now = new Date();
  const startTime = new Date(session.startTime);
  const diff = startTime - now;
  
  if (diff <= 0) return 'Session started';
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) {
    return `Starts in ${hours}h ${minutes}m`;
  }
  return `Starts in ${minutes}m`;
};
