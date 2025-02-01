import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;
    
    const transporter = nodemailer.createTransport({
      host: "mail.smtp2go.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP2GO_USER,
        pass: process.env.SMTP2GO_PASS
      }
    });

    const mailOptions = {
      from: '"Magnific Leads" <leads@crm.magnific.in>',
      to: 'info@magnific.in',
      subject: `New Lead: ${data.name} from ${data.city}`, 
      text: createTextBody(data),
      html: createEmailHTML(data),
      replyTo: data.email || 'leads@crm.magnific.in'
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}

const createTextBody = (data: any) => `
New Lead Notification
--------------------

Lead Details:
- Name: ${data.name}
- Phone: ${data.phone}
- City: ${data.city}
${data.email ? `- Email: ${data.email}` : ''}

Source Information:
- URL Path: /${data.url_slugs.join('/')}
- Timestamp: ${new Date().toLocaleString()}
`;

const createEmailHTML = (data: any) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Lead Notification</title>
</head>
<body style="font-family: 'Inter', Arial, sans-serif; margin: 0; padding: 0; background-color: #f8f9fa;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #1a5f7a, #2c3e50); padding: 40px 20px; text-align: center; border-radius: 16px 16px 0 0;">
      <h1 style="color: #ffffff; font-family: 'Playfair Display', serif; margin: 0; font-size: 28px;">New Lead Notification</h1>
      <p style="color: #c8a97e; margin: 10px 0 0;">Exclusive Collection Inquiry</p>
    </div>
    
    <div style="background: white; padding: 30px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
      <div style="margin-bottom: 25px;">
        <h2 style="color: #1a5f7a; font-size: 20px; margin: 0 0 20px;">Lead Details</h2>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666;">Name</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: 500; color: #2c3e50;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666;">Phone</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: 500; color: #2c3e50;">${data.phone}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666;">City</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: 500; color: #2c3e50;">${data.city}</td>
          </tr>
          ${data.email ? `
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666;">Email</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: 500; color: #2c3e50;">${data.email}</td>
          </tr>
          ` : ''}
        </table>
      </div>

      <div style="margin-top: 25px; padding-top: 25px; border-top: 1px solid #eee;">
        <h3 style="color: #1a5f7a; font-size: 16px; margin: 0 0 15px;">Source Information</h3>
        <p style="margin: 0; color: #666;">URL Path: /${data.url_slugs.join('/')}</p>
        <p style="margin: 5px 0 0; color: #666;">Timestamp: ${new Date().toLocaleString()}</p>
      </div>
    </div>
    
    <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
      <p style="margin: 0;">This is an automated notification from Magnific Lead Collection System</p>
    </div>
  </div>
</body>
</html>
`;