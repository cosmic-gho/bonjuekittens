# Production Troubleshooting Guide

## Issue: Kittens not showing in production but data exists in admin

### Possible Causes and Solutions:

#### 1. **Environment Variables**
Check if these are set in your Vercel project:
```
DATABASE_URL=your-postgresql-connection-string
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

#### 2. **Database Connection**
- Verify your database is accessible from Vercel
- Check if your database URL is correct
- Ensure your database allows connections from Vercel's IP ranges

#### 3. **API Route Issues**
- Visit `/debug` page to test API endpoints
- Check browser console for errors
- Check Vercel function logs

#### 4. **CORS Issues**
- The API might be blocked by CORS
- Check if the fetch request is using the correct URL

### Debugging Steps:

#### Step 1: Check Environment Variables
1. Go to your Vercel dashboard
2. Navigate to Project Settings > Environment Variables
3. Verify all required variables are set

#### Step 2: Test API Directly
1. Visit `https://your-domain.vercel.app/debug`
2. Check the debug information
3. Test the API endpoint

#### Step 3: Check Vercel Logs
1. Go to your Vercel dashboard
2. Navigate to Functions tab
3. Check for any error logs in `/api/kittens`

#### Step 4: Database Verification
1. Connect to your database directly
2. Verify kittens exist in the database
3. Check if the connection string is working

### Quick Fixes:

#### Fix 1: Update Environment Variables
Make sure these are set in Vercel:
```
DATABASE_URL=postgresql://username:password@host:port/database
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

#### Fix 2: Test Database Connection
Add this to your API route temporarily:
```typescript
export async function GET(req: NextRequest) {
  try {
    // Test database connection
    await prisma.$connect()
    console.log('Database connected successfully');
    
    const kittens = await prisma.kitten.findMany({
      include: { breed: true },
      orderBy: { createdAt: 'desc' },
    });
    
    return Response.json(kittens);
  } catch (error) {
    console.error('Database error:', error);
    return new Response(`Database error: ${error.message}`, { status: 500 });
  }
}
```

#### Fix 3: Check CORS
If it's a CORS issue, add this to your API route:
```typescript
export async function GET(req: NextRequest) {
  const response = Response.json(kittens);
  response.headers.set('Access-Control-Allow-Origin', '*');
  return response;
}
```

### Common Solutions:

1. **Database not accessible**: Check your database connection string and firewall settings
2. **Environment variables missing**: Set them in Vercel dashboard
3. **API route failing**: Check Vercel function logs
4. **CORS issues**: Add proper CORS headers
5. **Build issues**: Check if Prisma client is generated properly

### Next Steps:

1. Visit `/debug` page to identify the specific issue
2. Check Vercel function logs
3. Verify environment variables
4. Test database connection
5. Update the code based on the findings

The debug page will help identify exactly what's going wrong! 🔍 