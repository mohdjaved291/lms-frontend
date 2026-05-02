// Payment Service
// Integrates with Razorpay for client-side payments

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

export const initiatePayment = async (options) => {
  const loaded = await loadRazorpayScript();
  
  if (!loaded) {
    throw new Error('Failed to load Razorpay SDK');
  }
  
  return new Promise((resolve, reject) => {
    const rzp = new window.Razorpay({
      key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_YOUR_KEY_HERE',
      amount: options.amount, // Amount in paise
      currency: options.currency || 'INR',
      name: options.name || 'LearnPro',
      description: options.description || 'Course Enrollment',
      image: options.logo || '/logo.png',
      order_id: options.orderId, // Optional: if you have backend
      handler: function (response) {
        // Payment successful
        resolve({
          success: true,
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature,
        });
      },
      prefill: {
        name: options.customerName || '',
        email: options.customerEmail || '',
        contact: options.customerPhone || '',
      },
      notes: {
        courseId: options.courseId,
        courseName: options.courseName,
      },
      theme: {
        color: '#3b82f6', // LearnPro blue
      },
      modal: {
        ondismiss: function() {
          reject(new Error('Payment cancelled by user'));
        },
      },
    });
    
    rzp.on('payment.failed', function (response) {
      reject(new Error(response.error.description));
    });
    
    rzp.open();
  });
};

// Store payment history in localStorage
export const savePaymentHistory = (paymentData) => {
  const history = JSON.parse(localStorage.getItem('payment_history') || '[]');
  history.push({
    ...paymentData,
    timestamp: new Date().toISOString(),
  });
  localStorage.setItem('payment_history', JSON.stringify(history));
};

export const getPaymentHistory = () => {
  return JSON.parse(localStorage.getItem('payment_history') || '[]');
};
