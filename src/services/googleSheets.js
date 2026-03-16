/**
 * Handles submission of data to Google Sheets via Google Apps Script Web App.
 * 
 * @param {Object} data - The data to submit
 * @param {string} data.type - Source of data ('contact' or 'chatbot')
 * @param {string} data.name - Name of the person
 * @param {string} data.mobile - Phone/Mobile number
 * @param {string} [data.email] - Email address (optional for chatbot)
 * @param {string} [data.countryCode] - Country code for mobile
 * @param {string} [data.message] - Message content (optional)
 * @param {string} [data.address] - Address (optional)
 * @returns {Promise<Object>} - Response from the script
 */
export const submitToGoogleSheets = async (data) => {
    // URL will be provided by the user after deployment
    // We'll use a placeholder for now, or read from env if we add it later
    const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';

    if (SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL') {
        console.warn('Google Sheets Script URL is not configured.');
        // Simulate success for demo purposes if URL isn't set
        return new Promise(resolve => setTimeout(() => resolve({ result: 'success' }), 1000));
    }

    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Important for Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...data,
                date: new Date().toISOString(),
                timestamp: new Date().toLocaleString()
            })
        });

        // specific to no-cors: we can't read the response, so we assume success if no error thrown
        return { result: 'success' };
    } catch (error) {
        console.error('Error submitting to Google Sheets:', error);
        throw error;
    }
};
