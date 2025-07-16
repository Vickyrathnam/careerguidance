export interface User {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
}

export interface AssessmentResponse {
  id: string;
  user_id: string;
  interests: string[];
  skills: string[];
  values: string[];
  work_style: string[];
  education: string;
  experience: string;
  personality: string[];
  created_at: Date;
}

export interface CareerMatch {
  id: string;
  user_id: string;
  assessment_id: string;
  career_title: string;
  match_score: number;
  career_data: any;
  created_at: Date;
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  expertise: string[];
  bio: string;
  image_url?: string;
  linkedin_url?: string;
  email?: string;
  years_experience: number;
  rating: number;
  total_sessions: number;
  hourly_rate?: number;
  availability_status: string;
  created_at: Date;
}

export interface ContactMessage {
  id: string;
  user_id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  created_at: Date;
}

export interface MentorSession {
  id: string;
  user_id: string;
  mentor_id: string;
  session_date: Date;
  duration: number;
  status: string;
  notes?: string;
  created_at: Date;
}