import { get } from './api';

// Transforms a backend LiveSession object into the shape LiveSessionCard expects
const formatSession = (session) => {
  const start = new Date(session.start_time);
  const end = new Date(session.end_time);

  return {
    id: session.id,
    title: session.title,
    meetingUrl: session.meeting_link,
    meetingId: session.meeting_id,
    password: session.meeting_password,
    timing: `${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
    startTime: start.getTime(),
    endTime: end.getTime(),
    isActive: Date.now() >= start.getTime() && Date.now() <= end.getTime(),
  };
};

// Fetch live sessions for a batch from the backend.
// batchId must be the numeric batch ID from the database.
export const getLiveSession = async (batchId) => {
  const response = await get('/content/livesessions/', { batch: batchId });
  const sessions = response.data;

  if (!sessions || sessions.length === 0) return null;

  const formatted = sessions.map(formatSession);
  const now = Date.now();

  // Prefer currently active session
  const active = formatted.find((s) => s.isActive);
  if (active) return active;

  // Otherwise return the next upcoming session
  const upcoming = formatted
    .filter((s) => s.startTime > now)
    .sort((a, b) => a.startTime - b.startTime);

  return upcoming[0] || formatted[formatted.length - 1];
};

export const isSessionActive = (session) => {
  if (!session) return false;
  const now = Date.now();
  return now >= session.startTime && now <= session.endTime;
};

export const getTimeUntilSession = (session) => {
  if (!session) return null;
  const now = Date.now();
  const diff = session.startTime - now;

  if (diff <= 0) return 'Session started';

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) return `Starts in ${hours}h ${minutes}m`;
  return `Starts in ${minutes}m`;
};