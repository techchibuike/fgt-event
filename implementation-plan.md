# FULL IMPLEMENTATION ROADMAP (Updated with React + cPanel + Supabase Hybrid)

*Based on the final tech stack: React frontend, Node.js/Express backend on cPanel, MySQL primary database, Supabase for real-time votes, Paystack payments, and cPanel email.*

---

## Implementation Timeline Overview

| Phase | Duration | Focus |
|-------|----------|-------|
| **Phase 1** | Week 1 | Foundation & Environment Setup |
| **Phase 2** | Week 2 | Contestant Registration & Approval |
| **Phase 3** | Week 3 | Ticket Sales & Referral System |
| **Phase 4** | Week 4 | Voting System & Real-Time Leaderboard |
| **Phase 5** | Week 5 | Contestant Profiles & Public Pages |
| **Phase 6** | Week 6 | Admin Dashboard & Fraud Prevention |
| **Phase 7** | Week 7 | Testing, Security & Load Testing |
| **Phase 8** | Week 8 | Deployment, Launch & Event Support |

**Total: 8 Weeks** (Adjustable based on your availability)

---

## PHASE 1: Foundation & Environment Setup (Week 1)

### Day 1-2: Supabase Setup
- [ ] Create Supabase account at [supabase.com](https://supabase.com)
- [ ] Create new project: `talent-show-votes`
- [ ] Save API credentials:
  - Project URL
  - `anon` public key
  - `service_role` key (keep secret)
- [ ] Run SQL to create votes table:
  ```sql
  CREATE TABLE public.votes (
    id BIGSERIAL PRIMARY KEY,
    contestant_id INTEGER NOT NULL,
    contestant_name VARCHAR(100) NOT NULL,
    vote_quantity INTEGER NOT NULL,
    voting_round INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );
  
  ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
  
  CREATE POLICY "Anyone can read votes" 
    ON public.votes FOR SELECT TO anon USING (true);
  
  CREATE POLICY "Backend can insert votes" 
    ON public.votes FOR INSERT TO service_role WITH CHECK (true);
  
  ALTER PUBLICATION supabase_realtime ADD TABLE public.votes;
  ```
- [ ] Enable Realtime on `votes` table (via Dashboard or SQL above)
- [ ] Test connection with Supabase JS client

### Day 3-4: cPanel Node.js Verification
- [ ] Log into cPanel and check for **"Setup Node.js App"** or **"Application Manager"**
- [ ] If not present, contact hosting support:
  ```
  Subject: Enable Node.js Support
  
  Please enable Node.js on my account. I need:
  - ea-nodejs20 (or latest)
  - ea-apache24-mod-passenger
  - ea-apache24-mod-env
  
  Thank you.
  ```
- [ ] Verify MySQL access via phpMyAdmin
- [ ] Create a test database and user
- [ ] Test email sending via cPanel (create email account if needed)

### Day 5-7: Local Development Environment
- [ ] Install Node.js (v18+) locally
- [ ] Install Git and create GitHub repository
- [ ] Set up project structure:

```
talent-show/
├── frontend/           # React app
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── backend/            # Node.js API
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── middleware/
│   ├── app.js
│   └── package.json
├── database/           # SQL schemas
│   └── schema.sql
└── docs/               # Documentation
```

- [ ] Initialize React app with Vite:
  ```bash
  npm create vite@latest frontend -- --template react
  cd frontend
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
  npm install @supabase/supabase-js axios react-router-dom qrcode.react
  ```
- [ ] Initialize Node.js backend:
  ```bash
  mkdir backend
  cd backend
  npm init -y
  npm install express mysql2 @supabase/supabase-js nodemailer dotenv cors express-rate-limit helmet express-validator jsonwebtoken bcryptjs
  npm install -D nodemon
  ```
- [ ] Create basic Express server with health check endpoint
- [ ] Test MySQL connection locally (or connect to remote cPanel MySQL)

**Deliverable:** Working local environment with React dev server and Express API communicating

---

## PHASE 2: Contestant Registration & Approval (Week 2)

### Day 8-9: Database Schema (MySQL on cPanel)
- [ ] Create MySQL database via cPanel
- [ ] Run complete schema from Tech Stack document:
  - `contestants` table
  - `referral_agents` table
  - `tickets` table
  - `votes` table (primary)
  - `voting_rounds` table
  - `admins` table
  - `fraud_alerts` table
- [ ] Create initial admin user (bcrypt hash password)
- [ ] Test all tables with sample inserts

### Day 10-11: Backend API - Contestant Registration
- [ ] Create routes:
  - `POST /api/contestants/register` - Public registration
  - `GET /api/admin/contestants/pending` - Admin view
  - `PUT /api/admin/contestants/:id/approve` - Approve contestant
  - `PUT /api/admin/contestants/:id/reject` - Reject contestant
  - `PUT /api/admin/contestants/:id/edit` - Edit before approval
- [ ] Implement validation with `express-validator`
- [ ] Handle file uploads for photos (store in filesystem or Supabase Storage)
- [ ] Test with Postman

### Day 12-13: React Frontend - Registration Form
- [ ] Create registration page component
- [ ] Build form with fields:
  - Full name, stage name, email, phone
  - Talent category dropdown
  - Bio textarea
  - Photo upload
  - Video link input
  - Social media handles (optional)
- [ ] Add form validation
- [ ] Connect to API with Axios
- [ ] Show success message and email confirmation notice

### Day 14: Email Integration (cPanel SMTP)
- [ ] Configure Nodemailer in backend:
  ```javascript
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });
  ```
- [ ] Create email templates:
  - `applicationReceived.html`
  - `applicationApproved.html` (with referral link)
  - `applicationRejected.html`
- [ ] Test sending emails to yourself
- [ ] Connect to registration flow (send on submission)

**Deliverable:** Contestants can register, admin can approve/reject, emails are sent

---

## PHASE 3: Ticket Sales & Referral System (Week 3)

### Day 15-16: Paystack Integration
- [ ] Create Paystack test account
- [ ] Get test API keys (public + secret)
- [ ] Install Paystack library or use direct API
- [ ] Create backend endpoint: `POST /api/paystack/initialize`
- [ ] Create webhook handler: `POST /api/paystack/webhook`
- [ ] Test webhook locally with ngrok

### Day 17-18: Ticket Purchase Flow
- [ ] React component: Ticket selection with 4 tiers:
  - Regular (2,000 NGN)
  - VIP (7,000 NGN)
  - Table Standard (20,000 NGN)
  - Table Premium (50,000 NGN)
- [ ] Implement referral code detection from URL:
  ```javascript
  // Check for ?ref=CODE in URL
  const urlParams = new URLSearchParams(window.location.search);
  const referralCode = urlParams.get('ref');
  // Store in localStorage/session
  ```
- [ ] Build checkout form (name, email, phone)
- [ ] Initialize Paystack payment with metadata including referral code
- [ ] Handle payment callback and verification

### Day 19-20: Backend - Ticket Processing
- [ ] Create route: `POST /api/tickets/verify`
- [ ] Verify Paystack transaction
- [ ] Generate unique ticket code (e.g., `TICKET-{timestamp}-{random}`)
- [ ] Store ticket in MySQL with referring_agent_id
- [ ] Update contestant's `tickets_sold` count
- [ ] Send ticket confirmation email with QR code
- [ ] Test complete flow from purchase to email

### Day 21: Ticket Check-In System
- [ ] Create React admin component: `CheckIn.jsx`
- [ ] Build ticket lookup by code (scan or type)
- [ ] Display ticket details
- [ ] Mark ticket as `checked_in = true`
- [ ] Prevent duplicate check-in
- [ ] Add simple statistics (total checked in)

**Deliverable:** Complete ticket purchase flow with referral tracking and check-in system

---

## PHASE 4: Voting System & Real-Time Leaderboard (Week 4)

### Day 22-23: Voting Configuration (Admin)
- [ ] Create React admin component: `RoundManager.jsx`
- [ ] Build form to configure voting rounds:
  - Round number (1 or 2)
  - Round name (Preliminaries/Finals)
  - Start date/time
  - End date/time
- [ ] Backend routes:
  - `POST /api/admin/rounds` - Create round
  - `GET /api/admin/rounds` - List rounds
  - `PUT /api/admin/rounds/:id` - Update round
  - `GET /api/public/current-round` - Get active round
- [ ] Store rounds in MySQL `voting_rounds` table
- [ ] Add validation (no overlapping rounds)

### Day 24-25: Voting Frontend
- [ ] Create React component: `VotingPage.jsx`
- [ ] Display list of eligible contestants for current round
- [ ] Add vote quantity input with minimum (5 votes = 500 NGN)
- [ ] Add email collection field
- [ ] Initialize Paystack payment with metadata:
  ```javascript
  metadata: {
    contestant_id,
    contestant_name,
    vote_quantity,
    voting_round
  }
  ```
- [ ] Handle payment callback
- [ ] Show loading states and success messages

### Day 26: The Dual-Database Vote Flow (Critical)
- [ ] Backend route: `POST /api/votes/cast`
- [ ] Verify Paystack transaction
- [ ] **Record vote in MySQL** (primary):
  ```sql
  INSERT INTO votes (contestant_id, contestant_name, vote_quantity, voting_round, voter_email, amount_paid, paystack_reference, ip_address)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  ```
- [ ] **Also insert into Supabase** (for real-time):
  ```javascript
  await supabase.from('votes').insert([
    { contestant_id, contestant_name, vote_quantity, voting_round }
  ]);
  ```
- [ ] Update contestant's `total_votes` in MySQL
- [ ] Add error handling: if Supabase fails, log error but don't fail the vote
- [ ] Send vote confirmation email

### Day 27-28: Real-Time Leaderboard
- [ ] React component: `Leaderboard.jsx`
- [ ] Fetch initial data: `GET /api/leaderboard`
- [ ] Set up Supabase real-time subscription:
  ```javascript
  useEffect(() => {
    const subscription = supabase
      .channel('votes-channel')
      .on('postgres_changes', 
          { event: 'INSERT', schema: 'public', table: 'votes' },
          (payload) => {
            // Update the specific contestant's votes
            setContestants(prev => 
              prev.map(c => 
                c.id === payload.new.contestant_id 
                  ? {...c, total_votes: c.total_votes + payload.new.vote_quantity}
                  : c
              )
            );
            
            // Optional: show visual notification
            showVoteNotification(payload.new);
          })
      .subscribe();
    
    return () => subscription.unsubscribe();
  }, []);
  ```
- [ ] Add visual indicators for new votes (highlight, animation)
- [ ] Style leaderboard with Tailwind CSS
- [ ] Add responsive design for mobile

**Deliverable:** Complete voting system with real-time leaderboard updates

---

## PHASE 5: Contestant Profiles & Public Pages (Week 5)

### Day 29-30: Contestant Profile Pages
- [ ] React component: `ContestantProfile.jsx`
- [ ] Create route: `/contestant/:id`
- [ ] Fetch contestant data: `GET /api/contestants/:id`
- [ ] Display:
  - Photo
  - Stage name
  - Contestant number
  - Bio
  - Talent category
  - Video link (embedded)
  - Social media links
  - **Current vote count** (real-time via Supabase)
  - **Tickets sold** (from MySQL)
  - Referral link to share
- [ ] Add "Vote for Me" button linking to voting page with pre-selected contestant

### Day 31-32: Public Pages
- [ ] Home page (`Home.jsx`):
  - Event details (date, venue)
  - Ticket CTA
  - Countdown timer
  - Featured contestants
- [ ] Leaderboard page (`Leaderboard.jsx`) - already built
- [ ] Contestants gallery page (`Contestants.jsx`):
  - Grid of all approved contestants
  - Click to view profile
- [ ] Ticket purchase page (`TicketPurchase.jsx`)
- [ ] Voting page (`VotingPage.jsx`)
- [ ] FAQ page (`FAQ.jsx`)

### Day 33-34: Navigation & Layout
- [ ] Create `Navbar.jsx` component
- [ ] Add links to all pages
- [ ] Mobile responsive menu
- [ ] Footer with social links
- [ ] Consistent layout with Tailwind CSS

**Deliverable:** Complete public-facing website with all pages

---

## PHASE 6: Admin Dashboard & Fraud Prevention (Week 6)

### Day 35-36: Admin Authentication
- [ ] Admin login page (`AdminLogin.jsx`)
- [ ] JWT authentication in backend:
  - `POST /api/admin/login` - returns JWT
  - `auth.js` middleware to verify JWT
- [ ] Protect all admin routes
- [ ] Store token in localStorage
- [ ] Auto-logout after inactivity

### Day 37-38: Admin Dashboard
- [ ] Dashboard overview (`AdminDashboard.jsx`):
  - Total tickets sold (progress to 500)
  - Total revenue (tickets + votes)
  - Total votes cast
  - Current leaderboard snapshot
  - Recent votes (last 10)
  - Recent ticket purchases
- [ ] Charts with simple library (Chart.js or Recharts)
- [ ] Refresh data periodically

### Day 39-40: Contestant Management (Admin)
- [ ] Pending approvals view (`PendingContestants.jsx`)
- [ ] List with preview modal
- [ ] Approve/reject/edit buttons
- [ ] Auto-assign contestant number on approval
- [ ] Auto-generate referral code (format: `FIRSTNAME_NUMBER`)
- [ ] Bulk actions (optional)

### Day 41-42: Fraud Prevention System
- [ ] Implement rate limiting middleware:
  ```javascript
  const rateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 1000, // limit per email
    keyGenerator: (req) => req.body.voter_email || req.ip
  });
  ```
- [ ] Create fraud detection service:
  - Check votes per email per hour
  - Check votes per IP per hour
  - Detect rapid succession (>10 in 5 minutes)
  - Flag large single votes (>500)
- [ ] Store fraud alerts in `fraud_alerts` table
- [ ] Admin view: `FraudAlerts.jsx` to review flags
- [ ] Add manual override capabilities

**Deliverable:** Complete admin system with fraud monitoring

---

## PHASE 7: Testing, Security & Load Testing (Week 7)

### Day 43-44: Comprehensive Testing
- [ ] Test all user journeys:
  - Contestant registers → gets approved → shares link
  - Ticket buyer uses referral link → purchases → receives email
  - Voter casts votes → sees real-time update
  - Door staff checks in ticket
- [ ] Test all edge cases:
  - Invalid referral codes
  - Failed payments
  - Duplicate votes
  - Expired voting rounds
- [ ] Cross-browser testing (Chrome, Firefox, Safari)
- [ ] Mobile responsive testing

### Day 45-46: Security Hardening
- [ ] Add Helmet.js for security headers
- [ ] Validate all inputs (server-side)
- [ ] Sanitize HTML in bios
- [ ] Implement CORS properly
- [ ] Rate limiting on all public endpoints
- [ ] Verify JWT tokens on admin routes
- [ ] Test Paystack webhook signature verification
- [ ] SQL injection prevention (using parameterized queries)

### Day 47-48: Load Testing
- [ ] Set up load testing with K6 or Artillery
- [ ] Simulate 100+ concurrent voters
- [ ] Monitor:
  - MySQL connection limits
  - Supabase connection limits (200 free tier)
  - API response times
  - Error rates
- [ ] Optimize slow queries with indexes
- [ ] Consider Supabase Pro upgrade if needed ($25 for event weekend)

**Deliverable:** Fully tested, secure, load-ready application

---

## PHASE 8: Deployment, Launch & Event Support (Week 8)

### Day 49-50: Production Deployment
- [ ] **Backend Deployment (cPanel)**:
  ```bash
  # 1. Upload backend files to /home/username/talent-show-api
  # 2. Run npm install --production
  # 3. In cPanel "Setup Node.js App":
  #    - Application root: /home/username/talent-show-api
  #    - Application URL: api.yourdomain.com or yourdomain.com/api
  #    - Application startup file: app.js
  #    - Add environment variables
  # 4. Start application
  ```
- [ ] **Frontend Deployment (cPanel)**:
  ```bash
  # 1. Build React app
  npm run build
  # 2. Upload 'dist' contents to public_html/ (or subfolder)
  # 3. Ensure API URLs point to production
  ```
- [ ] Configure SSL via Let's Encrypt in cPanel
- [ ] Test all endpoints in production

### Day 51-52: Pre-Launch Checklist
- [ ] Switch Paystack to live mode
- [ ] Update webhook URLs to production
- [ ] Test email delivery (verify SPF/DKIM)
- [ ] Create database backup
- [ ] Set up monitoring:
  - cPanel error logs
  - Custom logging to file
  - Supabase Dashboard monitoring
- [ ] Create door staff check-in guide
- [ ] Prepare contestant FAQ

### Day 53-54: Soft Launch / Ticket Sales Open
- [ ] Announce ticket sales open
- [ ] Monitor first purchases
- [ ] Verify referral tracking works
- [ ] Check email delivery
- [ ] Stay on standby for issues
- [ ] Process contestant applications as they arrive

### Day 55: Event Day - Morning
- [ ] Verify voting rounds configured correctly
- [ ] Test check-in system (print test ticket)
- [ ] Ensure internet at venue works
- [ ] Print backup check-in lists (just in case)
- [ ] Brief door staff on check-in process
- [ ] Have backup power for devices

### Day 56: Event Day - Live Show
- [ ] Monitor system throughout
- [ ] Watch fraud alerts dashboard
- [ ] Support door staff remotely (phone on standby)
- [ ] Announce round transitions
- [ ] Track final results
- [ ] Declare winner
- [ ] Take screenshots of final leaderboard

### Day 57-58: Post-Event
- [ ] Export all data:
  - Ticket sales CSV
  - Votes CSV
  - Contestant stats
- [ ] Send final results to client
- [ ] Create winner certificates (PDF generation)
- [ ] Full database backup
- [ ] Document lessons learned
- [ ] Celebrate successful event! 🎉

---

## Summary Timeline

| Week | Focus | Key Deliverables |
|------|-------|------------------|
| **Week 1** | Foundation | Supabase project, cPanel verified, local environment |
| **Week 2** | Contestants | Registration form, admin approval, email system |
| **Week 3** | Tickets | Paystack integration, purchase flow, check-in system |
| **Week 4** | Voting | Vote processing, real-time leaderboard |
| **Week 5** | Public Pages | Contestant profiles, home page, navigation |
| **Week 6** | Admin | Admin dashboard, fraud prevention |
| **Week 7** | Testing | Security, load testing, optimizations |
| **Week 8** | Launch | Deployment, event support, post-event |

---

## Critical Path Items (Do These First)

1. **Supabase project creation** (Day 1)
2. **cPanel Node.js verification** (Day 3) - if blocked, contact host immediately
3. **MySQL schema** (Day 8) - foundation for everything
4. **Paystack test mode** (Day 15) - payments are core
5. **Vote flow with dual-database** (Day 26) - most complex feature

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| cPanel doesn't support Node.js | Switch to Vercel (frontend) + Render/Heroku (backend) |
| Supabase free tier limits | Upgrade to Pro for event weekend ($25) |
| High traffic during voting | Load test in advance, optimize queries |
| Payment webhook failures | Queue system + manual retry option |
| Email delivery issues | Have backup Gmail SMTP config |

---

## Your Next Immediate Actions

1. **Today**: Create Supabase project
2. **Tomorrow**: Check cPanel Node.js support
3. **Day 3**: Report back to me with:
   - Supabase URL and keys
   - Node.js support status
   - Any questions

**Ready to start Phase 1? Let me know when you've completed Day 1-2 and I'll guide you through Day 3-4!**