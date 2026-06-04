# Auth UI Setup Guide - Quick Start

## What Was Built

✅ **Signup Form** - Create new accounts with password strength indicator  
✅ **Login Form** - Sign in with email/password  
✅ **User Dashboard** - View API keys, usage stats, billing, profile  
✅ **Auth Context** - Centralized authentication state  
✅ **Protected Routes** - Redirect unauthenticated users to login  
✅ **Navigation Updates** - Show user menu when authenticated  

---

## Quick Start (5 minutes)

### 1. Install Dependencies (if needed)
```bash
cd agent-monetization-hub-frontend
npm install
```

### 2. Set Environment Variables
Create/update `.env.local`:
```
NEXT_PUBLIC_API_URL=https://agent-monetization-hub-backend-production.up.railway.app
```

For local backend:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 3. Run Development Server
```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 4. Test Auth Flow
1. Click "Sign Up" in navigation
2. Fill in signup form (any email, password 8+ chars)
3. Get API key on success screen
4. Click "Go to Dashboard"
5. See your profile and API keys
6. Click "Logout" to sign out

---

## File Changes Summary

### New Files
- `lib/auth-context.tsx` - Auth context provider
- `app/auth/signup/page.tsx` - Signup form
- `app/auth/login/page.tsx` - Login form
- `components/PasswordStrengthIndicator.tsx` - Password strength UI
- `components/ProtectedRoute.tsx` - Route protection wrapper
- `AUTH_UI_IMPLEMENTATION.md` - Full documentation

### Updated Files
- `app/layout.tsx` - Wrapped with AuthProvider
- `app/dashboard/page.tsx` - Uses auth context & protection
- `components/Navigation.tsx` - Shows user menu when authenticated
- `components/index.ts` - Export new components

---

## How It Works

### Authentication Flow

```
User visits /auth/signup
    ↓
Fills form (email, password, name)
    ↓
Clicks "Create Account"
    ↓
API: POST /api/v1/auth/register
    ↓
Backend returns: { access_token, user, api_key }
    ↓
Frontend stores token in localStorage
    ↓
Shows success screen with API key
    ↓
User can copy key or go to dashboard
    ↓
ProtectedRoute confirms auth, shows dashboard
```

### State Management

Everything goes through the `useAuth()` hook:

```typescript
const { user, token, isAuthenticated, login, signup, logout } = useAuth();
```

**What it stores:**
- `user` - { id, email, first_name, last_name, tier, api_keys }
- `token` - JWT token from backend
- `isAuthenticated` - true if user is logged in
- `isLoading` - true while request is processing

---

## API Integration Points

### Register (Sign Up)
```
POST /api/v1/auth/register
Headers: Content-Type: application/json
Body: {
  "email": "user@example.com",
  "password": "SecurePass123!",
  "first_name": "John",
  "last_name": "Doe"
}

Returns: 201 Created
{
  "access_token": "eyJ...",
  "user": { ... },
  "api_key": "amh_..."
}
```

### Login
```
POST /api/v1/auth/login
Headers: Content-Type: application/json
Body: {
  "email": "user@example.com",
  "password": "SecurePass123!"
}

Returns: 200 OK
{
  "access_token": "eyJ...",
  "user": { ... }
}
```

---

## Common Issues & Solutions

### Issue: "API error: 500"
**Cause**: Backend not running or API_URL incorrect  
**Solution**: 
1. Check backend is running (`npm run dev`)
2. Verify `NEXT_PUBLIC_API_URL` in `.env.local`
3. Check backend logs for errors

### Issue: "Email already in use" on signup
**Expected behavior** - User tried to sign up with existing email  
**Solution**: Use a different email or login instead

### Issue: "Invalid credentials" on login
**Cause**: Wrong email/password combination  
**Solution**: Check spelling, try reset password (when implemented)

### Issue: Dashboard shows "Loading..." forever
**Cause**: Auth context not initialized  
**Solution**: 
1. Check browser console for errors
2. Clear localStorage: `localStorage.clear()`
3. Refresh page

### Issue: Logout doesn't work
**Cause**: Navigation state not updated  
**Solution**:
1. Clear browser cache
2. Check that `useAuth()` is available in component
3. Verify `AuthProvider` wraps entire app in layout.tsx

---

## Customization

### Change Password Requirements
Edit `app/auth/signup/page.tsx`:
```typescript
// Find validation section
if (formData.password.length < 8) {
  newErrors.password = 'Password must be at least 8 characters';
}
// Change 8 to desired length
```

### Customize Success Message
Edit `app/auth/signup/page.tsx` in the `showApiKey` section:
```typescript
<p className="text-text-secondary">
  Your account has been created. Here's your API key.
</p>
// Change this text
```

### Add OAuth (GitHub, Google)
1. Uncomment the OAuth button in signup/login
2. Implement OAuth handlers
3. Create callback page
4. Update backend to support OAuth

### Change Colors
Edit `components/PasswordStrengthIndicator.tsx`:
```typescript
const color = 'bg-red-500';  // Change color scheme
```

---

## Production Deployment

### Before Going Live

1. **Test Auth Flow**
   ```bash
   npm run build  # Check for build errors
   npm run dev    # Test manually
   ```

2. **Set Environment Variables**
   - Use production API URL
   - Set API_URL in Vercel/Netlify dashboard

3. **Check Backend**
   - Verify all endpoints responding
   - Confirm CORS headers allow your domain
   - Test with curl/Postman first

4. **Security Checklist**
   - ✅ HTTPS enabled
   - ✅ API_URL uses HTTPS
   - ✅ No credentials in public files
   - ✅ .env.local in .gitignore

### Deploy to Vercel

```bash
# Push to GitHub
git add .
git commit -m "feat: add auth UI"
git push origin main

# Vercel auto-deploys when you push
# Just make sure to set NEXT_PUBLIC_API_URL in dashboard
```

### Deploy to Other Platforms

1. Copy environment variables to platform dashboard
2. Run `npm run build`
3. Serve `out/` or `.next/` folder
4. Configure serverless functions for API proxy (if needed)

---

## Testing Checklist

- [ ] Signup with valid email works
- [ ] Duplicate email shows error
- [ ] Password strength indicator shows
- [ ] Passwords must match
- [ ] Login with valid credentials works
- [ ] Wrong password shows error
- [ ] "Remember me" saves email
- [ ] Token persists on page reload
- [ ] Logout clears session
- [ ] Can't visit /dashboard without auth
- [ ] Navigation shows user dropdown when logged in
- [ ] Mobile layout is responsive
- [ ] Form validation works on all fields

---

## Next Features to Add

1. **Password Reset**
   - Send reset email with secure token
   - Allow user to set new password

2. **Email Verification**
   - Send verification email on signup
   - Require verification before login

3. **OAuth Login**
   - GitHub login
   - Google login
   - Microsoft login

4. **API Key Management**
   - Generate new keys
   - Delete old keys
   - Set key permissions/scopes

5. **Account Settings**
   - Update profile
   - Change password
   - Two-factor authentication
   - Session management

6. **Usage Analytics**
   - Real API call charts
   - Error rate graphs
   - Endpoint usage breakdown

---

## Troubleshooting

### Check Logs

**Browser Console** (Cmd+Opt+I or F12)
```javascript
// Check if token is stored
localStorage.getItem('auth_token')

// Check auth context
// Look for error messages
```

**Backend Logs**
```bash
cd agent-monetization-hub-backend
npm run dev

# Watch for error messages when signing up/logging in
```

### Test with cURL

```bash
# Test signup
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "TestPass123!", "first_name": "Test", "last_name": "User"}'

# Test login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "TestPass123!"}'
```

---

## Support

### Still Having Issues?

1. Check `AUTH_UI_IMPLEMENTATION.md` for detailed docs
2. Review component source code - well commented
3. Check backend logs for API errors
4. Look at Network tab in DevTools for API responses

### Common Questions

**Q: Where is the user data stored?**  
A: In React Context (in-memory) + localStorage (token only)

**Q: Is password stored securely?**  
A: Frontend only sends to backend. Backend hashes with bcrypt.

**Q: Can users recover lost API keys?**  
A: Not yet - they're shown only on signup. Future: Regenerate from dashboard.

**Q: How long is the session?**  
A: Until logout or token expires (backend sets expiration)

---

## Version Info

- **Frontend Framework**: Next.js 16.2.6
- **React Version**: 19.x
- **Auth Method**: JWT (localStorage)
- **UI Framework**: Tailwind CSS
- **Build Status**: ✅ Passes TypeScript

---

**Last Updated**: 2026-05-26  
**Status**: ✅ Ready for Development/Testing
