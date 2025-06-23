import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      name, 
      email, 
      subject, 
      message, 
      orderNumber, 
      orderDate, 
      returnReason, 
      productName, 
      urgencyLevel, 
      defectDescription 
    } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create email transporter
    // Note: You'll need to configure this with your email service
    // For now, I'll provide a basic structure
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // or your email provider's SMTP server
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });

    // Email content for lead/inquiry notification
    const emailContent = `
      <h2>🔔 New Customer Inquiry - Pink Malibu</h2>
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #d1477a; margin-top: 0;">Customer Information</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Inquiry Type:</strong> ${subject}</p>
        ${urgencyLevel ? `<p><strong>Urgency Level:</strong> <span style="color: ${urgencyLevel === 'Urgent' ? '#dc3545' : urgencyLevel === 'High' ? '#fd7e14' : urgencyLevel === 'Medium' ? '#ffc107' : '#28a745'}; font-weight: bold;">${urgencyLevel}</span></p>` : ''}
      </div>

      ${orderNumber || orderDate ? `
      <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #856404; margin-top: 0;">Order Details</h3>
        ${orderNumber ? `<p><strong>Order Number:</strong> ${orderNumber}</p>` : ''}
        ${orderDate ? `<p><strong>Order Date:</strong> ${orderDate}</p>` : ''}
        ${productName ? `<p><strong>Product:</strong> ${productName}</p>` : ''}
      </div>` : ''}

      ${returnReason ? `
      <div style="background-color: #d1ecf1; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #0c5460; margin-top: 0;">Return/Exchange Request</h3>
        <p><strong>Reason:</strong> ${returnReason}</p>
        ${defectDescription ? `<p><strong>Issue Description:</strong> ${defectDescription.replace(/\n/g, '<br>')}</p>` : ''}
      </div>` : ''}

      <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #495057; margin-top: 0;">Customer Message</h3>
        <p style="line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
      </div>
      
      <hr style="margin: 30px 0;">
      <p style="color: #6c757d; font-size: 14px;"><em>📧 This inquiry was submitted through the Pink Malibu website support form.</em></p>
      <p style="color: #6c757d; font-size: 14px;"><em>💬 Reply directly to this email to respond to the customer.</em></p>
    `;

    // Send email to your support email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'info@pink-malibu.com',
      subject: `New Message: ${subject}`,
      html: emailContent,
      replyTo: email,
    });

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 