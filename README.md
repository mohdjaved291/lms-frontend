# LMS Student App — React Frontend

A web-based student application for the Learning Management System, providing access to course videos, live sessions, assignments, announcements, and payment enrollment.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Routing | React Router DOM v7 |
| HTTP Client | Axios |
| Video Player | Vimeo Player SDK (`@vimeo/player`) |
| Authentication | Google OAuth (`@react-oauth/google`) |
| Payment | Razorpay Checkout |
| Icons | FontAwesome + React Icons |
| Styling | CSS Modules + Tailwind CSS |

---

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── VimeoPlayer.jsx      # Vimeo video player with progress tracking
│   ├── LiveSessionCard.jsx  # Live session display (Google Meet/Zoom)
│   └── RazorpayCheckout.jsx # Razorpay payment button
├── pages/               # Route-level page components
│   ├── LoginPage.jsx        # Email + Google OAuth login
│   ├── SignUp.jsx           # Registration
│   ├── VideoPlayer.jsx      # Full video player page
│   └── Payment.jsx          # Payment page
├── services/            # API call abstractions
│   ├── api.js               # Axios instance with JWT interceptors
│   ├── videoService.js      # Video fetch + progress tracking
│   ├── liveSessionService.js# Live session fetch + status helpers
│   ├── paymentService.js    # Razorpay order creation + verification
│   ├── whatsappService.js   # WhatsApp deep link generation
│   └── index.js             # Centralized service exports
├── learnpage/           # Learning dashboard
│   └── LearnPage.jsx        # Enrolled courses with live sessions
├── coursemodule/        # Course content views
├── CourseDetails/       # Course detail pages
├── AfterLogin/          # Post-login home screen
└── HomePage/            # Public landing page
```

---

## Setup

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd LMS-Student-App-Meta-Scifor

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Edit `.env` with your actual values (see Environment Variables below), then:

```bash
npm start
```

App runs at `http://localhost:3000`

---

## Environment Variables

Create a `.env` file in the project root:

```env
# Backend API URL
REACT_APP_API_URL=http://127.0.0.1:8000

# Google OAuth
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id

# Razorpay (use test keys during development)
REACT_APP_RAZORPAY_KEY_ID=rzp_test_your_key_id

# Vimeo (optional — for advanced API features)
REACT_APP_VIMEO_ACCESS_TOKEN=your-vimeo-access-token
```

> Never commit `.env` to version control. Use `.env.example` as a reference template.

### Getting API Keys

| Service | Where to get |
|---------|-------------|
| Google Client ID | [Google Cloud Console](https://console.cloud.google.com) → APIs & Services → Credentials → OAuth 2.0 Client |
| Razorpay Key ID | [Razorpay Dashboard](https://dashboard.razorpay.com) → Settings → API Keys → Test Mode |
| Vimeo Token | [Vimeo Developer](https://developer.vimeo.com/apps) → My Apps → New App |

---

## Integrations

### Vimeo Video Player
Videos are hosted on Vimeo and embedded via the `@vimeo/player` SDK. The backend stores only the `vimeo_video_id` — no video files are served from the server.

- Watch progress is saved to the backend every 10 seconds
- Player resumes from the last watched position on return
- Download and link-copy protection is enforced via Vimeo privacy settings

```jsx
<VimeoPlayer
  videoId="76979871"
  startTime={120}
  onProgress={(data) => console.log(data.seconds)}
  onComplete={() => console.log('done')}
/>
```

### Razorpay Payment
Full secure payment flow — backend creates the order, frontend opens the modal, backend verifies the signature before enrolling the student.

```jsx
<RazorpayCheckout
  courseId={1}
  courseName="Python Development"
  amount={2443}
  onSuccess={(res) => console.log(res.paymentId)}
  onError={(err) => console.error(err)}
/>
```

### Google OAuth Login
Users can sign in with their Google account. The Google ID token is sent to the backend, which verifies it and returns a JWT token.

### Live Sessions (Google Meet / Zoom)
Meeting links are stored in the backend per batch. The `LiveSessionCard` fetches the session and shows live/upcoming status with a countdown timer.

```jsx
<LiveSessionCard batchId={1} />
```

### WhatsApp Sharing
Pre-filled WhatsApp messages for course sharing and admin contact using the `wa.me` deep link scheme. No API key required.

---

## Backend API Connection

The app communicates with the Django REST API at `REACT_APP_API_URL`. All requests automatically include the JWT token via Axios interceptors.

| Action | Endpoint |
|--------|----------|
| Login | `POST /login/` |
| Google login | `POST /google-login/` |
| Get videos | `GET /content/videos/?course=<id>` |
| Get live sessions | `GET /content/livesessions/?batch=<id>` |
| Save video progress | `POST /progress/update-video-progress/` |
| Get video progress | `GET /progress/my-progress/` |
| Create payment order | `POST /courses/payment/create-order/` |
| Verify payment | `POST /courses/payment/verify/` |
| Get announcements | `GET /announcements/` |
| Get enrolled courses | `GET /courses/my-learnings/` |

---

## Available Scripts

```bash
npm start        # Start development server at localhost:3000
npm run build    # Build for production
npm test         # Run test suite
```

---

## Branch Strategy

```
main                     # stable production code
└── feature/integration  # integration work (this branch)
```