const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: false,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

exports.sendExpiryAlert = async (vendor, insurance, daysLeft, user) => {
  const subject = daysLeft === 0 ? `⚠️ Insurance Expired for ${vendor.name}` : `⏰ Reminder: ${daysLeft} days left for ${vendor.name}`;
  const html = `
    <div style="font-family: Inter, sans-serif; max-width:600px; margin:0 auto; padding:20px; border:1px solid #E2E8F0; border-radius:12px;">
      <h1 style="color:#4F46E5;">🛡️ VigilSure</h1>
      <p style="background:${daysLeft <= 7 ? '#FEE2E2' : '#FEF3C7'}; padding:12px; border-radius:8px;">${subject}</p>
      <table style="width:100%;"><tr><td>Vendor</td><td>${vendor.name}</td></tr>
      <tr><td>Policy</td><td>${insurance.policyNumber}</td></tr>
      <tr><td>Expiry</td><td>${new Date(insurance.expiryDate).toLocaleDateString()}</td></tr>
      <tr><td>Days Left</td><td style="font-weight:bold; color:${daysLeft <= 7 ? '#DC2626' : '#D97706'};">${daysLeft === 0 ? 'EXPIRED' : daysLeft}</td></tr></table>
      <a href="${process.env.FRONTEND_URL}/vendors" style="background:#4F46E5; color:white; padding:10px 20px; border-radius:8px; text-decoration:none; display:inline-block; margin-top:16px;">View Dashboard →</a>
      <p style="margin-top:20px; font-size:12px; color:#94A3B8;">This is an automated message from <strong>VigilSure</strong>.</p>
    </div>
  `;
  await transporter.sendMail({ from: process.env.EMAIL_USER, to: vendor.email, subject, html });
  await transporter.sendMail({ from: process.env.EMAIL_USER, to: user.email, subject: `[Internal] ${subject}`, html });
};

exports.sendPaymentConfirmation = async (email, name, plan, period, price) => {
  const html = `
    <div style="font-family: Inter, sans-serif; max-width:600px; margin:0 auto; padding:20px; border:1px solid #E2E8F0; border-radius:12px;">
      <h1 style="color:#4F46E5;">🛡️ VigilSure</h1>
      <h2>✅ Payment Successful!</h2>
      <p>Hi ${name},</p>
      <p>Your <strong>${plan}</strong> (${period}) subscription has been activated.</p>
      <p><strong>Plan:</strong> ${plan}</p>
      <p><strong>Period:</strong> ${period}</p>
      <p><strong>Amount:</strong> $${price}</p>
      <a href="${process.env.FRONTEND_URL}/dashboard" style="background:#4F46E5; color:white; padding:10px 20px; border-radius:8px; text-decoration:none; display:inline-block; margin-top:16px;">Go to Dashboard →</a>
    </div>
  `;
  await transporter.sendMail({ from: process.env.EMAIL_USER, to: email, subject: '✅ Payment Confirmation', html });
};
