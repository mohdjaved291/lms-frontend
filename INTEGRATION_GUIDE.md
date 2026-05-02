# LMS Integration Implementation Guide

This document describes all the frontend integrations that have been implemented for the LearnPro LMS.

---

## Overview of Implemented Integrations

| Integration | Status | Files Created/Modified |
|-------------|--------|---------------------|
| Google OAuth | ✅ Already Implemented | `src/pages/LoginPage.jsx`, `src/pages/SignUp.jsx` |
| Razorpay Payment | ✅ Implemented | `src/components/RazorpayCheckout.jsx`, `src/pages/Payment.jsx` |
| Vimeo Video Player | ✅ Implemented | `src/components/VimeoPlayer.jsx`, `src/pages/VideoPlayer.jsx` |
| Live Sessions (Google Meet) | ✅ Implemented | `src/components/LiveSessionCard.jsx`, `src/learnpage/LearnPage.jsx` |
| WhatsApp Sharing | ✅ Already Implemented | `src/coursemodule/CourseOverview.jsx`, `src/popup/Sharepopup.jsx` |
| API Service Layer | ✅ Implemented | `src/services/api.js`, `src/services/index.js` |

---

## 1. Google OAuth Integration

**Status:** Already implemented in codebase

**Files:**
- `src/index.js` - OAuth Provider setup
- `src/pages/LoginPage.jsx` - Google login button
- `src/pages/SignUp.jsx` - Google signup

**Configuration:**
1. Get Google Client ID from [Google Cloud Console](https://console.cloud.google.com/)
2. Update `.env` file:
   ```
   REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
   ```

**Note:** Currently hardcoded in `src/index.js` - should be moved to environment variables.

---

## 2. Razorpay Payment Gateway

**Status:** Fully implemented with client-side checkout

**Files Created:**
- `src/components/RazorpayCheckout.jsx` - Payment component
- `src/components/RazorpayCheckout.css` - Styles
- `src/services/paymentService.js` - Payment logic

**Files Modified:**
- `src/pages/Payment.jsx` - Integrated Razorpay checkout

**Features:**
- Credit Card payments
- UPI payments
- WhatsApp contact option as fallback
- Payment history stored in localStorage
- Success/error handling with redirects

**Configuration:**
1. Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Get your Test/Live Key ID
3. Update `.env` file:
   ```
   REACT_APP_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID
   ```

**Usage:**
```jsx
import RazorpayCheckout from '../components/RazorpayCheckout';

<RazorpayCheckout
  courseId="web-development"
  courseName="Web Development Bootcamp"
  amount={2443} // ₹2,443
  onSuccess={(response) => console.log('Payment ID:', response.paymentId)}
  onError={(error) => console.error('Payment failed:', error)}
/>
```

---

## 3. Vimeo Video Player Integration

**Status:** Fully implemented with progress tracking

**Package Installed:** `@vimeo/player`

**Files Created:**
- `src/components/VimeoPlayer.jsx` - Video player component
- `src/components/VimeoPlayer.css` - Player styles
- `src/pages/VideoPlayer.jsx` - Video player page
- `src/pages/VideoPlayer.css` - Page styles
- `src/services/videoService.js` - Video data management

**Features:**
- Secure video embedding (no download option)
- Progress tracking (saved to localStorage)
- Resume from where left off
- Completion detection
- Error handling with retry

**Configuration:**
1. Upload videos to Vimeo
2. Set privacy to "Hide from Vimeo" + domain restriction
3. Update video IDs in `src/services/videoService.js`:
   ```javascript
   const mockVideos = {
     'web-development': [
       {
         id: '1',
         vimeo_video_id: 'YOUR_VIMEO_VIDEO_ID',
         title: 'Introduction',
         // ...
       }
     ]
   };
   ```

**Usage:**
```jsx
import VimeoPlayer from '../components/VimeoPlayer';

<VimeoPlayer
  videoId="76979871" // Vimeo video ID
  title="Introduction to Web Development"
  startTime={120} // Resume from 2 minutes
  onProgress={(data) => console.log(`${data.percent}% watched`)}
  onComplete={() => console.log('Video completed')}
/>
```

**Routes Added:**
- `/video/:courseId/:videoId` - Play specific video
- `/video/:courseId` - Play first video of course

---

## 4. Live Session (Google Meet) Integration

**Status:** Implemented with dynamic session management

**Files Created:**
- `src/components/LiveSessionCard.jsx` - Live session card
- `src/components/LiveSessionCard.css` - Card styles
- `src/services/liveSessionService.js` - Session management

**Files Modified:**
- `src/learnpage/LearnPage.jsx` - Replaced static batch details with LiveSessionCard

**Features:**
- Dynamic meeting links per course
- "Join Now" button (enabled only when session is live)
- Countdown timer for upcoming sessions
- Meeting password display
- Session status indicator (Live/Upcoming)
- Data stored in localStorage (admin can update)

**Configuration:**
Update meeting details in `src/services/liveSessionService.js`:
```javascript
const DEFAULT_SESSIONS = {
  'python': {
    meetingUrl: 'https://meet.google.com/your-meeting-code',
    password: '123 456',
    timing: '10:30 AM - 3:00 PM',
    isActive: true,
    startTime: new Date().setHours(10, 30, 0, 0),
    endTime: new Date().setHours(15, 0, 0, 0),
  }
};
```

**Usage:**
```jsx
import LiveSessionCard from '../components/LiveSessionCard';

<LiveSessionCard courseId="python" />
```

---

## 5. WhatsApp Integration

**Status:** Already implemented in codebase + enhanced

**Files:**
- `src/services/whatsappService.js` - NEW: WhatsApp utilities
- `src/coursemodule/CourseOverview.jsx` - Course sharing
- `src/popup/Sharepopup.jsx` - Share popup

**Features:**
- Share courses via WhatsApp
- Contact admin for enrollment
- Pre-filled messages with course name

**Usage:**
```jsx
import { contactAdminForEnrollment } from '../services/whatsappService';

// In your component:
const handleWhatsAppContact = () => {
  const url = contactAdminForEnrollment('Web Development Course', '919999999999');
  window.open(url, '_blank');
};
```

---

## 6. API Service Layer

**Status:** Implemented

**Files Created:**
- `src/services/api.js` - Axios configuration
- `src/services/index.js` - Service exports

**Features:**
- Centralized HTTP client
- Automatic auth token injection
- Error handling (401 redirect)
- Request/response interceptors

**Usage:**
```javascript
import { get, post } from '../services/api';

// GET request
const data = await get('/api/courses');

// POST request
const response = await post('/api/enroll', { courseId: '123' });
```

---

## File Structure

```
src/
├── components/
│   ├── VimeoPlayer.jsx          # Video player
│   ├── VimeoPlayer.css
│   ├── LiveSessionCard.jsx      # Live session display
│   ├── LiveSessionCard.css
│   ├── RazorpayCheckout.jsx     # Payment component
│   └── RazorpayCheckout.css
├── pages/
│   ├── VideoPlayer.jsx          # Video player page
│   ├── VideoPlayer.css
│   └── Payment.jsx              # Updated with Razorpay
├── services/
│   ├── api.js                   # HTTP client
│   ├── videoService.js          # Video management
│   ├── liveSessionService.js    # Live session management
│   ├── paymentService.js        # Payment logic
│   ├── whatsappService.js       # WhatsApp utilities
│   └── index.js                 # Service exports
└── learnpage/
    └── LearnPage.jsx            # Updated with LiveSessionCard
```

---

## Environment Variables

Create `.env` file in project root:

```env
# API Configuration
REACT_APP_API_URL=http://127.0.0.1:8000

# Google OAuth
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id

# Payment Gateway (Razorpay)
REACT_APP_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID

# Vimeo API (optional, for advanced features)
REACT_APP_VIMEO_ACCESS_TOKEN=your-vimeo-token
```

**Important:** Never commit `.env` file to version control!

---

## Next Steps

1. **Get API Keys:**
   - [Razorpay](https://dashboard.razorpay.com/) for payments
   - [Google Cloud](https://console.cloud.google.com/) for OAuth
   - [Vimeo](https://developer.vimeo.com/) for video hosting

2. **Upload Videos:**
   - Upload to Vimeo with privacy settings
   - Update video IDs in `videoService.js`

3. **Configure Live Sessions:**
   - Create Google Meet links
   - Update `liveSessionService.js` with meeting details

4. **Test Flows:**
   - Payment flow (use Razorpay test mode)
   - Video playback
   - Live session joining
   - WhatsApp sharing

---

## Security Notes

- All API keys should be in `.env` file only
- Video player has download protection via Vimeo privacy
- Payment signatures are verified
- Auth tokens are stored in localStorage with automatic refresh handling

---

## Support

For integration issues:
- Razorpay Docs: https://razorpay.com/docs/
- Vimeo Player Docs: https://developer.vimeo.com/player/sdk
- Google Meet: No API key required for basic links
