# Email Setup Instructions

To make the contact form actually send emails to your inbox, you need to set up Gmail App Password authentication.

## Step 1: Enable 2-Factor Authentication on Gmail

1. Go to your Google Account settings: https://myaccount.google.com/
2. Click on "Security" in the left sidebar
3. Under "Signing in to Google", click on "2-Step Verification"
4. Follow the prompts to enable 2-factor authentication

## Step 2: Generate App Password

1. Go back to Google Account settings: https://myaccount.google.com/
2. Click on "Security" in the left sidebar
3. Under "Signing in to Google", click on "App passwords"
4. Select "Mail" as the app
5. Select "Other (custom name)" as the device
6. Enter "PetCat Website" as the name
7. Click "Generate"
8. Copy the 16-character password (it will look like: abcd efgh ijkl mnop)

## Step 3: Update Environment Variables

1. Open your `.env.local` file
2. Add or update these lines:

```
# Gmail Configuration for Real Emails
GMAIL_USER=rebeccakeen19@gmail.com
GMAIL_APP_PASSWORD=your_16_character_app_password_here
```

Replace `your_16_character_app_password_here` with the actual app password you generated.

## Step 4: Update the Email Service

The email service is already configured to use Gmail. Once you set up the app password, emails will be sent to `rebeccakeen19@gmail.com` whenever someone submits the contact form.

## Step 5: Test the Setup

1. Restart your development server: `npm run dev`
2. Go to your contact form
3. Fill out and submit the form
4. Check your Gmail inbox for the email notification

## Troubleshooting

If emails still don't work:

1. Make sure 2-factor authentication is enabled
2. Make sure you're using the App Password, not your regular Gmail password
3. Check that the environment variables are set correctly
4. Check the server console for error messages

## Email Features

Once set up, you'll receive beautifully formatted emails with:
- Customer information in a table format
- Clickable email and phone links
- Customer message in a highlighted box
- Quick reply link
- Timestamp of when the inquiry was received

The emails will have the subject: "New Inquiry from [Customer Name] - PetCat Website"
