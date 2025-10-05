// Facebook Pixel utilities
declare global {
  interface Window {
    fbq: any;
  }
}

export const FACEBOOK_PIXEL_ID = '2240557819739296';
export const CONVERSION_API_TOKEN = 'EAAeJDc0VuZCsBPmXIIhN0OrHBAiQZBDZB1ZAcTbu3jeWk5jDrxPtTu0haLDBb4q7SeAtZA5JUqE1jXZAlZBNSMRlE6vZAol1mspvQk44an8yWgzWlWGnpGwZAONpCu0TlOLB8INdYxsxyzlZBYYUlhZBhjv8O4MZCuhSKM5aKegjkMrwG9lD0fzzoqKp7UOx62qlxWnaVQZDZD';

// Facebook Pixel tracking functions
export const trackPageView = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
};

export const trackViewContent = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent');
  }
};

export const trackAddToCart = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'AddToCart');
  }
};

export const trackInitiateCheckout = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'InitiateCheckout');
  }
};

export const trackPurchase = (value: number, currency: string = 'BRL') => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Purchase', {
      value: value,
      currency: currency
    });
  }
};

export const trackLead = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead');
  }
};

export const trackCompleteRegistration = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'CompleteRegistration');
  }
};

// Hash function for email (SHA-256)
export const hashEmail = async (email: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(email.toLowerCase().trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// Hash function for phone (SHA-256)
export const hashPhone = async (phone: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(phone.replace(/\D/g, '').trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// Send conversion event to Facebook Conversion API
export const sendConversionEvent = async (eventData: {
  event_name: string;
  event_time: number;
  user_data: {
    em?: string[];
    ph?: string[];
  };
  custom_data?: {
    currency: string;
    value: string;
  };
}) => {
  try {
    const payload = {
      data: [eventData]
    };

    const response = await fetch(`https://graph.facebook.com/v18.0/${FACEBOOK_PIXEL_ID}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CONVERSION_API_TOKEN}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error('Facebook Conversion API error:', await response.text());
    } else {
      console.log('Facebook Conversion API success:', await response.json());
    }
  } catch (error) {
    console.error('Error sending conversion event:', error);
  }
};

// Track purchase with both Pixel and Conversion API
export const trackPurchaseComplete = async (email?: string, phone?: string, value: number = 19.00) => {
  // Track with Pixel
  trackPurchase(value, 'BRL');

  // Track with Conversion API
  if (email || phone) {
    const userData: any = {};
    
    if (email) {
      userData.em = [await hashEmail(email)];
    }
    
    if (phone) {
      userData.ph = [await hashPhone(phone)];
    }

    await sendConversionEvent({
      event_name: 'Purchase',
      event_time: Math.floor(Date.now() / 1000),
      user_data: userData,
      custom_data: {
        currency: 'BRL',
        value: value.toString()
      }
    });
  }
};

// Track lead with both Pixel and Conversion API
export const trackLeadComplete = async (email?: string, phone?: string) => {
  // Track with Pixel
  trackLead();

  // Track with Conversion API
  if (email || phone) {
    const userData: any = {};
    
    if (email) {
      userData.em = [await hashEmail(email)];
    }
    
    if (phone) {
      userData.ph = [await hashPhone(phone)];
    }

    await sendConversionEvent({
      event_name: 'Lead',
      event_time: Math.floor(Date.now() / 1000),
      user_data: userData
    });
  }
};
