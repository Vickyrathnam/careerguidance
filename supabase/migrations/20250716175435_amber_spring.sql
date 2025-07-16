-- Create database schema for Career Guidance System

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Assessment responses table
CREATE TABLE IF NOT EXISTS assessment_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  interests TEXT[],
  skills TEXT[],
  values TEXT[],
  work_style TEXT[],
  education VARCHAR(255),
  experience VARCHAR(255),
  personality TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Career matches table
CREATE TABLE IF NOT EXISTS career_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  assessment_id UUID REFERENCES assessment_responses(id) ON DELETE CASCADE,
  career_title VARCHAR(255) NOT NULL,
  match_score INTEGER NOT NULL,
  career_data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Mentors table
CREATE TABLE IF NOT EXISTS mentors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  expertise TEXT[] NOT NULL,
  bio TEXT NOT NULL,
  image_url VARCHAR(500),
  linkedin_url VARCHAR(500),
  email VARCHAR(255),
  years_experience INTEGER NOT NULL,
  rating DECIMAL(3,2) DEFAULT 0.00,
  total_sessions INTEGER DEFAULT 0,
  hourly_rate DECIMAL(10,2),
  availability_status VARCHAR(50) DEFAULT 'available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'unread',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Mentor sessions table
CREATE TABLE IF NOT EXISTS mentor_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  mentor_id UUID REFERENCES mentors(id) ON DELETE CASCADE,
  session_date TIMESTAMP NOT NULL,
  duration INTEGER NOT NULL, -- in minutes
  status VARCHAR(50) DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample mentors
INSERT INTO mentors (name, title, company, expertise, bio, image_url, linkedin_url, email, years_experience, rating, total_sessions, hourly_rate) VALUES
('Sarah Johnson', 'Senior Software Engineer', 'Google', ARRAY['Software Development', 'Machine Learning', 'Career Transition'], 'Experienced software engineer with 8+ years at top tech companies. Passionate about helping others break into tech and advance their careers.', 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg', 'https://linkedin.com/in/sarahjohnson', 'sarah.johnson@email.com', 8, 4.9, 127, 150.00),

('Michael Chen', 'UX Design Director', 'Apple', ARRAY['UX Design', 'Product Strategy', 'Design Leadership'], 'Award-winning UX designer with expertise in mobile and web applications. Led design teams at Apple and helped launch multiple successful products.', 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg', 'https://linkedin.com/in/michaelchen', 'michael.chen@email.com', 12, 4.8, 89, 200.00),

('Emily Rodriguez', 'Data Science Manager', 'Netflix', ARRAY['Data Science', 'Analytics', 'Team Management'], 'Data science leader with experience in recommendation systems and business intelligence. Helps aspiring data scientists navigate their career path.', 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg', 'https://linkedin.com/in/emilyrodriguez', 'emily.rodriguez@email.com', 10, 4.9, 156, 175.00),

('David Kim', 'Marketing Director', 'Spotify', ARRAY['Digital Marketing', 'Brand Strategy', 'Growth Marketing'], 'Marketing executive with expertise in digital campaigns and brand building. Passionate about mentoring the next generation of marketers.', 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg', 'https://linkedin.com/in/davidkim', 'david.kim@email.com', 9, 4.7, 98, 125.00),

('Lisa Thompson', 'Project Manager', 'Microsoft', ARRAY['Project Management', 'Agile', 'Leadership'], 'Certified PMP with experience managing large-scale software projects. Helps professionals develop project management and leadership skills.', 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg', 'https://linkedin.com/in/lisathompson', 'lisa.thompson@email.com', 11, 4.8, 134, 140.00),

('James Wilson', 'Financial Analyst', 'Goldman Sachs', ARRAY['Finance', 'Investment Banking', 'Financial Modeling'], 'Senior financial analyst with Wall Street experience. Specializes in helping students and professionals enter the finance industry.', 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', 'https://linkedin.com/in/jameswilson', 'james.wilson@email.com', 7, 4.6, 76, 180.00);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_assessment_responses_user_id ON assessment_responses(user_id);
CREATE INDEX IF NOT EXISTS idx_career_matches_user_id ON career_matches(user_id);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_mentor_sessions_user_id ON mentor_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_mentor_sessions_mentor_id ON mentor_sessions(mentor_id);