import { createWelcomeEmailHTML, createPasswordResetEmailHTML, createVerificationEmailHTML } from "./email-templates";

const sender = {
  address: process.env.MAILTRAP_SENDER_EMAIL || "hello@demomailtrap.com",
  name: process.env.MAILTRAP_SENDER_NAME || "Your App",
};

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

interface MailtrapApiResponse {
  success: boolean;
  message_ids: string[];
}

interface MailtrapApiError {
  errors?: string[];
  message?: string;
}

export const sendEmail = async ({ to, subject, html, text }: SendEmailOptions) => {
  const TOKEN = process.env.MAILTRAP_TOKEN;

  if (!TOKEN) {
    throw new Error("MAILTRAP_TOKEN environment variable is not set");
  }

  try {
    console.log("Sending email via Mailtrap API to:", to);

    const response = await fetch("https://send.api.mailtrap.io/api/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: {
          email: sender.address,
          name: sender.name,
        },
        to: [
          {
            email: to,
          },
        ],
        subject,
        html,
        text: text || "",
        category: "Authentication",
        headers: {
          "X-Priority": "1",
          Importance: "high",
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorData = data as MailtrapApiError;
      const errorMessage = errorData.errors?.join(", ") || errorData.message || "Unknown error";
      console.error("Mailtrap API error:", errorMessage);
      throw new Error(`Mailtrap API error: ${response.status} - ${errorMessage}`);
    }

    const successData = data as MailtrapApiResponse;
    console.log("Email sent successfully via API:", successData);

    return {
      success: true,
      messageId: successData.message_ids[0] || "sent",
    };
  } catch (error) {
    console.error("Detailed error sending email:", error);

    if (error instanceof Error) {
      console.error("Error message:", error.message);
    }

    throw new Error(`Failed to send email: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

export const sendWelcomeEmail = async (user: { name: string | null; email: string }) => {
  const html = createWelcomeEmailHTML(user);

  return sendEmail({
    to: user.email,
    subject: "Welcome to our platform!",
    html,
    text: `Welcome to our platform, ${user.name || "there"}! We're excited to have you on board.`,
  });
};

export const sendPasswordResetEmail = async (user: { name: string | null; email: string }, url: string) => {
  console.log("sendPasswordResetEmail called for:", user.email);

  const html = createPasswordResetEmailHTML(user, url);

  return sendEmail({
    to: user.email,
    subject: "Reset your password",
    html,
    text: `Hi ${user.name || "there"}, please click the following link to reset your password: ${url}`,
  });
};

export const sendEmailVerificationEmail = async (user: { name: string | null; email: string }, url: string) => {
  try {
    console.log("Preparing to send verification email to:", user.email);
    console.log("Verification URL:", url);

    const html = createVerificationEmailHTML(user, url);

    console.log("Email HTML generated successfully");

    const result = await sendEmail({
      to: user.email,
      subject: "Verify your email address",
      html,
      text: `Hi ${user.name || "there"}, please click the following link to verify your email address: ${url}`,
    });

    console.log("Verification email sent successfully");
    return result;
  } catch (error) {
    console.error("Error in sendEmailVerificationEmail:", error);
    throw error;
  }
};
