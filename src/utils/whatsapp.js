/**
 * Opens a WhatsApp chat via the wa.me URL scheme.
 * This works entirely on the client side without backend integration.
 * 
 * @param {string} phone - The phone number (with or without country code).
 * @param {string} message - The message to pre-fill.
 */
export const openWhatsAppChat = (phone, message) => {
    if (!phone) {
        console.warn("No phone number provided for WhatsApp share");
        return;
    }

    // Clean phone number: remove non-digits
    let cleanPhone = phone.replace(/\D/g, '');

    // Add country code if missing (assuming 91 for India if length is 10)
    if (cleanPhone.length === 10) {
        cleanPhone = '91' + cleanPhone;
    }

    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener');
};
