import { NextResponse } from "next/server";
import clientPromise from "@/app/src/lib/mongodb";
import { resend } from "@/app/src/lib/resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // 1. Validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { error: "Email address is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const sanitizedData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject && typeof subject === "string" ? subject.trim() : "General Inquiry",
      message: message.trim(),
      createdAt: new Date(),
      status: "unread",
      userAgent: request.headers.get("user-agent") || undefined,
    };

    // 2. Save to MongoDB (Portfolio -> contact)
    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB || "Portfolio";
    const collectionName = process.env.MONGODB_COLLECTION || "contact";
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const mongoResult = await collection.insertOne(sanitizedData);

    // 3. Send Email Notification via Resend
    let emailStatus = "sent";
    let emailError: string | null = null;

    try {
      const recipientEmail = process.env.CONTACT_EMAIL_TO || "harshilgajjar06@gmail.com";
      const emailSubject = `[Harshil's Portfolio] New Contact Inquiry: ${sanitizedData.subject} from ${sanitizedData.name}`;

      const emailResponse = await resend.emails.send({
        from: "Harshil's Portfolio <onboarding@resend.dev>",
        to: recipientEmail,
        replyTo: sanitizedData.email,
        subject: emailSubject,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                  background-color: #f1f5f9;
                  margin: 0;
                  padding: 24px;
                  color: #0f172a;
                }
                .wrapper {
                  max-width: 600px;
                  margin: 0 auto;
                  background: #ffffff;
                  border-radius: 12px;
                  overflow: hidden;
                  border: 1px solid #e2e8f0;
                  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
                }
                .header {
                  background: linear-gradient(135deg, #090d16 0%, #1e293b 100%);
                  color: #ffffff;
                  padding: 28px 32px;
                }
                .header h2 {
                  margin: 0;
                  font-size: 20px;
                  font-weight: 700;
                  letter-spacing: -0.02em;
                }
                .header-tag {
                  display: inline-block;
                  margin-top: 8px;
                  font-size: 11px;
                  font-weight: 600;
                  text-transform: uppercase;
                  letter-spacing: 0.06em;
                  color: #38bdf8;
                }
                .content {
                  padding: 32px;
                }
                .field-row {
                  margin-bottom: 20px;
                }
                .field-label {
                  font-size: 11px;
                  font-weight: 700;
                  text-transform: uppercase;
                  color: #64748b;
                  letter-spacing: 0.06em;
                  margin-bottom: 6px;
                }
                .field-value {
                  font-size: 15px;
                  color: #0f172a;
                }
                .field-value a {
                  color: #2563eb;
                  text-decoration: none;
                }
                .message-box {
                  background: #f8fafc;
                  border: 1px solid #e2e8f0;
                  border-left: 4px solid #2563eb;
                  border-radius: 6px;
                  padding: 16px 20px;
                  font-size: 15px;
                  line-height: 1.6;
                  color: #334155;
                  white-space: pre-wrap;
                  word-break: break-word;
                  overflow-wrap: anywhere;
                  box-sizing: border-box;
                }
                .footer {
                  padding: 18px 32px;
                  background: #f8fafc;
                  border-top: 1px solid #e2e8f0;
                  font-size: 12px;
                  color: #94a3b8;
                  text-align: center;
                }
              </style>
            </head>
            <body>
              <div class="wrapper">
                <div class="header">
                  <h2>[Harshil&apos;s Portfolio] New Contact Inquiry</h2>
                  <div class="header-tag">Harshil Gajjar Portfolio</div>
                </div>
                <div class="content">
                  <div class="field-row">
                    <div class="field-label">Sender Name</div>
                    <div class="field-value"><strong>${sanitizedData.name}</strong></div>
                  </div>
                  <div class="field-row">
                    <div class="field-label">Sender Email</div>
                    <div class="field-value">
                      <a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a>
                    </div>
                  </div>
                  <div class="field-row">
                    <div class="field-label">Subject</div>
                    <div class="field-value">${sanitizedData.subject}</div>
                  </div>
                  <div class="field-row">
                    <div class="field-label">Message</div>
                    <div class="message-box">${sanitizedData.message
                      .replace(/&/g, "&amp;")
                      .replace(/</g, "&lt;")
                      .replace(/>/g, "&gt;")}</div>
                  </div>
                </div>
                <div class="footer">
                  Stored in MongoDB <strong>${dbName}.${collectionName}</strong> &bull; Resend Notification
                </div>
              </div>
            </body>
          </html>
        `,
      });

      if (emailResponse.error) {
        console.error("Resend API returned error:", emailResponse.error);
        emailStatus = "failed";
        emailError = emailResponse.error.message;
      }
    } catch (err: unknown) {
      console.error("Failed to send email via Resend:", err);
      emailStatus = "failed";
      emailError = err instanceof Error ? err.message : "Unknown error";
    }

    return NextResponse.json({
      success: true,
      message: "Message received and saved successfully!",
      id: mongoResult.insertedId,
      emailStatus,
      emailError,
    });
  } catch (error: unknown) {
    console.error("Contact API error:", error);
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { error: "Failed to process contact submission: " + message },
      { status: 500 }
    );
  }
}

