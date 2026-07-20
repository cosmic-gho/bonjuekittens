# Vercel Deployment Guide

## Prerequisites

1. **GitHub Account**: Make sure your code is pushed to a GitHub repository
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **Database**: Set up a PostgreSQL database (recommended: Supabase, Neon, or Railway)

## Step 1: Prepare Your Database

### Option A: Supabase (Recommended)
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > Database to get your connection string
4. Run the following commands locally to set up your database:

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed the database (optional)
npm run prisma:seed
```

### Option B: Neon
1. Go to [neon.tech](https://neon.tech)
2. Create a new project
3. Get your connection string from the dashboard

## Step 2: Deploy to Vercel

### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI**:
```bash
npm i -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy**:
```bash
vercel
```

4. **Follow the prompts**:
   - Link to existing project or create new
   - Set up environment variables (see below)

### Method 2: GitHub Integration

1. **Connect GitHub to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Environment Variables**:
   - Go to Project Settings > Environment Variables
   - Add the following variables:

## Step 3: Environment Variables

Add these environment variables in your Vercel project settings:

### Required Variables:
```
DATABASE_URL=postgresql://username:password@host:port/database
NEXTAUTH_SECRET=your-random-secret-key
NEXTAUTH_URL=https://your-domain.vercel.app
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### Optional Variables (for image uploads):
```
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## Step 4: Database Setup

After deployment, you need to set up your database:

1. **Generate Prisma Client**:
```bash
npx prisma generate
```

2. **Push Schema**:
```bash
npx prisma db push
```

3. **Seed Data** (optional):
```bash
npm run prisma:seed
```

## Step 5: Verify Deployment

1. Check your Vercel dashboard for deployment status
2. Visit your deployed URL
3. Test all functionality:
   - Homepage
   - Breeds page
   - Kittens page
   - Contact form
   - Admin panel

## Troubleshooting

### Common Issues:

1. **Database Connection Error**:
   - Verify your DATABASE_URL is correct
   - Ensure your database is accessible from Vercel

2. **Build Errors**:
   - Check the build logs in Vercel dashboard
   - Ensure all dependencies are in package.json

3. **Environment Variables**:
   - Double-check all environment variables are set
   - Restart deployment after adding variables

### Useful Commands:

```bash
# View deployment logs
vercel logs

# Redeploy
vercel --prod

# Check environment variables
vercel env ls
```

## Post-Deployment

1. **Set up custom domain** (optional)
2. **Configure analytics** (optional)
3. **Set up monitoring** (optional)
4. **Test all features thoroughly**

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test database connection
4. Check Next.js build logs 