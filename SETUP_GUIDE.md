# PetCat Setup Guide

## Environment Configuration

To fix the 500 Internal Server Error when submitting the contact form, you need to set up your environment variables.

### 1. Create Environment File

Create a `.env.local` file in your project root with the following variables:

```bash
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/petcat_db"

# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password_here
SMTP_FROM=your_email@gmail.com
ADMIN_EMAIL=your_email@gmail.com

# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### 2. Database Setup

You need a PostgreSQL database. You can:

**Option A: Use a local PostgreSQL installation**
- Install PostgreSQL on your machine
- Create a database named `petcat_db`
- Update the `DATABASE_URL` with your credentials

**Option B: Use a cloud database service**
- Use services like Supabase, Railway, or Neon
- Get the connection string and update `DATABASE_URL`

**Option C: Use SQLite for development (simpler)**
- Change the database provider in `prisma/schema.prisma` from `postgresql` to `sqlite`
- Set `DATABASE_URL="file:./dev.db"`
- Run `npx prisma migrate dev` to create the database

### 3. Email Configuration

For Gmail SMTP:
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password (not your regular password)
3. Use the App Password in `SMTP_PASS`

### 4. Run Database Migrations

After setting up the database:

```bash
npx prisma migrate dev
npx prisma generate
```

### 5. Test the Setup

1. Start your development server: `npm run dev`
2. Try submitting the contact form
3. Check the browser console and server logs for any remaining errors

## Quick Fix for Testing

If you just want to test the form without setting up email, the form will now work with just the database configuration. Email notifications will be skipped if SMTP is not configured.

## Troubleshooting

- Check the browser console for detailed error messages
- Check the server logs in your terminal
- Ensure all environment variables are set correctly
- Make sure the database is running and accessible
