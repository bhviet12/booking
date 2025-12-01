// Google Sheets API Configuration
export const sendToGoogleSheets = async (data: any, sheetUrl: string) => {
  if (!sheetUrl) {
    console.warn('Google Sheets API URL not configured for this movie');
    return { success: false, message: 'API URL not configured' };
  }

  try {
    const response = await fetch(sheetUrl, {
      method: 'POST',
      mode: 'no-cors', // Required for Google Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Note: no-cors mode means we can't read the response
    // We assume success if no error is thrown
    return { success: true, message: 'Data sent to Google Sheets' };
  } catch (error) {
    console.error('Error sending to Google Sheets:', error);
    return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
  }
};
