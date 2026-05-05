import { post } from './api';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Creates a Razorpay order on the backend, then opens the Razorpay payment modal.
// On success, verifies the payment with the backend and returns the result.
export const initiatePayment = async (options) => {
  const loaded = await loadRazorpayScript();
  if (!loaded) throw new Error('Failed to load Razorpay SDK');

  // Step 1: Create order on backend
  const orderResponse = await post('/courses/payment/create-order/', {
    amount: Math.round(options.amount / 100), // api.js sends rupees; backend converts to paise
    course_id: options.courseId,
  });
  const { order_id, amount, currency, key } = orderResponse.data;

  // Step 2: Open Razorpay modal
  return new Promise((resolve, reject) => {
    const rzp = new window.Razorpay({
      key,
      amount,
      currency,
      name: options.name || 'LearnPro',
      description: options.description || 'Course Enrollment',
      order_id,
      prefill: {
        name: options.customerName || '',
        email: options.customerEmail || '',
        contact: options.customerPhone || '',
      },
      notes: {
        courseId: options.courseId,
        courseName: options.courseName,
      },
      theme: { color: '#3b82f6' },
      handler: async (response) => {
        // Step 3: Verify payment with backend
        try {
          const verifyResponse = await post('/courses/payment/verify/', {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            course_id: options.courseId,
          });
          resolve({
            success: true,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            enrolled: verifyResponse.data.enrolled,
          });
        } catch (err) {
          reject(new Error('Payment verification failed'));
        }
      },
      modal: {
        ondismiss: () => reject(new Error('Payment cancelled by user')),
      },
    });

    rzp.on('payment.failed', (response) => {
      reject(new Error(response.error.description));
    });

    rzp.open();
  });
};

// Store payment history in localStorage as a local record
export const savePaymentHistory = (paymentData) => {
  const history = JSON.parse(localStorage.getItem('payment_history') || '[]');
  history.push({ ...paymentData, timestamp: new Date().toISOString() });
  localStorage.setItem('payment_history', JSON.stringify(history));
};

export const getPaymentHistory = () => {
  return JSON.parse(localStorage.getItem('payment_history') || '[]');
};