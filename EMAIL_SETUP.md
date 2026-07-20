# Email Notification Setup (SMTP)

This guide will help you set up email notifications for customer inquiries using your own SMTP server.

## Prerequisites

1. **Email Account**: Any email account that supports SMTP (Gmail, Outlook, Yahoo, etc.)
2. **App Password**: For Gmail, you'll need to generate an app password

## Setup Steps

### 1. Configure Your Email Provider

#### For Gmail:
1. Enable 2-factor authentication on your Google account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. Use this app password instead of your regular password

#### For Outlook/Hotmail:
- Use your regular email and password
- SMTP settings: `smtp-mail.outlook.com`, port 587

#### For Yahoo:
- Use your regular email and password
- SMTP settings: `smtp.mail.yahoo.com`, port 587

### 2. Configure Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password_here
SMTP_FROM=your_email@gmail.com
ADMIN_EMAIL=your_email@gmail.com

# Database
DATABASE_URL="your_database_url_here"

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### 3. Common SMTP Settings

| Provider | SMTP_HOST | SMTP_PORT | SMTP_SECURE |
|----------|-----------|-----------|-------------|
| Gmail | smtp.gmail.com | 587 | false |
| Outlook | smtp-mail.outlook.com | 587 | false |
| Yahoo | smtp.mail.yahoo.com | 587 | false |
| iCloud | smtp.mail.me.com | 587 | false |

## How It Works

1. When a user submits an inquiry through the contact form
2. The form data is sent to `/api/inquiries`
3. The inquiry is saved to the database
4. An email notification is sent to your admin email with:
   - Customer information (name, email, phone)
   - Their message
   - Which kitten they're interested in (if any)

## Testing

1. Start your development server: `pnpm dev`
2. Go to the contact page
3. Fill out and submit the form
4. Check your email for the notification

## Troubleshooting

### Email Not Sending
- Verify your SMTP credentials are correct
- Check that `ADMIN_EMAIL` is set to a valid email address
- For Gmail: Make sure you're using an App Password, not your regular password
- Check your email provider's security settings

### Common Issues
- **Gmail**: "Less secure app access" is disabled - use App Passwords instead
- **Authentication failed**: Double-check your username and password
- **Connection timeout**: Verify SMTP host and port settings

### Development vs Production
- Same settings work for both development and production
- No domain verification required
- Works with any email provider that supports SMTP

## Security Notes

- Never commit your `.env.local` file to version control
- Keep your email passwords secure
- For Gmail, always use App Passwords instead of your regular password
- Consider using environment variables in your deployment platform (Vercel, etc.)

## Customization

You can customize the email template in `lib/email.ts`:
- Change the HTML styling
- Add more information to the email
- Modify the subject line format
- Add your business branding 