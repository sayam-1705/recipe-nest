# Google OAuth Setup Guide

This guide will walk you through setting up Google OAuth authentication for RecipeNest.

## Prerequisites

- A Google account
- Access to the [Google Cloud Console](https://console.cloud.google.com/)

## Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top of the page
3. Click "New Project"
4. Enter a project name (e.g., "RecipeNest")
5. Click "Create"

## Step 2: Enable Google Sign-In API

1. In your project, navigate to "APIs & Services" > "Library"
2. Search for "Google+ API" or "Google Identity"
3. Click on it and then click "Enable"

## Step 3: Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type (unless you have a Google Workspace account)
3. Click "Create"
4. Fill in the required fields:
   - **App name**: RecipeNest
   - **User support email**: Your email address
   - **Developer contact information**: Your email address
5. Click "Save and Continue"
6. On the Scopes page, you don't need to add any scopes for basic authentication
7. Click "Save and Continue"
8. Add test users if you're in testing mode
9. Click "Save and Continue"

## Step 4: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Select "Web application" as the application type
4. Configure the following:
   - **Name**: RecipeNest Web Client
   - **Authorized JavaScript origins**: 
     - `http://localhost:3000` (for development)
     - Your production URL (e.g., `https://your-domain.com`)
   - **Authorized redirect URIs**: 
     - `http://localhost:3000` (for development)
     - Your production URL (e.g., `https://your-domain.com`)
5. Click "Create"
6. Copy your **Client ID** - you'll need this for the environment variables

## Step 5: Configure Environment Variables

Add the following to your `.env.local` file:

```bash
# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
GOOGLE_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
```

Replace `your_client_id_here` with the Client ID you copied in Step 4.

## Step 6: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the login or signup page
3. Click the "Continue with Google" button
4. Sign in with your Google account
5. You should be redirected back to the application and logged in

## Important Notes

### Security

- **Never commit your Client ID to public repositories** if it's associated with production credentials
- The `NEXT_PUBLIC_` prefix makes the variable accessible in the browser, which is necessary for Google Sign-In
- Keep your Google Cloud project in "Testing" mode until you're ready to publish

### Production Deployment

When deploying to production:

1. Update the authorized JavaScript origins and redirect URIs in Google Cloud Console with your production URL
2. Update the environment variables on your hosting platform (e.g., Vercel, Netlify)
3. Consider publishing your OAuth consent screen if you want any Google user to be able to sign in

### Troubleshooting

**Error: "redirect_uri_mismatch"**
- Make sure your authorized redirect URIs in Google Cloud Console match your application's URL exactly

**Error: "popup_closed_by_user"**
- This is expected behavior when users close the Google Sign-In popup

**Google button not rendering**
- Check browser console for errors
- Ensure `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set correctly
- Verify the Google Sign-In script is loading (check Network tab)

## How It Works

1. User clicks "Continue with Google" button
2. Google Sign-In popup opens
3. User authenticates with Google
4. Google returns a credential (JWT token)
5. Frontend sends the credential to `/api/google-auth`
6. Backend verifies the token with Google
7. Backend creates or updates user in MongoDB
8. Backend returns authentication token
9. User is logged in and redirected to home page

## Merging Google and Email/Password Accounts

The implementation supports users who:
- Sign up with email/password first, then use Google Sign-In with the same email
- Sign up with Google first, then try to use email/password (will be prompted to use Google)

When a user signs in with Google using an email that already exists in the database:
- If the account was created with email/password, it will be updated to support Google authentication
- The user will be able to use both methods in the future
- If the account was created with a different Google account, an error will be shown
