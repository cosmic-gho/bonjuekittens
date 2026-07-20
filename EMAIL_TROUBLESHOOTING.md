# Email Troubleshooting Guide

If emails are not sending from your PetCat website, follow this step-by-step troubleshooting guide.

## Step 1: Check Environment Variables

First, ensure you have a `.env.local` file in your project root with the correct email settings:

```env
# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password_here
SMTP_FROM=your_email@gmail.com
ADMIN_EMAIL=your_email@gmail.com
```

## Step 2: Run the Email Test Script

Run this command to test your email configuration:

```bash
node scripts/test-email.js
```

This will:
- Check if all environment variables are set
- Test SMTP connection
- Send a test email
- Provide specific error messages and solutions

## Step 3: Common Issues and Solutions

### Issue: "Missing required environment variables"
**Solution**: Create a `.env.local` file with all required variables (see Step 1)

### Issue: "Invalid login" or "Authentication failed"
**For Gmail users**:
1. Enable 2-factor authentication on your Google account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. Use this app password in `SMTP_PASS`, not your regular password

**For other email providers**:
- Verify your username and password are correct
- Check if your email provider requires special settings

### Issue: "Connection refused" or "ECONNREFUSED"
**Solution**: Check your SMTP settings:

| Provider | SMTP_HOST | SMTP_PORT | SMTP_SECURE |
|----------|-----------|-----------|-------------|
| Gmail | smtp.gmail.com | 587 | false |
| Outlook | smtp-mail.outlook.com | 587 | false |
| Yahoo | smtp.mail.yahoo.com | 587 | false |
| iCloud | smtp.mail.me.com | 587 | false |

### Issue: "Less secure app access" (Gmail)
**Solution**: Use App Passwords instead of your regular password (see Gmail section above)

### Issue: Emails not appearing in inbox
**Solutions**:
1. Check your spam/junk folder
2. Add your email address to contacts
3. Check if your email provider has any security restrictions

## Step 4: Debug with Console Logs

The improved email system now provides detailed console logs. To see them:

1. Start your development server: `pnpm dev`
2. Submit a contact form
3. Check the terminal/console for detailed logs

Look for these log messages:
- "Email configuration validation passed"
- "SMTP connection verified successfully"
- "Email sent successfully!"
- Any error messages with specific details

## Step 5: Test Different Email Providers

If Gmail doesn't work, try these alternatives:

### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
```

### Yahoo
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_SECURE=false
```

### iCloud
```env
SMTP_HOST=smtp.mail.me.com
SMTP_PORT=587
SMTP_SECURE=false
```

## Step 6: Production Deployment

For production (Vercel, etc.):

1. Add environment variables in your deployment platform
2. Use the same SMTP settings as development
3. No domain verification required for most providers

## Step 7: Advanced Troubleshooting

### Check Network/Firewall
- Ensure your network allows SMTP connections
- Check if corporate firewalls are blocking SMTP

### Test with Different Ports
Try these alternative ports:
- 587 (TLS)
- 465 (SSL)
- 25 (unencrypted, not recommended)

### Enable Debug Mode
Add this to your `.env.local` for detailed SMTP logs:
```env
DEBUG=nodemailer:*
```

## Still Having Issues?

1. Run the test script: `node scripts/test-email.js`
2. Check the console logs in your development server
3. Try a different email provider
4. Verify your email provider's SMTP settings on their website

## Quick Fix Checklist

- [ ] `.env.local` file exists with all required variables
- [ ] Using App Password for Gmail (not regular password)
- [ ] SMTP settings match your email provider
- [ ] 2-factor authentication enabled (for Gmail)
- [ ] Test script runs successfully
- [ ] No firewall blocking SMTP connections
- [ ] Checked spam folder for test emails

If you've completed all steps and emails still aren't sending, the detailed console logs should provide specific error information to help identify the issue. 