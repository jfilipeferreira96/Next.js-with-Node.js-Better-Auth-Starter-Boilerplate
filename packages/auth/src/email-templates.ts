export const createVerificationEmailHTML = (user: { name: string | null; email: string }, verificationUrl: string) => {
  const userName = user?.name || 'there';
  
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify your email address</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif;
            background-color: #f6f9fc;
            margin: 0;
            padding: 20px;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .title {
            color: #1d1d1d;
            font-size: 24px;
            font-weight: 600;
            margin: 0 0 20px;
        }
        .text {
            color: #4a4a4a;
            font-size: 16px;
            line-height: 24px;
            margin: 0 0 20px;
        }
        .button {
            display: inline-block;
            background-color: #10b981;
            color: #ffffff;
            font-size: 16px;
            font-weight: 600;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 5px;
            margin: 20px 0;
            text-align: center;
        }
        .button:hover {
            background-color: #059669;
        }
        .footer {
            color: #898989;
            font-size: 14px;
            line-height: 22px;
            margin-top: 40px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="title">Verify Your Email Address ✉️</h1>
        </div>
        
        <p class="text">
            Hi ${userName}, thank you for signing up! To complete your registration, please verify your email address.
        </p>
        
        <p class="text">
            Click the button below to verify your email address and activate your account.
        </p>
        
        <div style="text-align: center;">
            <a href="${verificationUrl}" class="button">Verify Email</a>
        </div>
        
        <p class="text">
            If you didn't create an account with us, you can safely ignore this email.
        </p>
        
        <p class="text">
            For security reasons, this verification link will expire after 24 hours. If you need to verify your email after that time, please contact our support team.
        </p>
        
        <div class="footer">
            Best regards,<br>
            The Team
        </div>
    </div>
</body>
</html>`;
};

export const createWelcomeEmailHTML = (user: { name: string | null; email: string }) => {
  const userName = user?.name || 'there';
  
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to our platform!</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif;
            background-color: #f6f9fc;
            margin: 0;
            padding: 20px;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .title {
            color: #1d1d1d;
            font-size: 24px;
            font-weight: 600;
            margin: 0 0 20px;
        }
        .text {
            color: #4a4a4a;
            font-size: 16px;
            line-height: 24px;
            margin: 0 0 20px;
        }
        .footer {
            color: #898989;
            font-size: 14px;
            line-height: 22px;
            margin-top: 40px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="title">Welcome to Our Platform! 🎉</h1>
        </div>
        
        <p class="text">
            Hi ${userName}, welcome aboard! We're excited to have you as part of our community.
        </p>
        
        <p class="text">
            Your account has been successfully created and you're all set to start using our platform. We've built some amazing features that we think you'll love.
        </p>
        
        <p class="text">
            If you have any questions or need help getting started, don't hesitate to reach out to our support team.
        </p>
        
        <div class="footer">
            Best regards,<br>
            The Team
        </div>
    </div>
</body>
</html>`;
};

export const createPasswordResetEmailHTML = (user: { name: string | null; email: string }, resetUrl: string) => {
  const userName = user?.name || 'there';
  
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset your password</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif;
            background-color: #f6f9fc;
            margin: 0;
            padding: 20px;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .title {
            color: #1d1d1d;
            font-size: 24px;
            font-weight: 600;
            margin: 0 0 20px;
        }
        .text {
            color: #4a4a4a;
            font-size: 16px;
            line-height: 24px;
            margin: 0 0 20px;
        }
        .button {
            display: inline-block;
            background-color: #ef4444;
            color: #ffffff;
            font-size: 16px;
            font-weight: 600;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 5px;
            margin: 20px 0;
            text-align: center;
        }
        .button:hover {
            background-color: #dc2626;
        }
        .footer {
            color: #898989;
            font-size: 14px;
            line-height: 22px;
            margin-top: 40px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="title">Reset Your Password 🔒</h1>
        </div>
        
        <p class="text">
            Hi ${userName}, we received a request to reset your password.
        </p>
        
        <p class="text">
            Click the button below to reset your password. This link is valid for the next hour.
        </p>
        
        <div style="text-align: center;">
            <a href="${resetUrl}" class="button">Reset Password</a>
        </div>
        
        <p class="text">
            If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
        </p>
        
        <p class="text">
            For security reasons, this reset link will expire after 1 hour. If you need to reset your password after that time, please request a new reset link.
        </p>
        
        <div class="footer">
            Best regards,<br>
            The Team
        </div>
    </div>
</body>
</html>`;
};
