export const renderTicketToHTML = (bookingData = {}) => {
  const {
    slotId = "N/A",
    date = new Date().toLocaleDateString(),
    timeSlot = "N/A",
    paymentId = Math.random().toString(36).substring(2, 12).toUpperCase(),
  } = bookingData;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>ParkEz Booking Confirmation</title>
      <style type="text/css">
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        
        body {
          font-family: 'Inter', Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f9f9f9;
          color: #333333;
          line-height: 1.6;
        }
        
        .email-container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          border: 1px solid #e0e0e0;
        }
        
        .email-header {
          background-color: #ffffff;
          padding: 25px 0;
          text-align: center;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .email-header h1 {
          margin: 0;
          font-size: 22px;
          font-weight: 600;
          color: #000000;
          letter-spacing: -0.5px;
        }
        
        .email-body {
          padding: 30px;
        }
        
        .greeting {
          margin-bottom: 20px;
        }
        
        .booking-details {
          background-color: #f5f5f5;
          border-left: 3px solid #888888;
          padding: 20px;
          margin: 25px 0;
          border-radius: 0 2px 2px 0;
        }
        
        .booking-details p {
          margin: 10px 0;
          font-size: 15px;
        }
        
        .detail-label {
          font-weight: 500;
          color: #000000;
          display: inline-block;
          width: 120px;
        }
        
        .email-footer {
          text-align: center;
          padding: 20px;
          background-color: #ffffff;
          color: #666666;
          font-size: 13px;
          border-top: 1px solid #e0e0e0;
        }
        
        .instructions {
          margin-top: 25px;
          font-size: 14px;
        }
        
        @media only screen and (max-width: 600px) {
          .email-container {
            margin: 0;
            border-radius: 0;
            border: none;
          }
          
          .email-body {
            padding: 20px 15px;
          }
          
          .detail-label {
            width: 100px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h1>ParkEz Booking Confirmation</h1>
        </div>
        
        <div class="email-body">
          <div class="greeting">
            <p>Dear Customer,</p>
            <p>Thank you for choosing ParkEz. Your parking reservation has been confirmed.</p>
          </div>
          
          <div class="booking-details">
            <p><span class="detail-label">Parking Slot:</span> ${slotId}</p>
            <p><span class="detail-label">Date:</span> ${date}</p>
            <p><span class="detail-label">Time Slot:</span> ${timeSlot}</p>
            <p><span class="detail-label">Location:</span> Ajeenkya DY Patil Parking Zone</p>
            <p><span class="detail-label">Transaction ID:</span> ${paymentId}</p>
          </div>
          
          <div class="instructions">
            <p>Please present this confirmation when arriving at the parking facility.</p>
            <p>For booking modifications, please contact us at least 2 hours prior to your scheduled time.</p>
          </div>
        </div>
        
        <div class="email-footer">
          <p>Need assistance? Contact our support team at support@parkez.com</p>
          <p>&copy; 2025 ParkEz. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
