import { NextResponse } from "next/server";
import clientPromise from "@/app/src/lib/mongodb";
import { resend } from "@/app/src/lib/resend";

export async function POST(request: Request) {
  try {
    let name = "";
    let email = "";
    let phone: string | null = null;
    let company: string | null = null;
    let domain = "fullstack";
    let domainTitle = "Full Stack Web and APP Platform";
    let message = "";
    let budget = "Open to Discussion / Quote";
    let timeline = "Flexible";
    let projectStatus = "Idea / Conceptual Phase";
    let additionalNotes: string | null = null;
    let fileName: string | null = null;
    let fileBuffer: Buffer | null = null;
    let fileType: string | undefined = undefined;

    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      name = (formData.get("name") as string) || "";
      email = (formData.get("email") as string) || "";
      phone = (formData.get("phone") as string) || null;
      company = (formData.get("company") as string) || null;
      domain = (formData.get("domain") as string) || "fullstack";
      domainTitle =
        (formData.get("domainTitle") as string) ||
        "Full Stack Web and APP Platform";
      message = (formData.get("message") as string) || "";
      budget =
        (formData.get("budget") as string) || "Open to Discussion / Quote";
      timeline = (formData.get("timeline") as string) || "Flexible";
      projectStatus =
        (formData.get("projectStatus") as string) || "Idea / Conceptual Phase";
      additionalNotes = (formData.get("additionalNotes") as string) || null;

      const fileEntry = formData.get("file");
      if (
        fileEntry &&
        typeof fileEntry === "object" &&
        "arrayBuffer" in fileEntry
      ) {
        const file = fileEntry as File;
        if (file.size > 0) {
          fileName = file.name;
          fileType = file.type || undefined;
          const arrayBuf = await file.arrayBuffer();
          fileBuffer = Buffer.from(arrayBuf);
        }
      }
    } else {
      const body = await request.json();
      name = body.name || "";
      email = body.email || "";
      phone = body.phone || null;
      company = body.company || null;
      domain = body.domain || "fullstack";
      domainTitle = body.domainTitle || "Full Stack Web and APP Platform";
      message = body.message || "";
      budget = body.budget || "Open to Discussion / Quote";
      timeline = body.timeline || "Flexible";
      projectStatus = body.projectStatus || "Idea / Conceptual Phase";
      additionalNotes = body.additionalNotes || null;
      fileName = body.fileName || null;

      if (body.fileBase64 && body.fileName) {
        fileBuffer = Buffer.from(body.fileBase64, "base64");
        fileType = body.fileType || undefined;
      }
    }

    // 1. Validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Full Name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { error: "Email Address is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Project Vision & Objectives are required." },
        { status: 400 }
      );
    }

    const sanitizedData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      company: company?.trim() || null,
      domain,
      domainTitle,
      message: message.trim(),
      budget: budget.trim(),
      timeline,
      projectStatus,
      additionalNotes: additionalNotes?.trim() || null,
      fileName: fileName || null,
      fileSize: fileBuffer ? fileBuffer.length : null,
      createdAt: new Date(),
      status: "unread",
      userAgent: request.headers.get("user-agent") || undefined,
    };

    // 2. Save to MongoDB (Portfolio -> collaborate)
    const client = await clientPromise;
    const dbName = (process.env.MONGODB_DB || "Portfolio").trim();
    const collectionName = (
      process.env.MONGODB_COLLABORATE_COLLECTION || "collaborate"
    ).trim();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const mongoResult = await collection.insertOne(sanitizedData);

    // 3. Send Email Notification with Attachment via Resend
    let emailStatus = "sent";
    let emailError: string | null = null;

    try {
      const recipientEmail = (
        process.env.CONTACT_EMAIL_TO || "harshilgajjar06@gmail.com"
      ).trim();
      const emailSubject = `[Harshil's Portfolio] New Collaboration Blueprint: ${sanitizedData.name} (${sanitizedData.domainTitle})`;

      // Prepare attachment if file buffer is present
      const attachments = [];
      if (fileBuffer && fileName) {
        attachments.push({
          filename: fileName,
          content: fileBuffer,
          contentType: fileType,
        });
      }

      const emailResponse = await resend.emails.send({
        from: "Harshil's Portfolio <onboarding@resend.dev>",
        to: recipientEmail,
        replyTo: sanitizedData.email,
        subject: emailSubject,
        ...(attachments.length > 0 ? { attachments } : {}),
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
                  max-width: 640px;
                  margin: 0 auto;
                  background: #ffffff;
                  border-radius: 14px;
                  overflow: hidden;
                  border: 1px solid #e2e8f0;
                  box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.06);
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
                .section-title {
                  font-size: 13px;
                  font-weight: 700;
                  text-transform: uppercase;
                  letter-spacing: 0.06em;
                  color: #2563eb;
                  margin-bottom: 16px;
                  padding-bottom: 6px;
                  border-bottom: 1px solid #f1f5f9;
                }
                .field-row {
                  margin-bottom: 18px;
                }
                .field-label {
                  font-size: 11px;
                  font-weight: 700;
                  text-transform: uppercase;
                  color: #64748b;
                  letter-spacing: 0.05em;
                  margin-bottom: 4px;
                }
                .field-value {
                  font-size: 15px;
                  color: #0f172a;
                }
                .field-value a {
                  color: #2563eb;
                  text-decoration: none;
                }
                .badge {
                  display: inline-block;
                  background-color: #eff6ff;
                  color: #1d4ed8;
                  border: 1px solid #bfdbfe;
                  font-size: 13px;
                  font-weight: 600;
                  padding: 4px 12px;
                  border-radius: 9999px;
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
                .attachment-card {
                  background-color: #f0fdf4;
                  border: 1px solid #bbf7d0;
                  border-left: 4px solid #16a34a;
                  border-radius: 8px;
                  padding: 14px 16px;
                  box-sizing: border-box;
                  word-break: break-all;
                  overflow-wrap: anywhere;
                  word-wrap: break-word;
                }
                .attachment-filename {
                  font-size: 14px;
                  font-weight: 700;
                  color: #14532d;
                  line-height: 1.45;
                  word-break: break-all;
                  overflow-wrap: anywhere;
                  word-wrap: break-word;
                  display: block;
                }
                .attachment-meta {
                  font-size: 12px;
                  color: #166534;
                  line-height: 1.4;
                  margin-top: 6px;
                  display: block;
                  word-break: normal;
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
                  <h2>🎉 [Harshil's Portfolio] New Collaboration Blueprint</h2>
                  <div class="header-tag">Partnership Launchpad Submission</div>
                </div>
                <div class="content">
                  <div class="section-title">Client Information</div>
                  <div class="field-row">
                    <div class="field-label">Full Name</div>
                    <div class="field-value"><strong>${sanitizedData.name}</strong></div>
                  </div>
                  <div class="field-row">
                    <div class="field-label">Email Address</div>
                    <div class="field-value">
                      <a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a>
                    </div>
                  </div>
                  ${
                    sanitizedData.phone
                      ? `
                  <div class="field-row">
                    <div class="field-label">Phone Number</div>
                    <div class="field-value">${sanitizedData.phone}</div>
                  </div>`
                      : ""
                  }
                  ${
                    sanitizedData.company
                      ? `
                  <div class="field-row">
                    <div class="field-label">Company / Organization</div>
                    <div class="field-value">${sanitizedData.company}</div>
                  </div>`
                      : ""
                  }

                  <div class="section-title" style="margin-top: 24px;">Project Architecture &amp; Scope</div>
                  <div class="field-row">
                    <div class="field-label">Discipline / Collaboration Type</div>
                    <div class="field-value"><span class="badge">${sanitizedData.domainTitle}</span></div>
                  </div>
                  <div class="field-row">
                    <div class="field-label">Project Vision &amp; Objectives</div>
                    <div class="message-box">${sanitizedData.message
                      .replace(/&/g, "&amp;")
                      .replace(/</g, "&lt;")
                      .replace(/>/g, "&gt;")}</div>
                  </div>
                  <div class="field-row">
                    <div class="field-label">Budget Inquiry &amp; Notes</div>
                    <div class="field-value"><strong>${sanitizedData.budget}</strong></div>
                  </div>
                  <div class="field-row">
                    <div class="field-label">Desired Timeline</div>
                    <div class="field-value">${sanitizedData.timeline}</div>
                  </div>
                  <div class="field-row">
                    <div class="field-label">Project Status</div>
                    <div class="field-value">${sanitizedData.projectStatus}</div>
                  </div>
                  ${
                    sanitizedData.fileName
                      ? `
                  <div class="field-row">
                    <div class="field-label">Attached File / Specs</div>
                    <div class="attachment-card" style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-left: 4px solid #16a34a; border-radius: 8px; padding: 14px 16px; box-sizing: border-box; word-break: break-all; overflow-wrap: anywhere; word-wrap: break-word;">
                      <div class="attachment-filename" style="font-size: 14px; font-weight: 700; color: #14532d; line-height: 1.45; word-break: break-all; overflow-wrap: anywhere; word-wrap: break-word; display: block;">
                        📎 ${sanitizedData.fileName}
                      </div>
                      <div class="attachment-meta" style="font-size: 12px; color: #166534; line-height: 1.4; margin-top: 6px; display: block;">
                        ${
                          sanitizedData.fileSize
                            ? `Size: <strong>${(sanitizedData.fileSize / 1024).toFixed(1)} KB</strong> &bull; `
                            : ""
                        }Attached below &bull; Open or download in Gmail
                      </div>
                    </div>
                  </div>`
                      : ""
                  }
                  ${
                    sanitizedData.additionalNotes
                      ? `
                  <div class="field-row">
                    <div class="field-label">Additional Notes</div>
                    <div class="message-box" style="border-left-color: #10b981;">${sanitizedData.additionalNotes
                      .replace(/&/g, "&amp;")
                      .replace(/</g, "&lt;")
                      .replace(/>/g, "&gt;")}</div>
                  </div>`
                      : ""
                  }
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
        console.error("Resend collaborate email error:", emailResponse.error);
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
      message: "Blueprint Dispatched Successfully!",
      id: mongoResult.insertedId,
      emailStatus,
      emailError,
    });
  } catch (error: unknown) {
    console.error("Collaborate API error:", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { error: "Failed to process collaboration request: " + message },
      { status: 500 }
    );
  }
}
