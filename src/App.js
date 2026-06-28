import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import BeforeLoginNavbar from './components/BeforeLoginNavbar';
import AfterLoginNavbar from './components/AfterLoginNavbar';
import HomePage from './HomePage/homepage';
import LearnPage from './learnpage/LearnPage';
import LearnCourseOverview from './learnpage/CourseOverview';
import NextVideoScreen from './learnpage/NextVideoScreen';
import ModulePage from './learnpage/ModulePage';
import ProfilePopup from './pages/ProfilePopup';
import EnrollPage from './pages/EnrollPage';
import MyProfile from './pages/MyProfile';
import LoginPage from './pages/LoginPage';
import SignUp from './pages/SignUp';
import PhoneNumber from './pages/PhoneNumber';
import Verification from './pages/Verification';
import Enroll from './CourseEnrolled/Enroll';
import Nocoupon from './pages/Nocoupon';
import CourseOverview from './coursemodule/CourseOverview';
import Module1Page from './coursemodule/Module1Page';
import QuizPage from './coursemodule/QuizPages';
import Quiz1Page from './coursemodule/Quiz1Page';
import QuizAnswer from './coursemodule/QuizAnswer';
import AssignmentPage from './coursemodule/AssignmentPage';
import NotificationPage from './coursemodule/components/NotificationPage';
import ChatPage from './coursemodule/components/ChatPage';
import ChatWindowPage from './coursemodule/components/ChatWindowPage';
import AnnouncementPage from './learnpage/Announcement';
import CourseDetails from './CourseDetails/homepage';
import Home from './AfterLogin/Home';
import Settings from './pages/Settings';
import CommunicationPreferences from './pages/CommunicationPreferences';
import CalendarSync from './pages/CalendarSync';
import MyAccomplishments from './pages/MyAccomplishments';
import HelpCenter from './pages/HelpCenter';
import MyPurchases from './pages/MyPurchases';
import Payment from './pages/Payment';
import Certificate from './pages/Certificate';
import ThankInstructor from './pages/ThankInstructor';
import AccountNotifications from './pages/AccountNotifications';
import Refunds from './pages/Refunds';
import TicketRequest from './pages/TicketRequest';
import ChatBot from './components/ChatBot';
import SetupAccount from './pages/SetupAccount';
import VideoPlayer from './pages/VideoPlayer';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AllCourses from './pages/AllCourses';

const AppRoutes = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileIncomplete, setIsProfileIncomplete] = useState(true);

  const handlePaySubmit = () => {
    setIsProfileIncomplete(false);
  };

  const excludedNavRoutes = [
    '/signup',
    '/login',
    '/forgot-password',
    '/phone',
    '/verification',
    '/enroll',
    '/nocoupon',
    '/ApplyCoupon',
    '/IncorrectCoupon',
    '/AllCoupons',
    '/CouponApplied',
    '/course-overview/python',
    '/course-overview/web',
    '/next-video-screen'
  ];

  const shouldShowNavBar = !excludedNavRoutes.includes(location.pathname) && !location.pathname.startsWith('/reset-password');
  const forceAfterNavbar = ['/myProfile', '/settings', '/communication-preferences', '/calendar-sync', '/my-accomplishments', '/help-center', '/my-purchases', '/payment', '/certificate', '/account-notifications', '/refunds', '/ticket-request', '/setup-account'];
  const showCertificateNavbar = location.pathname.startsWith('/certificate') || location.pathname.startsWith('/thank-instructor');
  const showAfterNavbar = isLoggedIn || forceAfterNavbar.includes(location.pathname) || showCertificateNavbar;

  return (
    <>
      {shouldShowNavBar && (showAfterNavbar ? <AfterLoginNavbar /> : <BeforeLoginNavbar />)}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />
        <Route path="/all-courses" element={<AllCourses />} />
        <Route path="/home" element={<Home setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />} />
        <Route path="/signup" element={<SignUp setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/phone" element={<PhoneNumber />} />
        <Route path="/verification" element={<Verification setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/enroll" element={<Enroll setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/profile" element={<ProfilePopup isOpen={isProfileIncomplete} onClose={handlePaySubmit} />} />
        <Route path="/nocoupon" element={<Nocoupon />} />
        <Route path="/learnPage" element={<LearnPage />} />
        <Route path="/course-overview/python" element={<LearnCourseOverview />} />
        <Route path="/course-overview/web" element={<LearnCourseOverview />} />
        <Route path="/next-video-screen" element={<NextVideoScreen />} />
        <Route path="/learnpage/modulepage" element={<ModulePage />} />
        <Route path="/module-page" element={<ModulePage />} />
        <Route path="/enroll" element={<EnrollPage />} />
        <Route path="/myProfile" element={<MyProfile />} />
        <Route path="/courses" element={<CourseOverview />} />
        <Route path="/courses/advanced-frontend" element={<CourseDetails />} />
        <Route path="/module1" element={<Module1Page />} />
        <Route path="/assignment" element={<AssignmentPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/quiz1" element={<Quiz1Page />} />
        <Route path="/quiz-answer" element={<QuizAnswer />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/chatwindow" element={<ChatWindowPage />} />
        <Route path="/announcements" element={<AnnouncementPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/communication-preferences" element={<CommunicationPreferences />} />
        <Route path="/calendar-sync" element={<CalendarSync />} />
        <Route path="/my-accomplishments" element={<MyAccomplishments />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/my-purchases" element={<MyPurchases />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/certificate/:id" element={<Certificate />} />
        <Route path="/thank-instructor/:id" element={<ThankInstructor />} />
        <Route path="/account-notifications" element={<AccountNotifications />} />
        <Route path="/refunds" element={<Refunds />} />
        <Route path="/ticket-request" element={<TicketRequest />} />
        <Route path="/setup-account" element={<SetupAccount />} />
        <Route path="/video/:courseId/:videoId" element={<VideoPlayer />} />
        <Route path="/video/:courseId" element={<VideoPlayer />} />
      </Routes>
      <ChatBot />
    </>
  );
};

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
