-- MySQL Schema (cPanel)

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
  status ENUM('Pending', 'Screened', 'Qualified', 'Finalist', 'Eliminated', 'Winner', 'Runner-up') DEFAULT 'Pending',
  contestant_number INT UNIQUE,
  referral_code VARCHAR(50) UNIQUE,
  total_votes INT DEFAULT 0,
  tickets_sold INT DEFAULT 0,
  judges_score DECIMAL(5,2) DEFAULT 0.00,
  referral_count INT DEFAULT 0,
  rejection_reason TEXT,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reviewed_by INT,
  reviewed_at TIMESTAMP,
  published_at TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_email (email)
);

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

CREATE TABLE voting_rounds (
  id INT PRIMARY KEY AUTO_INCREMENT,
  round_number INT NOT NULL,
  round_name VARCHAR(50) NOT NULL,
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  is_active BOOLEAN DEFAULT FALSE,
  UNIQUE KEY unique_round (round_number)
);

CREATE TABLE admins (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  full_name VARCHAR(100),
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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

CREATE TABLE system_settings (
  setting_key VARCHAR(50) PRIMARY KEY,
  setting_value VARCHAR(100) NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Initialize with Registration Phase
INSERT INTO system_settings (setting_key, setting_value) VALUES ('current_phase', '1');
INSERT INTO system_settings (setting_key, setting_value) VALUES ('voting_active', 'false');

-- Supabase Schema (PostgreSQL)

CREATE TABLE public.votes (
  id BIGSERIAL PRIMARY KEY,
  contestant_id INTEGER NOT NULL,
  contestant_name VARCHAR(100) NOT NULL,
  vote_quantity INTEGER NOT NULL,
  voting_round INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Realtime
-- Realtime setup must be done via Supabase dashboard for publications.
