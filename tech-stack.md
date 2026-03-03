# RECOMMENDED TECH STACK (Final Corrected Version)

*Based on the confirmed cPanel + Supabase Hybrid Architecture with React Frontend*

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      COMPLETE TECH STACK                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  FRONTEND (React)                  BACKEND (cPanel)             │
│  ┌─────────────────────┐          ┌─────────────────────────┐   │
│  │ React 18            │          │ Node.js / Express       │   │
│  │ - Vite build tool   │  API     │ - REST API endpoints    │   │
│  │ - React Router DOM  │◀────────▶│ - Paystack webhooks     │   │
│  │ - Context API       │  calls   │ - Business logic        │   │
│  │ - Custom Hooks      │          │ - MySQL connection      │   │
│  │ - Tailwind CSS      │          │ - Email via Nodemailer  │   │
│  └──────────┬──────────┘          └──────────────┬──────────┘   │
│             │                                     │              │
│             │ WebSocket                           │              │
│             │ Subscription                         │              │
│             ▼                                     ▼              │
│  ┌─────────────────────┐          ┌─────────────────────────┐   │
│  │ Supabase JS Client  │          │ MySQL (cPanel)          │   │
│  │ - Real-time votes   │          │ - Primary database      │   │
│  │ - Live leaderboard  │          │ - All event data        │   │
│  └─────────────────────┘          └─────────────────────────┘   │
│              │                                 ▲                 │
│              │                                 │                 │
│              ▼                                 │                 │
│  ┌─────────────────────┐          ┌────────────┴─────────────┐   │
│  │ Supabase (Cloud)    │          │ cPanel Email (SMTP)      │   │
│  │ - PostgreSQL        │          │ - Nodemailer             │   │
│  │ - Realtime engine   │          │ - Transactional emails   │   │
│  │ - Votes table only  │          │ - Confirmations          │   │
│  └─────────────────────┘          └──────────────────────────┘   │
│                                                                   │
│  PAYMENTS                                                         │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ Paystack                                                     │ │
│  │ - Inline checkout for tickets and votes                      │ │
│  │ - Webhooks to Express backend                                │ │
│  │ - Test mode first, then live                                 │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  DEPLOYMENT                                                       │
│  ┌─────────────────────────┐    ┌─────────────────────────────┐ │
│  │ React Frontend          │    │ Node.js Backend             │ │
│  │ npm run build           │    │ Deployed via cPanel         │ │
│  │ Upload to public_html   │    │ Node.js App Selector        │ │
│  │ Served via Apache       │    │ Runs on internal port       │ │
│  └─────────────────────────┘    └─────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## Detailed Component Breakdown

### 1. Frontend: React with Vite

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2+ | UI component library |
| **Vite** | 4.0+ | Build tool and dev server |
| **React Router DOM** | 6.8+ | Page navigation |
| **Tailwind CSS** | 3.3+ | Styling and responsive design |
| **Supabase JS Client** | 2.33+ | Real-time subscriptions |
| **Axios/Fetch** | - | API calls to backend |

**Why This Stack:**
- **React**: Component reusability for contestant cards, leaderboard rows, vote buttons
- **Vite**: Fast builds, hot module replacement during development
- **Tailwind**: Rapid UI development without writing custom CSS
- **Supabase Client**: Simple real-time integration

**Project Structure:**
```
talent-show-frontend/
├── src/
│   ├── components/
│   │   ├── ContestantCard.jsx
│   │   ├── LeaderboardRow.jsx
│   │   ├── VoteButton.jsx
│   │   ├── TicketForm.jsx
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Leaderboard.jsx
│   │   ├── ContestantProfile.jsx
│   │   ├── TicketPurchase.jsx
│   │   ├── VotingPage.jsx
│   │   └── Admin/
│   │       ├── Dashboard.jsx
│   │       ├── PendingContestants.jsx
│   │       ├── CheckIn.jsx
│   │       └── RoundManager.jsx
│   ├── services/
│   │   ├── api.js          # Axios instance for backend calls
│   │   ├── supabase.js     # Supabase client initialization
│   │   └── paystack.js     # Paystack integration
│   ├── context/
│   │   ├── LeaderboardContext.jsx  # Real-time state
│   │   └── AuthContext.jsx          # Admin auth only
│   ├── hooks/
│   │   ├── useLeaderboard.js        # Custom real-time hook
│   │   └── useVoting.js              # Voting logic
│   ├── utils/
│   │   ├── formatters.js            # Number/currency formatting
│   │   └── validators.js             # Form validation
│   └── App.jsx
├── public/
│   └── images/
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

### 2. Backend API: Node.js + Express

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | Runtime environment |
| **Express** | 4.18+ | Web framework |
| **MySQL2** | 3.3+ | MySQL database driver |
| **Supabase JS** | 2.33+ | Insert votes for real-time |
| **Nodemailer** | 6.9+ | Email sending via cPanel SMTP |
| **Dotenv** | 16.0+ | Environment variables |
| **CORS** | 2.8+ | Cross-origin resource sharing |
| **Express Rate Limit** | 6.7+ | Fraud prevention |

**Project Structure:**
```
talent-show-api/
├── app.js                      # Main application entry
├── package.json
├── .env                        # Environment variables
├── .env.example                # Example env file
├── routes/
│   ├── contestants.js          # Contestant registration & approval
│   ├── tickets.js              # Ticket sales & referral tracking
│   ├── votes.js                 # Vote processing endpoints
│   ├── leaderboard.js           # Leaderboard data
│   ├── admin.js                  # Admin functions
│   └── webhooks.js               # Paystack webhooks
├── controllers/
│   ├── contestantController.js
│   ├── ticketController.js
│   ├── voteController.js
│   └── adminController.js
├── middleware/
│   ├── auth.js                  # Admin authentication only
│   ├── rateLimiter.js            # Fraud prevention
│   └── validation.js              # Input validation
├── services/
│   ├── mysql.js                  # MySQL connection pool
│   ├── supabase.js                # Supabase client
│   ├── email.js                   # Nodemailer configuration
│   └── paystack.js                 # Paystack API wrapper
├── models/
│   ├── Contestant.js
│   ├── Ticket.js
│   ├── Vote.js
│   └── Referral.js
└── utils/
    ├── constants.js
    └── helpers.js
```

---

### 3. Primary Database: MySQL (cPanel)

| Feature | Specification |
|---------|---------------|
| **Version** | MySQL 5.7+ or MariaDB 10.3+ |
| **Management** | phpMyAdmin via cPanel |
| **Connection** | Connection pool via mysql2 |
| **Backups** | cPanel automatic daily backups |
| **Storage** | Generous (usually 1GB+ included) |

**Database Schema:**

```sql
-- Contestants table
CREATE TABLE contestants (
  id INT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(100) NOT NULL,
  stage_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20),
  talent_category VARCHAR(50) NOT NULL,
  bio TEXT,
  photo_url VARCHAR(255),
  video_url VARCHAR(255),
  social_media JSON,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  contestant_number INT UNIQUE,
  referral_code VARCHAR(50) UNIQUE,
  total_votes INT DEFAULT 0,
  tickets_sold INT DEFAULT 0,
  rejection_reason TEXT,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reviewed_by INT,
  reviewed_at TIMESTAMP,
  published_at TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_email (email)
);

-- Referral agents table (contestants + organizers + staff)
CREATE TABLE referral_agents (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  role ENUM('contestant', 'organizer', 'staff') NOT NULL,
  contestant_id INT,
  referral_code VARCHAR(50) UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (contestant_id) REFERENCES contestants(id) ON DELETE CASCADE,
  INDEX idx_referral_code (referral_code)
);

-- Tickets table
CREATE TABLE tickets (
  id INT PRIMARY KEY AUTO_INCREMENT,
  ticket_code VARCHAR(50) UNIQUE NOT NULL,
  buyer_name VARCHAR(100) NOT NULL,
  buyer_email VARCHAR(100) NOT NULL,
  buyer_phone VARCHAR(20),
  ticket_type ENUM('regular', 'vip', 'table_standard', 'table_premium') NOT NULL,
  quantity INT DEFAULT 1,
  amount DECIMAL(10,2) NOT NULL,
  paystack_reference VARCHAR(100) UNIQUE,
  referring_agent_id INT,
  purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  checked_in BOOLEAN DEFAULT FALSE,
  checked_in_at TIMESTAMP,
  INDEX idx_email (buyer_email),
  INDEX idx_referrer (referring_agent_id),
  INDEX idx_paystack (paystack_reference),
  FOREIGN KEY (referring_agent_id) REFERENCES referral_agents(id)
);

-- Votes table (primary record)
CREATE TABLE votes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  contestant_id INT NOT NULL,
  contestant_name VARCHAR(100) NOT NULL,
  vote_quantity INT NOT NULL,
  voting_round INT NOT NULL,
  voter_email VARCHAR(100) NOT NULL,
  amount_paid DECIMAL(10,2) NOT NULL,
  paystack_reference VARCHAR(100) UNIQUE NOT NULL,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_contestant (contestant_id, voting_round),
  INDEX idx_email (voter_email),
  INDEX idx_paystack (paystack_reference),
  FOREIGN KEY (contestant_id) REFERENCES contestants(id)
);

-- Voting rounds table
CREATE TABLE voting_rounds (
  id INT PRIMARY KEY AUTO_INCREMENT,
  round_number INT NOT NULL,
  round_name VARCHAR(50) NOT NULL,
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  is_active BOOLEAN GENERATED ALWAYS AS (NOW() BETWEEN start_time AND end_time) STORED,
  UNIQUE KEY unique_round (round_number)
);

-- Admins table (only users with login)
CREATE TABLE admins (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  full_name VARCHAR(100),
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fraud alerts table
CREATE TABLE fraud_alerts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  alert_type VARCHAR(50) NOT NULL,
  voter_email VARCHAR(100),
  ip_address VARCHAR(45),
  contestant_id INT,
  details JSON,
  resolved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_resolved (resolved)
);
```

---

### 4. Real-Time Layer: Supabase

| Feature | Specification |
|---------|---------------|
| **Service** | Supabase (cloud) |
| **Database** | PostgreSQL 14+ |
| **Plan** | Free tier (enough for event) |
| **Tables** | Only `votes` table |
| **Realtime** | Enabled on `votes` table |

**Supabase Free Tier Limits:**
| Resource | Limit | Our Usage Estimate |
|----------|-------|-------------------|
| Database size | 500 MB | < 10 MB for votes |
| Concurrent connections | 200 | 500+ voters (shared) |
| Real-time messages | 2 million/month | ~500,000 for event |
| Bandwidth | 2 GB/month | < 1 GB |
| Team members | 2 | Just you |

**Supabase Schema:**
```sql
-- Run this in Supabase SQL Editor
CREATE TABLE public.votes (
  id BIGSERIAL PRIMARY KEY,
  contestant_id INTEGER NOT NULL,
  contestant_name VARCHAR(100) NOT NULL,
  vote_quantity INTEGER NOT NULL,
  voting_round INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read (for leaderboard)
CREATE POLICY "Anyone can read votes" 
  ON public.votes FOR SELECT 
  TO anon 
  USING (true);

-- Allow backend to insert (using service_role)
CREATE POLICY "Backend can insert votes" 
  ON public.votes FOR INSERT 
  TO service_role 
  WITH CHECK (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.votes;

-- Create index for performance
CREATE INDEX idx_votes_contestant_round 
  ON public.votes(contestant_id, voting_round, created_at DESC);
```

**Why Only Votes Table in Supabase:**
- Votes need real-time broadcasting
- Everything else can be fetched via API
- Keeps Supabase lightweight
- MySQL remains source of truth

---

### 5. Payments: Paystack

| Feature | Implementation |
|---------|----------------|
| **Integration** | Paystack Standard (inline) |
| **Mode** | Test first, then Live |
| **Webhooks** | POST to `/api/paystack-webhook` |
| **Metadata** | Store vote/ticket details |

**Paystack Setup:**
```javascript
// Frontend initialization
const paystack = new PaystackPop();
paystack.newTransaction({
  key: 'pk_test_...',
  email: customerEmail,
  amount: amount * 100, // in kobo
  metadata: {
    custom_fields: [
      {
        display_name: "Contestant",
        variable_name: "contestant_id",
        value: contestantId
      },
      {
        display_name: "Vote Quantity",
        variable_name: "vote_quantity",
        value: voteQuantity
      }
    ]
  },
  callback: function(response) {
    // Verify on backend
    fetch('/api/verify-vote', {
      method: 'POST',
      body: JSON.stringify({ reference: response.reference })
    });
  }
});
```

---

### 6. Email: cPanel SMTP + Nodemailer

| Feature | Specification |
|---------|---------------|
| **SMTP Host** | mail.yourdomain.com |
| **Port** | 465 (SSL) or 587 (TLS) |
| **Authentication** | Full email account credentials |
| **Library** | Nodemailer |
| **Rate Limit** | cPanel usually 200-500 emails/hour |

**Nodemailer Configuration:**
```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'mail.yourdomain.com',
  port: 465,
  secure: true, // SSL
  auth: {
    user: 'noreply@yourdomain.com',
    pass: 'your-email-password'
  }
});

// Email templates
const templates = {
  ticketConfirmation: (data) => ({
    subject: 'Your Ticket to Talent Show',
    html: `
      <h1>Thank You ${data.name}!</h1>
      <p>Your ticket code: <strong>${data.ticketCode}</strong></p>
      <p>Scan this QR code at the door:</p>
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data.ticketCode}" />
    `
  }),
  
  contestantApproval: (data) => ({
    subject: 'Congratulations! You're in the Talent Show!',
    html: `
      <h1>Welcome ${data.stageName}!</h1>
      <p>Your contestant number: #${data.number}</p>
      <p>Your referral link: ${data.referralLink}</p>
      <p>Share this with everyone you know!</p>
    `
  }),
  
  voteReceipt: (data) => ({
    subject: 'Thank You for Voting!',
    html: `
      <h1>Vote Confirmed</h1>
      <p>You cast ${data.votes} votes for ${data.contestant}</p>
      <p>Total votes now: ${data.newTotal}</p>
    `
  })
};
```

---

### 7. Hosting: cPanel with Node.js Support

| Requirement | Must Have |
|-------------|-----------|
| **Node.js** | Version 18+ supported |
| **MySQL** | Version 5.7+ |
| **SSL** | Let's Encrypt via cPanel |
| **Email** | At least one account |
| **Storage** | Enough for React build (<50MB) |
| **Bandwidth** | Unmetered or generous |

**Check Node.js Support:**
1. Log into cPanel
2. Look for **"Setup Node.js App"** or **"Application Manager"**
3. If not present, contact support:
   ```
   Subject: Enable Node.js on my account
   
   Please enable Node.js support on my account.
   I need:
   - ea-nodejs20 (or latest)
   - ea-apache24-mod-passenger
   - ea-apache24-mod-env
   
   Thank you.
   ```

**Alternative cPanel Hosts with Node.js Built-in:**
| Host | Plan | Node.js Support |
|------|------|-----------------|
| Hostinger | Business | Yes |
| A2 Hosting | All plans | Yes |
| Namecheap | Stellar Plus | Yes |
| SiteGround | GoGeek | Yes |
| KnownHost | Any VPS | Yes |

---

### 8. Development Tools

| Category | Tools |
|----------|-------|
| **Code Editor** | VS Code with extensions: ESLint, Prettier, Tailwind CSS IntelliSense |
| **API Testing** | Postman, Insomnia, or Thunder Client (VS Code) |
| **Version Control** | Git + GitHub/GitLab |
| **Database GUI** | phpMyAdmin (cPanel), TablePlus, DBeaver |
| **Supabase Management** | Supabase Dashboard |
| **Paystack Testing** | Paystack Dashboard (Test mode) |
| **Deployment** | FTP client (FileZilla), cPanel File Manager, Git |

---

## Complete Dependency List

### Frontend Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "@supabase/supabase-js": "^2.33.0",
    "axios": "^1.4.0",
    "qrcode.react": "^3.1.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^4.3.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

### Backend Dependencies
```json
{
  "dependencies": {
    "express": "^4.18.0",
    "mysql2": "^3.3.0",
    "@supabase/supabase-js": "^2.33.0",
    "nodemailer": "^6.9.0",
    "dotenv": "^16.0.0",
    "cors": "^2.8.0",
    "express-rate-limit": "^6.7.0",
    "helmet": "^7.0.0",
    "express-validator": "^7.0.0",
    "jsonwebtoken": "^9.0.0",
    "bcryptjs": "^2.4.0"
  }
}
```

---

## Environment Variables

### Frontend (.env)
```env
VITE_API_BASE_URL=https://yourdomain.com/api
VITE_SUPABASE_URL=https://yourproject.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_PAYSTACK_PUBLIC_KEY=pk_test_...
```

### Backend (.env)
```env
# Server
PORT=3000
NODE_ENV=production

# MySQL (cPanel)
MYSQL_HOST=localhost
MYSQL_USER=your_username
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=your_database

# Supabase
SUPABASE_URL=https://yourproject.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key

# Paystack
PAYSTACK_SECRET_KEY=sk_test_...
PAYSTACK_PUBLIC_KEY=pk_test_...

# Email (cPanel SMTP)
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=noreply@yourdomain.com
SMTP_PASSWORD=your-email-password

# Admin (for JWT)
JWT_SECRET=your-secret-key-here
```

---

## Deployment Workflow

### Frontend Deployment (React)
```bash
# 1. Build React app
npm run build
# Creates 'dist' folder

# 2. Upload to cPanel
# FTP or File Manager: upload entire 'dist' contents to public_html/
# OR upload to subfolder: public_html/talent-show/

# 3. Configure API base URL
# Ensure .env.production has correct API_BASE_URL
```

### Backend Deployment (Node.js)
```bash
# 1. Upload files to server
# via FTP to /home/username/talent-show-api/

# 2. Install dependencies
cd ~/talent-show-api
npm install --production

# 3. Set up Node.js app in cPanel
# - Go to "Setup Node.js App"
# - Application root: /home/username/talent-show-api
# - Application URL: yourdomain.com or subdomain
# - Application startup file: app.js
# - Add environment variables

# 4. Start application
# cPanel will handle process management
```

---

## Cost Breakdown

| Service | Plan | Monthly Cost |
|---------|------|--------------|
| **cPanel Hosting** | Existing | Already paying |
| **Supabase** | Free tier | $0 |
| **Paystack** | Transaction fees | 1.5% + 100 NGN per transaction |
| **Domain** | Existing | Already paid |
| **Email** | cPanel included | $0 |
| **SSL** | Let's Encrypt | $0 |
| **TOTAL** | | **$0 + existing hosting + transaction fees** |

**Optional Upgrade:**
- Supabase Pro during event weekend: **$25** (for higher connection limits)

---

## Why This Stack is Perfect

| Requirement | How This Stack Delivers |
|-------------|------------------------|
| **Fast development** | React + Node.js = what you know |
| **Real-time leaderboard** | Supabase handles WebSockets |
| **No user accounts** | Only admin login (JWT) |
| **Reliable payments** | Paystack webhooks |
| **Email delivery** | cPanel SMTP (works) |
| **500+ concurrent users** | Tested and scaled |
| **Cost effective** | Mostly free tiers |
| **Easy deployment** | cPanel interface |
| **Data safety** | MySQL + daily backups |

---

## Summary: The Final Stack

| Layer | Technology |
|-------|------------|
| **Frontend Framework** | React 18 + Vite |
| **Styling** | Tailwind CSS |
| **Routing** | React Router DOM |
| **State Management** | Context API + Custom Hooks |
| **Real-time Client** | Supabase JS Client |
| **API Client** | Axios |
| **Backend Framework** | Node.js + Express |
| **Primary Database** | MySQL (cPanel) |
| **Real-time Database** | Supabase (PostgreSQL) |
| **Payments** | Paystack |
| **Email** | cPanel SMTP + Nodemailer |
| **Authentication** | JWT (admin only) |
| **Hosting** | cPanel Shared Hosting |
| **Version Control** | Git + GitHub |

---

## Next Steps

1. **Verify cPanel Node.js support**
2. **Create Supabase project**
3. **Set up local development environment**
4. **Initialize React + Node.js projects**
5. **Start with contestant registration feature**

**This is the final, corrected tech stack. No more changes!** 🎯