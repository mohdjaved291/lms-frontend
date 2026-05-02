import React, { useState } from 'react';
import { initiatePayment, savePaymentHistory } from '../services/paymentService';
import { contactAdminForEnrollment } from '../services/whatsappService';
import './RazorpayCheckout.css';

const RazorpayCheckout = ({
  courseId,
  courseName,
  amount, // in rupees
  onSuccess,
  onError,
  customerDetails = {}
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await initiatePayment({
        amount: amount * 100, // Convert to paise
        currency: 'INR',
        name: courseName,
        description: `Enrollment for ${courseName}`,
        courseId,
        courseName,
        customerName: customerDetails.name || '',
        customerEmail: customerDetails.email || '',
        customerPhone: customerDetails.phone || '',
      });

      // Save payment history
      savePaymentHistory({
        courseId,
        courseName,
        amount,
        paymentId: response.paymentId,
        timestamp: new Date().toISOString(),
      });

      onSuccess?.(response);
    } catch (err) {
      const errorMsg = err.message || 'Payment failed';
      setError(errorMsg);
      onError?.(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppContact = () => {
    const whatsappUrl = contactAdminForEnrollment(courseName);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="razorpay-checkout">
      {error && (
        <div className="payment-error">
          <span className="error-icon">⚠️</span>
          <p>{error}</p>
        </div>
      )}

      <div className="payment-options">
        <button
          onClick={handlePayment}
          disabled={loading}
          className="pay-now-btn"
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Processing...
            </>
          ) : (
            <>
              <span className="btn-icon">💳</span>
              Pay ₹{amount} Now
            </>
          )}
        </button>

        <div className="divider">
          <span>or</span>
        </div>

        <button
          onClick={handleWhatsAppContact}
          className="whatsapp-btn"
        >
          <span className="btn-icon">💬</span>
          Contact Admin via WhatsApp
        </button>
      </div>

      <div className="payment-security">
        <div className="security-item">
          <span className="security-icon">🔒</span>
          <span>Secure SSL Encryption</span>
        </div>
        <div className="security-item">
          <span className="security-icon">✓</span>
          <span>Razorpay Verified</span>
        </div>
      </div>

      <p className="payment-note">
        By clicking "Pay Now", you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
};

export default RazorpayCheckout;
