# Testing Google OAuth Implementation

This document provides test cases and scenarios to verify the Google OAuth implementation.

## Prerequisites

Before testing, ensure you have:
1. Set up Google OAuth credentials (see GOOGLE_OAUTH_SETUP.md)
2. Added the environment variables to `.env.local`:
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_ID`
3. Started the development server: `npm run dev`

## Test Scenarios

### Scenario 1: New User Sign Up with Google

**Steps:**
1. Navigate to `/signup`
2. Click "Continue with Google" button
3. Select a Google account (use an email not registered in the system)
4. Authorize the application

**Expected Results:**
- ✅ User is redirected to the home page
- ✅ User is logged in (check navbar for user name)
- ✅ New user record created in MongoDB with:
  - `authProvider: 'google'`
  - `googleId` set
  - `picture` URL from Google (if provided)
  - No password field

### Scenario 2: Existing Google User Sign In

**Steps:**
1. Navigate to `/login`
2. Click "Sign in with Google" button
3. Select the same Google account used in Scenario 1

**Expected Results:**
- ✅ User is redirected to the home page
- ✅ User is logged in with existing account
- ✅ No duplicate user created

### Scenario 3: Email/Password User Upgrades to Google

**Steps:**
1. Create an account with email/password (e.g., test@example.com)
2. Log out
3. Navigate to `/login`
4. Click "Sign in with Google"
5. Sign in with Google account using test@example.com

**Expected Results:**
- ✅ User is redirected to the home page
- ✅ User is logged in with existing account
- ✅ User record updated in MongoDB:
  - `authProvider` changed to 'google'
  - `googleId` added
  - `picture` updated
  - Password field still exists (for backward compatibility)

### Scenario 4: Google User Cannot Use Email/Password Login

**Steps:**
1. Create/use an account via Google OAuth
2. Log out
3. Navigate to `/login`
4. Try to log in with email/password using the same email

**Expected Results:**
- ✅ Login fails
- ✅ Error message: "Please use Google Sign-In for this account"

### Scenario 5: User Closes Google Sign-In Popup

**Steps:**
1. Navigate to `/login` or `/signup`
2. Click "Continue with Google"
3. Close the Google popup without selecting an account

**Expected Results:**
- ✅ No error displayed (popup closure is user action)
- ✅ User remains on login/signup page
- ✅ Can try again

### Scenario 6: Invalid Google Credential

**Steps:**
This is handled by Google's library, but test by:
1. Modifying the credential validation temporarily in the API
2. Attempting to sign in

**Expected Results:**
- ✅ Error message displayed
- ✅ User not logged in
- ✅ No user record created/modified

### Scenario 7: Network Error During Google Sign-In

**Steps:**
1. Open browser DevTools
2. Throttle network to offline
3. Try to sign in with Google

**Expected Results:**
- ✅ Google script may fail to load
- ✅ Button may not render or show error
- ✅ User can still use email/password login

### Scenario 8: Missing Environment Variables

**Steps:**
1. Remove `NEXT_PUBLIC_GOOGLE_CLIENT_ID` from `.env.local`
2. Restart the dev server
3. Navigate to `/login`

**Expected Results:**
- ✅ Console error: "Google Client ID not configured. Please set NEXT_PUBLIC_GOOGLE_CLIENT_ID..."
- ✅ Google button does not render or shows error
- ✅ Email/password login still works

### Scenario 9: Multiple Browser Sessions

**Steps:**
1. Sign in with Google in Browser 1
2. Open Browser 2 (different browser or incognito)
3. Sign in with the same Google account

**Expected Results:**
- ✅ Both sessions are valid
- ✅ Each has its own JWT token
- ✅ Both can access protected routes

### Scenario 10: Token Expiry

**Steps:**
1. Sign in with Google
2. Wait for JWT to expire (1 hour)
3. Try to access a protected route

**Expected Results:**
- ✅ User is redirected to login
- ✅ Can sign in again with Google
- ✅ New token is issued

## Security Checks

### Check 1: Token Verification
- ✅ Backend verifies Google token with Google's servers
- ✅ Invalid tokens are rejected
- ✅ Tokens from wrong client ID are rejected

### Check 2: SQL Injection / NoSQL Injection
- ✅ Email and name from Google are properly sanitized
- ✅ MongoDB queries use Mongoose (safe by default)

### Check 3: CSRF Protection
- ✅ Google handles CSRF for OAuth flow
- ✅ Backend validates token origin

### Check 4: Sensitive Data
- ✅ No client secrets in frontend code
- ✅ Only NEXT_PUBLIC_GOOGLE_CLIENT_ID is exposed (safe)
- ✅ JWT secret stays on server

## Edge Cases

### Edge Case 1: Same Email, Different Google Accounts
**Scenario:** User signs up with Google account A (test@gmail.com), then tries to sign in with Google account B (also test@gmail.com but different Google ID)

**Expected:** Error message indicating email is registered with different Google account

### Edge Case 2: Google Account Without Email
**Scenario:** Google account doesn't provide email (very rare)

**Expected:** Error message: "Email not provided by Google"

### Edge Case 3: Incomplete User Data
**Scenario:** User record exists with `authProvider: 'google'` but no `googleId` (data inconsistency)

**Expected:** System fixes the inconsistency by adding the `googleId`

### Edge Case 4: Special Characters in Name
**Scenario:** Google account has name with special characters (é, ñ, 中文)

**Expected:** Name is stored correctly and displayed properly

## Manual Testing Checklist

- [ ] Login page displays Google Sign-In button
- [ ] Signup page displays Google Sign-In button
- [ ] Button has correct text ("Sign in with" vs "Sign up with")
- [ ] Google popup opens when button is clicked
- [ ] Successful Google auth redirects to home page
- [ ] User session persists after page refresh
- [ ] User can log out successfully
- [ ] Email/password login still works independently
- [ ] Error messages are clear and helpful
- [ ] Visual separator ("OR") displays correctly
- [ ] Responsive design works on mobile
- [ ] No console errors during normal flow

## Database Verification

After each test, verify in MongoDB:

```javascript
// Find user by email
db.users.findOne({ email: "test@example.com" })

// Check fields:
{
  name: "Test User",
  email: "test@example.com",
  authProvider: "google" or "email",
  googleId: "google_user_id" (if Google auth),
  picture: "https://..." (if Google auth),
  password: "hashed_password" (only for email auth or upgraded accounts)
}
```

## Performance Testing

- [ ] Google script loads asynchronously (doesn't block page)
- [ ] Button renders within 1-2 seconds
- [ ] OAuth flow completes in < 5 seconds
- [ ] No memory leaks on repeated sign in/out

## Browser Compatibility

Test on:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Chrome (Android)
- [ ] Mobile Safari (iOS)

## Accessibility Testing

- [ ] Button is keyboard accessible (Tab + Enter)
- [ ] Screen reader announces button correctly
- [ ] Focus styles are visible
- [ ] Color contrast meets WCAG standards
