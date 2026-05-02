import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Footer from '../HomePage/footer';
import RazorpayCheckout from '../components/RazorpayCheckout';

const Payment = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedPayment, setSelectedPayment] = useState('credit');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Course details - in real app, get from route params or context
  const courseDetails = {
    id: 'web-development',
    name: 'Google UX Design Professional Certificate',
    price: 2443, // ₹2,443
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: 1,
      padding: isMobile ? '40px 20px' : '60px 80px',
      paddingTop: isMobile ? '100px' : '120px',
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box',
    },
    backButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '24px',
      cursor: 'pointer',
      border: 'none',
      background: 'none',
      padding: 0,
    },
    backIcon: {
      fontSize: '18px',
      color: '#374151',
    },
    backText: {
      fontSize: '16px',
      fontWeight: '500',
      color: '#374151',
    },
    mainSection: {
      display: 'flex',
      gap: '60px',
      alignItems: 'flex-start',
      flexDirection: isMobile ? 'column' : 'row',
    },
    leftSection: {
      flex: 1,
      maxWidth: isMobile ? '100%' : '500px',
    },
    rightSection: {
      flex: 1,
      display: isMobile ? 'none' : 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    pageTitle: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#111',
      marginBottom: '12px',
    },
    secureText: {
      fontSize: '13px',
      color: '#6b7280',
      marginBottom: '32px',
    },
    courseCard: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '32px',
      gap: '16px',
    },
    courseInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    googleIcon: {
      width: '40px',
      height: '40px',
      flexShrink: 0,
    },
    courseDetails: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    },
    courseTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#111',
    },
    courseSubtitle: {
      fontSize: '13px',
      color: '#6b7280',
    },
    priceTag: {
      padding: '8px 20px',
      border: '2px solid #3b82f6',
      borderRadius: '8px',
      fontSize: '18px',
      fontWeight: '600',
      color: '#3b82f6',
      whiteSpace: 'nowrap',
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#111',
      marginBottom: '20px',
    },
    paymentOption: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '16px 0',
      borderBottom: '1px solid #f3f4f6',
      cursor: 'pointer',
    },
    radioButton: {
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      border: '2px solid #d1d5db',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    radioButtonSelected: {
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      border: '2px solid #3b82f6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    radioInner: {
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: '#3b82f6',
    },
    paymentLabel: {
      fontSize: '15px',
      fontWeight: '500',
      color: '#111',
      minWidth: '90px',
    },
    paymentIcons: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      flexWrap: 'wrap',
    },
    paymentIcon: {
      height: '24px',
      objectFit: 'contain',
    },
    visaIcon: {
      height: '20px',
      backgroundColor: '#1a1f71',
      padding: '4px 8px',
      borderRadius: '4px',
    },
    mastercardIcon: {
      height: '28px',
    },
    amexIcon: {
      height: '24px',
      backgroundColor: '#006fcf',
      padding: '2px 6px',
      borderRadius: '4px',
    },
    upiIcon: {
      height: '24px',
    },
    emiTag: {
      backgroundColor: '#3b82f6',
      color: '#fff',
      padding: '4px 12px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: '600',
    },
    termsText: {
      fontSize: '13px',
      color: '#6b7280',
      marginTop: '24px',
      marginBottom: '24px',
      lineHeight: '1.5',
    },
    termsLink: {
      color: '#3b82f6',
      textDecoration: 'underline',
      cursor: 'pointer',
    },
    continueButton: {
      backgroundColor: '#3b82f6',
      color: '#fff',
      padding: '14px 32px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '15px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    illustration: {
      maxWidth: '400px',
      width: '100%',
    },
  };

  return (
    <div style={styles.container}>
      <main style={styles.content}>
        {/* Back Button */}
        <button style={styles.backButton} onClick={() => navigate('/settings')}>
          <FontAwesomeIcon icon={faArrowLeft} style={styles.backIcon} />
        </button>
        <div style={styles.mainSection}>
          {/* Left Section */}
          <div style={styles.leftSection}>
            <h1 style={styles.pageTitle}>Payment</h1>
            <p style={styles.secureText}>All transactions are secure and encrypted</p>

            {/* Course Card */}
            <div style={styles.courseCard}>
              <div style={styles.courseInfo}>
                {/* Google Icon */}
                <svg style={styles.googleIcon} viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                </svg>
                <div style={styles.courseDetails}>
                  <span style={styles.courseTitle}>Google UX Design Professional Certificate</span>
                  <span style={styles.courseSubtitle}>by LearnPro &nbsp;&nbsp;&nbsp; 3 Months of Access :</span>
                </div>
              </div>
              <div style={styles.priceTag}>₹2,443</div>
            </div>

            {/* Payment Method */}
            <h2 style={styles.sectionTitle}>Payment Method</h2>

            {/* Credit Card Option */}
            <div
              style={styles.paymentOption}
              onClick={() => setSelectedPayment('credit')}
            >
              <div style={selectedPayment === 'credit' ? styles.radioButtonSelected : styles.radioButton}>
                {selectedPayment === 'credit' && <div style={styles.radioInner}></div>}
              </div>
              <span style={styles.paymentLabel}>Credit card</span>
              <div style={styles.paymentIcons}>
                {/* Visa */}
                <svg height="20" viewBox="0 0 48 32" style={{ backgroundColor: '#1a1f71', padding: '4px 8px', borderRadius: '4px' }}>
                  <text x="5" y="22" fill="white" fontSize="14" fontWeight="bold" fontStyle="italic">VISA</text>
                </svg>
                {/* Mastercard */}
                <svg height="28" viewBox="0 0 48 32">
                  <circle cx="16" cy="16" r="14" fill="#EB001B" />
                  <circle cx="32" cy="16" r="14" fill="#F79E1B" />
                  <path d="M24 6.5a14 14 0 0 0 0 19" fill="#FF5F00" />
                </svg>
                {/* Amex */}
                <svg height="24" viewBox="0 0 48 32" style={{ backgroundColor: '#006fcf', padding: '2px 6px', borderRadius: '4px' }}>
                  <text x="4" y="20" fill="white" fontSize="10" fontWeight="bold">AMEX</text>
                </svg>
                {/* UPI */}
                <svg height="24" viewBox="0 0 60 24">
                  <rect width="60" height="24" rx="4" fill="#fff" stroke="#e5e7eb" />
                  <text x="8" y="17" fill="#00796B" fontSize="12" fontWeight="bold">UPI</text>
                </svg>
                {/* EMI */}
                <span style={styles.emiTag}>EMI</span>
              </div>
            </div>

            {/* UPI ID Option */}
            <div
              style={styles.paymentOption}
              onClick={() => setSelectedPayment('upi')}
            >
              <div style={selectedPayment === 'upi' ? styles.radioButtonSelected : styles.radioButton}>
                {selectedPayment === 'upi' && <div style={styles.radioInner}></div>}
              </div>
              <span style={styles.paymentLabel}>UPI ID</span>
              <div style={styles.paymentIcons}>
                {/* Visa */}
                <svg height="20" viewBox="0 0 48 32" style={{ backgroundColor: '#1a1f71', padding: '4px 8px', borderRadius: '4px' }}>
                  <text x="5" y="22" fill="white" fontSize="14" fontWeight="bold" fontStyle="italic">VISA</text>
                </svg>
                {/* Mastercard */}
                <svg height="28" viewBox="0 0 48 32">
                  <circle cx="16" cy="16" r="14" fill="#EB001B" />
                  <circle cx="32" cy="16" r="14" fill="#F79E1B" />
                  <path d="M24 6.5a14 14 0 0 0 0 19" fill="#FF5F00" />
                </svg>
                {/* Amex */}
                <svg height="24" viewBox="0 0 48 32" style={{ backgroundColor: '#006fcf', padding: '2px 6px', borderRadius: '4px' }}>
                  <text x="4" y="20" fill="white" fontSize="10" fontWeight="bold">AMEX</text>
                </svg>
                {/* UPI */}
                <svg height="24" viewBox="0 0 60 24">
                  <rect width="60" height="24" rx="4" fill="#fff" stroke="#e5e7eb" />
                  <text x="8" y="17" fill="#00796B" fontSize="12" fontWeight="bold">UPI</text>
                </svg>
                {/* EMI */}
                <span style={styles.emiTag}>EMI</span>
              </div>
            </div>

            {/* Terms */}
            <p style={styles.termsText}>
              By continuing to payment, I agree to the{' '}
              <span style={styles.termsLink}>Terms of Use</span>,{' '}
              <span style={styles.termsLink}>Refund Policy</span>, and{' '}
              <span style={styles.termsLink}>Privacy Policy</span>.
            </p>

            {/* Razorpay Payment Integration */}
            {selectedPayment === 'credit' || selectedPayment === 'upi' ? (
              <RazorpayCheckout
                courseId={courseDetails.id}
                courseName={courseDetails.name}
                amount={courseDetails.price}
                onSuccess={(response) => {
                  setPaymentSuccess(true);
                  // Redirect to success page after 2 seconds
                  setTimeout(() => {
                    navigate('/enroll');
                  }, 2000);
                }}
                onError={(error) => {
                  console.error('Payment failed:', error);
                }}
                customerDetails={{
                  name: localStorage.getItem('userName') || '',
                  email: localStorage.getItem('userEmail') || '',
                  phone: localStorage.getItem('userPhone') || '',
                }}
              />
            ) : (
              <button style={styles.continueButton}>
                Continue to Payment
              </button>
            )}

            {/* Payment Success Message */}
            {paymentSuccess && (
              <div style={{
                marginTop: '20px',
                padding: '16px',
                backgroundColor: '#dcfce7',
                border: '1px solid #86efac',
                borderRadius: '8px',
                color: '#166534',
              }}>
                <strong>✓ Payment Successful!</strong>
                <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>
                  Redirecting to your course...
                </p>
              </div>
            )}
          </div>

          {/* Right Section - Illustration */}
          <div style={styles.rightSection}>
            <svg style={styles.illustration} viewBox="0 0 400 350" fill="none">
              {/* Background Elements */}
              <rect x="280" y="20" width="80" height="60" rx="8" fill="#E8F4FD" />
              <rect x="290" y="30" width="60" height="8" rx="2" fill="#93C5FD" />
              <rect x="290" y="45" width="40" height="8" rx="2" fill="#BFDBFE" />
              <rect x="290" y="60" width="50" height="8" rx="2" fill="#93C5FD" />

              {/* Calendar */}
              <rect x="320" y="90" width="60" height="50" rx="6" fill="#fff" stroke="#E5E7EB" strokeWidth="2" />
              <rect x="320" y="90" width="60" height="15" rx="6" fill="#3B82F6" />
              <circle cx="335" cy="120" r="4" fill="#3B82F6" />
              <circle cx="350" cy="120" r="4" fill="#E5E7EB" />
              <circle cx="365" cy="120" r="4" fill="#E5E7EB" />

              {/* Credit Card 1 */}
              <rect x="180" y="80" width="120" height="75" rx="10" fill="#3B82F6" transform="rotate(-10 180 80)" />
              <rect x="190" y="100" width="40" height="25" rx="4" fill="#60A5FA" transform="rotate(-10 190 100)" />
              <circle x="270" y="130" r="20" fill="#2563EB" transform="rotate(-10 270 130)" />
              <text x="200" y="145" fill="white" fontSize="10" transform="rotate(-10 200 145)">$ 500</text>

              {/* Credit Card 2 */}
              <rect x="200" y="150" width="120" height="75" rx="10" fill="#60A5FA" />
              <rect x="210" y="165" width="30" height="20" rx="3" fill="#93C5FD" />
              <circle cx="300" cy="200" r="15" fill="#3B82F6" />
              <circle cx="285" cy="200" r="15" fill="#2563EB" opacity="0.7" />

              {/* Dollar Icons */}
              <circle cx="320" cy="170" r="20" fill="#FCD34D" />
              <text x="314" y="177" fill="#92400E" fontSize="16" fontWeight="bold">$</text>

              <circle cx="160" cy="200" r="15" fill="#FCD34D" />
              <text x="155" y="206" fill="#92400E" fontSize="12" fontWeight="bold">$</text>

              {/* Person */}
              <ellipse cx="200" cy="320" rx="50" ry="10" fill="#E5E7EB" />

              {/* Legs */}
              <path d="M180 280 L175 315" stroke="#1E3A5F" strokeWidth="8" strokeLinecap="round" />
              <path d="M210 280 L220 315" stroke="#1E3A5F" strokeWidth="8" strokeLinecap="round" />

              {/* Shoes */}
              <ellipse cx="172" cy="318" rx="12" ry="6" fill="#1E3A5F" />
              <ellipse cx="223" cy="318" rx="12" ry="6" fill="#1E3A5F" />

              {/* Body */}
              <path d="M170 200 Q165 240 180 280 L210 280 Q225 240 220 200 Z" fill="#3B82F6" />

              {/* Arms */}
              <path d="M170 210 Q140 220 135 250" stroke="#FCD9B8" strokeWidth="10" strokeLinecap="round" />
              <path d="M220 210 Q240 200 250 180" stroke="#FCD9B8" strokeWidth="10" strokeLinecap="round" />

              {/* Phone in hand */}
              <rect x="235" y="165" width="25" height="45" rx="4" fill="#1F2937" />
              <rect x="238" y="170" width="19" height="35" rx="2" fill="#60A5FA" />

              {/* Head */}
              <circle cx="195" cy="175" r="30" fill="#FCD9B8" />

              {/* Hair */}
              <path d="M165 165 Q170 140 195 135 Q220 140 225 165 Q220 155 195 155 Q170 155 165 165" fill="#8B4513" />

              {/* Face */}
              <circle cx="185" cy="175" r="3" fill="#1F2937" />
              <circle cx="205" cy="175" r="3" fill="#1F2937" />
              <path d="M190 185 Q195 190 200 185" stroke="#1F2937" strokeWidth="2" fill="none" />

              {/* Plant */}
              <rect x="280" y="280" width="30" height="40" rx="4" fill="#1F2937" />
              <path d="M295 280 Q280 260 290 240" stroke="#10B981" strokeWidth="6" fill="none" />
              <path d="M295 280 Q310 260 300 240" stroke="#10B981" strokeWidth="6" fill="none" />
              <path d="M295 270 Q295 250 295 230" stroke="#10B981" strokeWidth="6" fill="none" />
              <ellipse cx="290" cy="235" rx="15" ry="10" fill="#10B981" />
              <ellipse cx="300" cy="235" rx="15" ry="10" fill="#059669" />
              <ellipse cx="295" cy="225" rx="12" ry="8" fill="#10B981" />
            </svg>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Payment;
