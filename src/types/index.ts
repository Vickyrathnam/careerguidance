export interface AssessmentData {
  interests: string[];
  skills: string[];
  values: string[];
  workStyle: string[];
  education: string;
  experience: string;
  personality: string[];
}

export interface CareerMatch {
  id: string;
  title: string;
  description: string;
  matchScore: number;
  salaryRange: string;
  growth: string;
  requiredSkills: string[];
  education: string;
  workEnvironment: string;
  keyTasks: string[];
  pros: string[];
  cons: string[];
  relatedCareers: string[];
}

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  timeframe: string;
  type: 'education' | 'skill' | 'experience' | 'certification';
  resources: Resource[];
  completed?: boolean;
}

export interface Resource {
  id: string;
  title: string;
  type: 'course' | 'book' | 'website' | 'certification' | 'tool';
  url: string;
  provider: string;
  duration?: string;
  price?: string;
  rating?: number;
}