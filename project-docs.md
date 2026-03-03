# TALENT SHOW WEBSITE - COMPLETE SYSTEM SPECIFICATION

## FINAL VERSION

*Incorporating: No user accounts, self-registration for contestants, referral tracking without commissions, paid voting (100 Naira = 1 vote), ticket pricing (2k/7k/20k/50k), multiple voting rounds, real-time public leaderboard, and contestant profile pages showing both vote counts and tickets sold.*

---

## TABLE OF CONTENTS

1. [Event Overview & Pricing](#part-1-event-overview--pricing)
2. [User Roles & Permissions](#part-2-user-roles--permissions)
3. [Contestant Registration & Approval](#part-3-contestant-registration--approval)
4. [Ticket Sales System](#part-4-ticket-sales-system)
5. [Referral Tracking](#part-5-referral-tracking)
6. [Voting System](#part-6-voting-system)
7. [Public Leaderboard & Contestant Profiles](#part-7-public-leaderboard--contestant-profiles)
8. [Administration Backend](#part-8-administration-backend)
9. [Fraud Prevention & Risk Management](#part-9-fraud-prevention--risk-management)
10. [User Experience & Customer Journey](#part-10-user-experience--customer-journey)
11. [Communications & Messaging](#part-11-communications--messaging)
12. [Data Management & Privacy](#part-12-data-management--privacy)
13. [Event Day Operations](#part-13-event-day-operations)
14. [Success Metrics & KPIs](#part-14-success-metrics--kpis)
15. [Timeline & Milestones](#part-15-timeline--milestones)
16. [Risk Assessment & Mitigation](#part-16-risk-assessment--mitigation)
17. [Glossary of Terms](#part-17-glossary-of-terms)

---

# PART 1: EVENT OVERVIEW & PRICING

## 1.1 Event Description

A talent show featuring multiple contestants competing across two voting rounds. The audience purchases tickets to attend and votes for their favorite performers during the live show. Votes cost money and are displayed on a real-time public leaderboard.

## 1.2 Ticket Pricing Structure

| Ticket Type | Price (NGN) | Description |
|-------------|-------------|-------------|
| Regular | 2,000 | General admission access |
| VIP | 7,000 | Premium seating area, complimentary refreshments |
| Table (Standard) | 20,000 | Seats 4-6 people in standard section |
| Table (Premium) | 50,000 | Seats 4-6 people in best viewing position |

**Total Ticket Goal:** 500 tickets sold

## 1.3 Voting Cost Structure

- **Base Rate:** 100 Naira = 1 vote
- **Minimum Purchase:** 500 Naira (5 votes) recommended to make payment processing worthwhile
- **Maximum Purchase:** No hard limit, system handles bulk purchases

## 1.4 Voting Rounds

The event features 2 voting rounds:

| Round | Timing | Description |
|-------|--------|-------------|
| Round 1 | Preliminary/Qualifying | All contestants perform, votes determine who advances |
| Round 2 | Finals | Top contestants compete, votes determine winner |

**Round Rules (Client to confirm):**
- Do votes reset to zero for Round 2, or do they carry over?
- How many contestants advance from Round 1 to Round 2?
- Are all contestants in Round 2, or only top performers?

---

# PART 2: USER ROLES & PERMISSIONS

## 2.1 Core Principle: No User Accounts

**Critical:** No one creates accounts or logs into the system. This applies to:
- Audience members/voters
- Contestants (after registration)
- Organizers
- Staff

All persistent data is managed by administrators in the backend. The only exception is the one-time contestant registration form, which does not create a login account.

## 2.2 Role Definitions

### Contestants
- Register themselves via online form before the event
- Provide all profile details (name, bio, photo, video links)
- Receive email notification when approved or rejected
- If approved, get a unique referral code for ticket sales
- Have a public profile page showing:
  - Their photo and bio
  - Current vote count (real-time)
  - Total tickets sold through their referral link (real-time)
  - Their shareable referral link
- **Cannot log in** to edit their profile after submission
- **Cannot see** other contestants' ticket sales or referral stats

### Organizers
- Event management team
- Each gets a unique referral code for ticket sales
- Can request referral performance reports from admin
- May have door check-in responsibilities

### Staff
- Event workers, volunteers, security
- Each gets a unique referral code for ticket sales
- May be assigned door scanning duties

### Audience/Voters
- Purchase tickets (optionally using referral codes)
- Purchase votes during live shows
- No accounts, no login, no passwords ever
- Only provide email during transactions

### Administrators
- Internal users with access to admin dashboard
- Review and approve/reject contestant applications
- Manage contestants, referral codes, voting rounds
- Monitor voting in real-time
- View all reports and fraud alerts
- Export data for analysis

---

# PART 3: CONTESTANT REGISTRATION & APPROVAL

## 3.1 Registration Workflow

```
┌─────────────────────────────────────┐
│ STAGE 1: CONTESTANT APPLIES         │
├─────────────────────────────────────┤
│ • Clicks "Apply to Perform"         │
│ • Fills registration form           │
│ • Uploads photo and video links     │
│ • Submits application               │
│ • Receives "Application Received"   │
│   email                             │
└────────────────┬────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│ STAGE 2: ADMIN REVIEW               │
├─────────────────────────────────────┤
│ • Admin sees pending application    │
│ • Reviews all materials              │
│ • Chooses action:                    │
│   ✓ Approve                          │
│   ✗ Reject                           │
│   ✏ Edit before approval             │
└────────────────┬────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│ STAGE 3: OUTCOME                    │
├─────────────────────────────────────┤
│ IF APPROVED:                         │
│ • Contestant number assigned         │
│ • Referral code generated            │
│ • Profile published                  │
│ • Approval email sent with:          │
│   - Contestant number                │
│   - Public profile link              │
│   - Referral link to share           │
│   - Event details                    │
│                                      │
│ IF REJECTED:                         │
│ • Optional rejection reason          │
│ • Rejection email sent               │
│ • Application archived                │
└──────────────────────────────────────┘
```

## 3.2 Registration Form Fields

| Field | Required | Notes |
|-------|----------|-------|
| Full Name | Yes | Legal name for records |
| Stage Name | Yes | Public-facing performance name |
| Email Address | Yes | For all communications |
| Phone Number | Yes | Emergency contact |
| Date of Birth | Maybe | If age restrictions apply |
| Talent Category | Yes | Singing, Dancing, Comedy, Magic, etc. |
| Bio/Description | Yes | Shown on public profile |
| Profile Photo | Yes | High-quality image for public display |
| Performance Video Link | Yes | YouTube, Instagram, or TikTok URL |
| Instagram Handle | No | For promotion |
| TikTok Handle | No | For promotion |
| Facebook Page | No | For promotion |
| Additional Notes | No | Anything else to share |

## 3.3 Admin Review Interface

When admin logs into backend, they see:

```
┌─────────────────────────────────────────┐
│ PENDING APPLICATIONS (12)               │
├─────────────────────────────────────────┤
│ □ Sarah Jones - Singer                  │
│   Submitted: 2 days ago                  │
│   Video: youtube.com/watch=abc123        │
│   [Preview] [Approve] [Reject] [Edit]   │
│                                         │
│ □ Mike Band - Dance Crew                │
│   Submitted: 1 day ago                   │
│   Video: instagram.com/reel/xyz          │
│   [Preview] [Approve] [Reject] [Edit]   │
│                                         │
│ □ Amanda Smith - Comedian               │
│   Submitted: 3 hours ago                 │
│   Video: tiktok.com/@amanda/video       │
│   [Preview] [Approve] [Reject] [Edit]   │
└─────────────────────────────────────────┘
```

### Approve Action
- Assigns next available contestant number (1, 2, 3...)
- Generates unique referral code (format: FIRSTNAME_NUMBER or CUSTOM)
- Publishes profile to public page immediately
- Sends approval email automatically

### Edit Action
Before approving, admin can:
- Fix typos in bio
- Adjust stage name for consistency
- Crop/optimize photo
- Add internal notes

### Reject Action
- Optional: Select reason from dropdown
- Optional: Add custom feedback message
- System sends rejection email
- Application moved to archived/rejected view

## 3.4 Contestant Statuses

| Status | Description |
|--------|-------------|
| Pending | Submitted, awaiting review |
| Approved | Accepted, profile live |
| Rejected | Not selected for show |
| Withdrawn | Contestant pulled out after approval |
| Disqualified | Removed for cause |

---

# PART 4: TICKET SALES SYSTEM

## 4.1 Ticket Sales Workflow

```
┌─────────────────┐
│ Visitor arrives │
└────────┬────────┘
         ↓
┌─────────────────────────────────┐
│ Has referral code?              │
│ (from URL param like ?ref=SARAH)│
└────────┬──────────────┬─────────┘
    Yes  ↓               ↓ No
┌─────────────────┐    ┌─────────────────┐
│ Store code in   │    │ Proceed without │
│ session/cookie  │    │ referral        │
└────────┬────────┘    └────────┬────────┘
         └──────────┬───────────┘
                    ↓
┌─────────────────────────────────┐
│ Select ticket type:             │
│ • Regular (2,000)               │
│ • VIP (7,000)                   │
│ • Table Standard (20,000)       │
│ • Table Premium (50,000)        │
└────────────────┬────────────────┘
                 ↓
┌─────────────────────────────────┐
│ Enter buyer details:            │
│ • Full name                     │
│ • Email address                 │
│ • Phone number (optional)       │
└────────────────┬────────────────┘
                 ↓
┌─────────────────────────────────┐
│ Pay via Paystack                │
│ • Card                          │
│ • Bank transfer                 │
│ • USSD                          │
│ • Mobile money                  │
└────────────────┬────────────────┘
                 ↓
┌─────────────────────────────────┐
│ Payment confirmed               │
│ • Generate unique ticket code   │
│ • Send email confirmation       │
│ • Record referral attribution   │
│ • Update contestant's tickets   │
│   sold count (if referred)      │
└─────────────────────────────────┘
```

## 4.2 Ticket Types & Features

| Ticket Type | Price | Check-in Method | Notes |
|-------------|-------|-----------------|-------|
| Regular | 2,000 | Code scan or manual entry | General admission |
| VIP | 7,000 | Code scan + wristband | Premium area access |
| Table Standard | 20,000 | One code for entire table | Seats 4-6 |
| Table Premium | 50,000 | One code for entire table | Best seats |

## 4.3 Ticket Confirmation Email

```
Subject: Your Ticket to [Event Name]

Dear [Buyer Name],

Thank you for purchasing tickets to [Event Name]!

YOUR TICKET DETAILS:
────────────────────
Ticket Code: [TICKET-CODE-1234]
Ticket Type: [Regular/VIP/Table]
Quantity: [Number of tickets/table seats]
Amount Paid: [Amount] NGN

EVENT DETAILS:
────────────────────
Date: [Event Date]
Time: Doors open at [Time]
Venue: [Venue Name and Address]

IMPORTANT:
• Bring this email (printed or on phone) for check-in
• Arrive at least 30 minutes before show time
• Tables seat 4-6 people (entire group must arrive together)

We can't wait to see you!

The [Event Name] Team
```

## 4.4 Ticket Check-In System

At the venue entrance:
1. Attendee presents email confirmation or ticket code
2. Staff enters code or scans QR code
3. System displays ticket details and marks as `checked_in = true`
4. For tables: all seats marked as checked in at once
5. Prevents duplicate entry

---

# PART 5: REFERRAL TRACKING

## 5.1 Referral Code Generation

**Who Gets a Code:**
- Every approved contestant (automatic upon approval)
- Every organizer (manually created by admin)
- Every staff member (manually created by admin)

**Code Format Examples:**
- Contestant: `SARAH_5` (name + contestant number)
- Organizer: `ORG_KUNLE`
- Staff: `STAFF_MIKE`

**Distribution:**
- Contestants receive their code in approval email
- Organizers/staff receive codes via WhatsApp/email
- No login required ever

## 5.2 How Referral Tracking Works

```
When someone visits with ?ref=CODE:
1. System detects referral code in URL
2. Stores code in browser session/local storage
3. When ticket is purchased, records which referral code was used
4. Updates that referrer's "tickets sold" count
5. No commissions, no payments, just tracking
```

## 5.3 What Referral Data Is Used For

- Displayed on contestant's public profile (just one number: total tickets sold)
- Post-event reporting for organizers to see who sold the most
- Optional recognition/awards for top referrers

## 5.4 What Referral Data Is NOT Used For

- No commission calculations or payments
- No public leaderboard of referrers
- No breakdown by ticket type on public profiles
- No visibility into other contestants' numbers

## 5.5 Contestant Profile Display

Each contestant's public profile shows:

```
┌─────────────────────────┐
│  CONTESTANT #5          │
│  SARAH JONES            │
│  ┌───────────────────┐  │
│  │   [PHOTO]         │  │
│  └───────────────────┘  │
│                         │
│  Talent: Singing        │
│  Bio: [Description]     │
│                         │
│  ┌───────────────────┐  │
│  │   CURRENT VOTES   │  │
│  │     12,450        │  │
│  └───────────────────┘  │
│                         │
│  ┌───────────────────┐  │
│  │   TICKETS SOLD    │  │
│  │   VIA MY LINK     │  │
│  │       47          │  │
│  └───────────────────┘  │
│                         │
│  Support me:            │
│  talentshow.com/tickets │
│  ?ref=SARAH_5           │
└─────────────────────────┘
```

That's it. One number. Real-time updates. No complexity.

---

# PART 6: VOTING SYSTEM

## 6.1 Core Voting Principles

- **Paid votes:** 100 Naira = 1 vote
- **Multiple votes allowed:** Same person can vote many times for same contestant
- **Email required:** Collected for each voting transaction
- **No accounts:** Voters never create passwords or profiles
- **Real-time updates:** Leaderboard updates instantly when votes are cast
- **Round-based:** Voting only possible during active rounds

## 6.2 Voting Flow

```
┌─────────────────┐
│ Visitor on site │
└────────┬────────┘
         ↓
┌─────────────────────────────────┐
│ View leaderboard with all       │
│ contestants and current votes   │
└────────────────┬────────────────┘
         ↓
┌─────────────────────────────────┐
│ Click "Vote" on a contestant    │
└────────────────┬────────────────┘
         ↓
┌─────────────────────────────────┐
│ System checks:                  │
│ • Is voting round active?       │
│ • Is contestant in this round?  │
└────────────────┬────────────────┘
         ↓
┌─────────────────────────────────┐
│ Enter vote quantity:            │
│ e.g., "50 votes" = 5,000 Naira  │
│ Minimum: 5 votes (500 Naira)    │
└────────────────┬────────────────┘
         ↓
┌─────────────────────────────────┐
│ Enter email address             │
│ (Required for transaction)      │
└────────────────┬────────────────┘
         ↓
┌─────────────────────────────────┐
│ Pay via Paystack                │
│ Metadata includes:               │
│ • contestant_id                 │
│ • vote_quantity                 │
│ • voting_round                  │
│ • voter_email                   │
└────────────────┬────────────────┘
         ↓
┌─────────────────────────────────┐
│ Payment confirmed               │
│ • Record vote in database       │
│ • Update contestant total       │
│ • Broadcast update to all       │
│   connected viewers             │
│ • Send email receipt            │
└─────────────────────────────────┘
```

## 6.3 Voting Rounds Management

### Round Configuration
Each round requires:
- Round number (1 or 2)
- Round name (e.g., "Preliminaries", "Grand Finale")
- Start date and time
- End date and time
- List of contestants eligible in this round

### Round Transition Logic

**Before Round 1 Start:**
- Voting button disabled
- Message: "Voting opens [date] at [time]"

**During Round 1:**
- Voting enabled for Round 1 contestants
- Votes recorded for Round 1
- Leaderboard shows Round 1 totals

**Between Rounds:**
- Voting disabled
- Message: "Round 1 voting closed. Round 2 starts [date] at [time]"
- Show final Round 1 results

**During Round 2:**
- Voting enabled for Round 2 contestants
- Votes recorded for Round 2
- Leaderboard shows either:
  - Round 2 totals only, OR
  - Cumulative totals (Round 1 + Round 2)
  *(Client to decide)*

**After Event:**
- Voting permanently disabled
- Final results displayed
- Archive mode

## 6.4 Vote Confirmation Email

```
Subject: Thank You for Voting!

Dear Voter,

You have successfully cast [Quantity] votes for [Contestant Name]!

TRANSACTION DETAILS:
────────────────────
Contestant: [Name] (#[Number])
Votes Cast: [Quantity]
Amount: [Amount] NGN
Reference: [Paystack Reference]

CURRENT STANDING:
────────────────────
[Contestant Name] now has [New Total] votes!

Watch the live leaderboard:
[Leaderboard URL]

Thank you for supporting [Event Name]!

The [Event Name] Team
```

---

# PART 7: PUBLIC LEADERBOARD & CONTESTANT PROFILES

## 7.1 Leaderboard Display

The public leaderboard shows all contestants with:

| Rank | Contestant | Votes |
|------|------------|-------|
| 🥇 1 | Sarah Jones | 12,450 |
| 🥈 2 | Mike Tyson | 10,230 |
| 🥉 3 | The Dance Crew | 8,675 |
| 4 | Amanda Smith | 7,890 |
| 5 | Rhythm Kings | 6,432 |
| 6 | Joseph Williams | 5,210 |
| 7 | Divine Singers | 4,567 |
| 8 | Magic Mike | 3,890 |

**Features:**
- Updates in real-time (no page refresh needed)
- Works on mobile and desktop
- Click contestant name to view their full profile

## 7.2 Contestant Profile Page

Each contestant has a dedicated public profile:

```
┌─────────────────────────────────────┐
│  CONTESTANT #5                      │
│  ┌────────────┐                      │
│  │            │  SARAH JONES         │
│  │   PHOTO    │  @sarahsings         │
│  │            │                      │
│  └────────────┘  Talent: Singer      │
│                  Category: Pop       │
├─────────────────────────────────────┤
│  ABOUT SARAH                         │
│  Sarah has been singing since age 5  │
│  and has performed at venues across  │
│  the country. She specializes in     │
│  contemporary R&B and soul.          │
│                                       │
│  Watch her audition:                 │
│  youtube.com/watch?v=abc123          │
├─────────────────────────────────────┤
│  ┌───────────────────────────────┐  │
│  │  CURRENT VOTE TOTAL           │  │
│  │        12,450 votes           │  │
│  └───────────────────────────────┘  │
│                                       │
│  ┌───────────────────────────────┐  │
│  │  TICKETS SOLD VIA MY LINK     │  │
│  │           47 tickets          │  │
│  └───────────────────────────────┘  │
│                                       │
│  SUPPORT SARAH:                       │
│  Buy tickets using her link:          │
│  talentshow.com/tickets?ref=SARAH_5  │
│                                       │
│  Vote for Sarah:                      │
│  [VOTE NOW] button                    │
└─────────────────────────────────────┘
```

## 7.3 Real-Time Updates

When someone votes:
1. Vote is processed and confirmed
2. Contestant's total increases
3. Leaderboard updates for ALL viewers
4. Contestant's profile page updates
5. Visual indicator (subtle highlight) shows the change

**No page refresh needed. Numbers change instantly.**

---

# PART 8: ADMINISTRATION BACKEND

## 8.1 Pre-Event Management

### Contestant Management
- View all contestants by status (pending/approved/rejected)
- Review pending applications with preview functionality
- Approve/reject/edit contestant submissions
- Assign contestant numbers automatically or manually
- Generate and manage referral codes
- Export contestant list

### Ticket Configuration
- Set ticket types and prices
- Create early bird discounts if needed
- Set ticket sales start/end dates
- Monitor progress toward 500 ticket goal

### Voting Configuration
- Set vote price (100 Naira)
- Configure voting rounds (dates, times, eligible contestants)
- Set minimum vote purchase
- Choose round rules (cumulative or reset)

### Referral Code Management
- Generate codes for organizers and staff
- View all active codes
- Deactivate lost/compromised codes
- Export codes for distribution

## 8.2 During-Event Monitoring

### Live Dashboard
- Total tickets sold (progress to 500)
- Total votes cast
- Total revenue (tickets + votes)
- Current leaderboard
- Active voters count
- Recent votes (last 5 minutes)

### Contestant View
- Individual vote totals per round
- Vote history graph
- Tickets sold count

### Fraud Monitoring
- Recent fraud alerts
- Suspicious patterns detected
- High-velocity voters
- Unusual geographic patterns

### Round Control
- Manually start/end rounds (override timers)
- Emergency pause voting
- Send announcement to all viewers

## 8.3 Post-Event Reporting

### Ticket Reports
- Total tickets sold by type
- Referral performance (who sold the most)
- Check-in rates
- Revenue breakdown

### Voting Reports
- Final results by round
- Vote distribution over time
- Top voters (emails with most votes)
- Financial reconciliation

### Export Capabilities
- CSV exports for all data
- Winner certificates generation
- Financial reports for accounting

---

# PART 9: FRAUD PREVENTION & RISK MANAGEMENT

## 9.1 Fraud Prevention Philosophy

Since we allow multiple votes and have no user accounts, we cannot **prevent** all fraud. Instead we:
1. **Detect** suspicious patterns in real-time
2. **Flag** for human review
3. **Analyze** after the event
4. **Intervene** only in clear abuse cases

## 9.2 Rate Limiting (Soft Blocks)

| Limit | Threshold | Action |
|-------|-----------|--------|
| Per Email | 1,000 votes per hour | Block with "Too many votes, try later" |
| Per IP | 5,000 votes per hour | Block with "Too many votes from this location" |
| Per Contestant | 2,000 votes per hour | Block votes for that specific contestant |

## 9.3 Pattern Detection (Alerts Only)

| Pattern | What It Means | Action |
|---------|---------------|--------|
| Rapid succession | >10 votes in 5 minutes from same email | Flag for review |
| Unusual hours | Votes at 3 AM from same IP | Flag for review |
| Suspicious quantity | Single vote >500 votes | Flag for review |
| Geographic mismatch | Email domain from Nigeria, IP from elsewhere | Flag for review |
| Multiple cards, same email | Different payment methods, same email | Flag for review |

## 9.4 Post-Event Audit Queries

After the event, run these checks:

```sql
-- Find suspicious voters
SELECT 
  voter_email,
  COUNT(*) as transaction_count,
  SUM(vote_quantity) as total_votes,
  COUNT(DISTINCT ip_address) as ip_count
FROM votes
GROUP BY voter_email
HAVING SUM(vote_quantity) > 5000
ORDER BY total_votes DESC;

-- Find vote dumping for specific contestants
SELECT 
  contestant_id,
  voter_email,
  SUM(vote_quantity) as votes
FROM votes
GROUP BY contestant_id, voter_email
HAVING SUM(vote_quantity) > 1000;
```

## 9.5 Intervention Options

| Severity | Action |
|----------|--------|
| Low | Flag only, monitor |
| Medium | Contact voter for verification |
| High | Reverse votes, refund payment |
| Critical | Block email/IP permanently |

---

# PART 10: USER EXPERIENCE & CUSTOMER JOURNEY

## 10.1 Ticket Buyer Journey

**Awareness Stage**
- Sees referral link from contestant
- Or finds event on social media
- Or hears from friend

**Consideration Stage**
- Visits website
- Views contestant lineup
- Checks ticket prices
- Sees event details

**Purchase Stage**
- Clicks "Buy Tickets"
- Selects ticket type
- Enters personal details
- Completes payment
- Receives confirmation email

**Pre-Event Stage**
- Receives reminder emails
- May share contestant links

**Event Day**
- Arrives at venue
- Shows ticket for check-in
- Enjoys show

**During Show**
- May purchase votes
- Watches leaderboard
- Cheers for favorites

## 10.2 Voter Journey

**Discovery**
- At venue or watching online
- Scans QR code or visits URL
- Lands on voting page

**First Vote**
- Selects contestant
- Enters vote quantity
- Provides email
- Pays via Paystack
- Sees votes reflected immediately

**Repeat Voting**
- Returns later
- Votes again (same or different contestant)
- Each transaction separate

**Engagement**
- Watches leaderboard change
- May tell friends to vote
- Feels invested in outcome

## 10.3 Contestant Journey

**Pre-Registration**
- Hears about show
- Visits website
- Clicks "Apply to Perform"

**Registration**
- Fills form with all details
- Uploads photo and video
- Submits application
- Receives confirmation email

**Waiting Period**
- Cannot log in or edit
- Waits for approval email

**If Approved**
- Receives email with:
  - Contestant number
  - Public profile link
  - Referral link to share
  - Event details
- Profile goes live immediately
- Starts sharing link with friends/family

**Pre-Event**
- Shares referral link widely
- Checks own profile to see ticket count grow
- Practices for show

**During Event**
- Performs on stage
- Watches their vote count climb
- May encourage audience to vote
- Sees final results

**Post-Event**
- Celebrates (or congratulates winner)
- May request vote breakdown from organizer

---

# PART 11: COMMUNICATIONS & MESSAGING

## 11.1 Automated Emails

### Application Received
```
Subject: Your [Event Name] Application Received

Hi [Name],

Thanks for applying to perform at [Event Name]!

We've received your application and will review it within [X] days.
You'll hear from us at this email address.

While you wait, follow us on social media for updates:
[Social Media Links]

Best,
The [Event Name] Team
```

### Approval Email
```
Subject: CONGRATULATIONS! You're in [Event Name]!

Hi [Stage Name],

Great news! Your application has been approved to perform!

YOUR DETAILS:
────────────────────
Contestant Number: #[Number]
Stage Name: [Stage Name]
Category: [Category]

YOUR PUBLIC PROFILE:
────────────────────
View it here: talentshow.com/contestants/[number]
Share this link with everyone!

YOUR REFERRAL LINK:
────────────────────
talentshow.com/tickets?ref=[CODE]
Every ticket sold through this link shows on your profile!

IMPORTANT DATES:
────────────────────
Rehearsal: [Date/Time]
Show Date: [Date]
Call Time: [Time]

Next steps:
1. Share your referral link NOW
2. Practice, practice, practice!
3. Arrive on time for rehearsal

We can't wait to see you perform!

The [Event Name] Team
```

### Rejection Email
```
Subject: Update on Your [Event Name] Application

Hi [Name],

Thank you for your interest in performing at [Event Name].

After careful review, we are unable to offer you a spot in this
year's show. We received many talented applications and had a
limited number of slots.

[Optional feedback/reason]

We encourage you to:
• Attend the show as an audience member
• Apply again next year
• Follow us for other opportunities

Thanks again for your interest.

The [Event Name] Team
```

### Ticket Confirmation
*(See Section 4.3)*

### Vote Confirmation
*(See Section 6.4)*

## 11.2 Public Announcements

On website during event:

- "Voting for Round 1 closes in 15 minutes!"
- "Current leader: Sarah with 12,450 votes"
- "Thank you for 50,000 total votes!"
- "Round 2 voting NOW OPEN!"
- "Final results coming soon!"

## 11.3 SMS/WhatsApp (Optional)

For urgent updates:
- Round closing in 10 minutes
- Winner announcement
- Schedule changes

---

# PART 12: DATA MANAGEMENT & PRIVACY

## 12.1 Data Collected

| Data Type | Source | Purpose |
|-----------|--------|---------|
| Full name | Ticket purchase | Ticket identification |
| Email | Ticket purchase | Confirmation, check-in |
| Phone | Ticket purchase (opt) | Emergency contact |
| Email | Vote purchase | Transaction record, fraud prevention |
| IP address | All visits | Analytics, fraud detection |
| Payment details | Paystack | Financial processing (not stored by us) |
| Referral code | URL parameter | Attribution tracking |
| Contestant info | Registration form | Public profile, booking |

## 12.2 Data Retention

| Data Type | Retention Period |
|-----------|------------------|
| Ticket transactions | Indefinitely (financial records) |
| Vote transactions | Indefinitely (financial records) |
| IP addresses | 30 days (fraud investigation) |
| Email addresses | Indefinitely (future event marketing, with consent) |
| Contestant profiles | Indefinitely (archive) |

## 12.3 Privacy Considerations

- No passwords mean no password breaches
- No user profiles mean less sensitive data
- Email addresses stored but not publicly visible
- Payment data never touches our servers (Paystack handles)
- Contestant emails not shown publicly

## 12.4 Data Access

- Only administrators can view voter data
- Contestants cannot see who voted for them
- Contestants see only their own ticket count
- Organizers see referral stats only upon request

---

# PART 13: EVENT DAY OPERATIONS

## 13.1 Pre-Show Checklist

**24 Hours Before:**
- Verify voting rounds configured correctly
- Test payment flow
- Ensure leaderboard displays properly
- Print door scanner instructions
- Brief staff on check-in process

**1 Hour Before:**
- Enable ticket sales at door (if applicable)
- Open voting round (if starting before show)
- Monitor system for issues
- Test internet connection at venue

## 13.2 During Show

**Staff Responsibilities:**

| Role | Responsibility |
|------|----------------|
| Door Staff | Check tickets via admin interface, direct attendees |
| Tech Support | Monitor for issues, handle problems |
| Host | Announce leaderboard updates, encourage voting |
| Admin | Watch fraud alerts, manage rounds |

**Voting Windows:**
- Opening act → Voting opens
- Between performances → Voting continues
- After final act → Voting closes
- Announcement → Final results displayed

## 13.3 Post-Show Checklist

- Close all voting rounds
- Export final results
- Back up all data
- Send winner announcements
- Begin post-event reporting

## 13.4 Handling Technical Issues

| Issue | Response |
|-------|----------|
| Payment gateway down | Extend voting window, announce alternative |
| Site slow under load | Simplify page, reduce features temporarily |
| Fraud attack | Block offending IPs, manual review |
| Wrong winner displayed | Manual correction, public announcement |
| Internet outage | Use mobile hotspot, have offline backup |

---

# PART 14: SUCCESS METRICS & KPIs

## 14.1 Primary Goals

| Goal | Target | Measurement |
|------|--------|-------------|
| Ticket sales | 500 tickets | Total tickets sold |
| Ticket revenue | Based on mix | Sum of all ticket payments |
| Vote revenue | Maximize | Sum of all vote payments |
| Voter participation | 200+ unique voters | Distinct emails in votes table |
| Total votes | 50,000+ | Sum of vote quantity |

## 14.2 Secondary Metrics

- Referral effectiveness (who sold most tickets)
- Vote distribution (spread vs concentration)
- Mobile vs desktop usage
- Peak voting times
- Repeat voters percentage
- Check-in rate (tickets used)

## 14.3 Post-Event Analysis Questions

1. Did we hit 500 tickets? If not, why?
2. Which referral sources performed best?
3. Was voting competitive throughout?
4. Any fraud issues detected?
5. What would improve next year?
6. What was average vote per voter?
7. Did Round 2 have higher engagement than Round 1?

---

# PART 15: TIMELINE & MILESTONES

## 15.1 Pre-Event (8 Weeks Before)

| Week | Milestone |
|------|-----------|
| Week 1 | Site development begins |
| Week 2 | Database design, core features |
| Week 3 | Contestant registration opens |
| Week 4 | Payment integration complete |
| Week 5 | Ticket sales open |
| Week 6 | First contestant approvals |
| Week 7 | Marketing push begins |
| Week 8 | Final contestant deadline |

## 15.2 Mid-Point (3-4 Weeks Before)

- Contestant registration closes
- All contestants approved/rejected
- All referral codes distributed
- Contestant photos/videos uploaded
- Test voting system
- Staff training on check-in

## 15.3 Final Week

- Final contestant count confirmed
- Voting rounds configured
- Door scanners ready
- Backup plans reviewed
- All systems tested

## 15.4 Event Day

- System monitoring throughout
- Real-time support available
- Live updates and announcements

## 15.5 Post-Event

- Final results published
- Winner announced
- Referrer reports distributed
- Financial reconciliation
- Post-mortem meeting

---

# PART 16: RISK ASSESSMENT & MITIGATION

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Payment gateway failure | Low | High | Have backup payment option, extend voting time |
| Site crash under load | Medium | High | Load testing, scaling plan, CDN |
| Vote fraud attempt | High | Medium | Detection systems, manual review |
| Wrong winner due to error | Low | Very High | Manual override capability, multiple verification |
| Internet outage at venue | Medium | High | Mobile hotspot backup, offline-capable check-in |
| Contestant drops out | Medium | Medium | System can deactivate contestant, adjust rounds |
| Low ticket sales | Medium | High | Early bird pricing, increased marketing |
| Low voter participation | Medium | Medium | On-site promotion, host encouragement |
| Disputed results | Low | High | Transparent leaderboard, audit logs |

---

# PART 17: GLOSSARY OF TERMS

| Term | Definition |
|------|------------|
| Contestant | Performer in the talent show |
| Referral Agent | Anyone with a referral code (contestant/organizer/staff) |
| Referral Code | Unique identifier for tracking ticket sales |
| Voting Round | Defined period when voting is active |
| Vote Quantity | Number of votes purchased (1 vote = 100 Naira) |
| Leaderboard | Public display of contestant rankings |
| Contestant Profile | Public page showing contestant info, votes, and tickets sold |
| Check-in | Marking a ticket as used at the door |
| Fraud Alert | Automated flag for suspicious voting activity |
| Paystack | Payment gateway handling all transactions |
| Pending | Contestant application awaiting review |
| Approved | Contestant accepted into show |
| Rejected | Contestant not selected |
| Regular Ticket | General admission (2,000 Naira) |
| VIP Ticket | Premium access (7,000 Naira) |
| Table Ticket | Group seating (20k/50k Naira) |

---

## CONCLUSION

This talent show platform balances simplicity (no user accounts) with powerful features:
- **Self-registration** for contestants with admin approval
- **Ticket sales** with four price tiers
- **Referral tracking** displayed on contestant profiles
- **Paid voting** at 100 Naira per vote
- **Two voting rounds** with real-time updates
- **Public leaderboard** visible to all
- **Fraud detection** while allowing multiple votes

The system is designed to handle 500+ attendees and concurrent voters while maintaining data integrity and providing an engaging experience for both audience and contestants.

---

**Document Version:** 2.0 (Final)
**Last Updated:** Based on client requirements
**Status:** Approved for development

*Any changes to requirements should be documented as amendments to this specification.*