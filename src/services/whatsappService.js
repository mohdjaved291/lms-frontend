// WhatsApp Service
// Handles WhatsApp messaging for enrollment and sharing

export const generateWhatsAppLink = (phoneNumber, message) => {
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
};

export const contactAdminForEnrollment = (courseName, adminPhone = '919999999999') => {
  const message = `Hi, I'm interested in enrolling for ${courseName}. Please share the payment details and next steps.`;
  return generateWhatsAppLink(adminPhone, message);
};

export const shareCourseViaWhatsApp = (courseName, courseUrl) => {
  const message = `Check out this course: ${courseName}\n${courseUrl}`;
  return generateWhatsAppLink('', message); // Empty phone for user's own WhatsApp
};

// Admin configuration - in real app, this would come from backend
export const getAdminContact = () => {
  return localStorage.getItem('admin_whatsapp') || '919999999999';
};

export const setAdminContact = (phoneNumber) => {
  localStorage.setItem('admin_whatsapp', phoneNumber);
};
