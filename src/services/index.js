// Service exports for easy importing

export { default as api, get, post, put, del } from './api';
export { 
  getVideosByCourse, 
  updateVideoProgress, 
  getVideoProgress 
} from './videoService';
export { 
  getLiveSession, 
  updateLiveSession, 
  isSessionActive, 
  getTimeUntilSession 
} from './liveSessionService';
export { 
  initiatePayment, 
  savePaymentHistory, 
  getPaymentHistory 
} from './paymentService';
export { 
  generateWhatsAppLink, 
  contactAdminForEnrollment, 
  shareCourseViaWhatsApp,
  getAdminContact,
  setAdminContact 
} from './whatsappService';
