import { AssessmentData, CareerMatch } from '../types';

const careerDatabase: Omit<CareerMatch, 'matchScore'>[] = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    description: 'Design, develop, and maintain software applications and systems using various programming languages and technologies.',
    salaryRange: '$70,000 - $150,000',
    growth: 'Very High (22% growth)',
    requiredSkills: ['Programming', 'Problem Solving', 'System Design', 'Testing', 'Version Control'],
    education: 'Bachelor\'s in Computer Science or related field',
    workEnvironment: 'Office/Remote',
    keyTasks: ['Write and test code', 'Debug applications', 'Collaborate with team', 'Design software architecture'],
    pros: ['High demand', 'Good compensation', 'Remote work opportunities', 'Continuous learning'],
    cons: ['Long hours during deadlines', 'Rapidly changing technology', 'Can be stressful'],
    relatedCareers: ['Data Scientist', 'DevOps Engineer', 'Product Manager']
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Analyze complex data sets to extract insights and build predictive models for business decision-making.',
    salaryRange: '$80,000 - $160,000',
    growth: 'Very High (31% growth)',
    requiredSkills: ['Statistics', 'Programming', 'Machine Learning', 'Data Visualization', 'SQL'],
    education: 'Bachelor\'s in Statistics, Math, or Computer Science',
    workEnvironment: 'Office/Remote',
    keyTasks: ['Analyze data patterns', 'Build ML models', 'Create visualizations', 'Present findings'],
    pros: ['High growth field', 'Excellent pay', 'Varied projects', 'Impact on business decisions'],
    cons: ['Requires continuous learning', 'Complex problems', 'Data quality issues'],
    relatedCareers: ['Machine Learning Engineer', 'Business Analyst', 'Research Scientist']
  },
  {
    id: 'ux-designer',
    title: 'UX Designer',
    description: 'Create user-centered designs for digital products, focusing on user experience and interface design.',
    salaryRange: '$60,000 - $120,000',
    growth: 'High (13% growth)',
    requiredSkills: ['Design Thinking', 'Prototyping', 'User Research', 'Wireframing', 'Usability Testing'],
    education: 'Bachelor\'s in Design, Psychology, or related field',
    workEnvironment: 'Office/Remote',
    keyTasks: ['Conduct user research', 'Create wireframes', 'Design prototypes', 'Test usability'],
    pros: ['Creative work', 'User impact', 'Growing field', 'Collaborative environment'],
    cons: ['Subjective feedback', 'Tight deadlines', 'Balancing user needs with business goals'],
    relatedCareers: ['Product Designer', 'UI Designer', 'Front-end Developer']
  },
  {
    id: 'digital-marketer',
    title: 'Digital Marketing Specialist',
    description: 'Develop and execute digital marketing strategies across various online channels to drive business growth.',
    salaryRange: '$45,000 - $95,000',
    growth: 'High (10% growth)',
    requiredSkills: ['SEO', 'Social Media', 'Analytics', 'Content Creation', 'PPC Advertising'],
    education: 'Bachelor\'s in Marketing or related field',
    workEnvironment: 'Office/Remote',
    keyTasks: ['Manage social media', 'Create content', 'Analyze metrics', 'Run ad campaigns'],
    pros: ['Creative and analytical', 'Measurable results', 'Diverse channels', 'Remote opportunities'],
    cons: ['Algorithm changes', 'Constant learning', 'Pressure for results'],
    relatedCareers: ['Content Manager', 'Social Media Manager', 'Marketing Manager']
  },
  {
    id: 'project-manager',
    title: 'Project Manager',
    description: 'Lead cross-functional teams to deliver projects on time, within scope, and budget using various methodologies.',
    salaryRange: '$65,000 - $130,000',
    growth: 'High (11% growth)',
    requiredSkills: ['Leadership', 'Communication', 'Planning', 'Risk Management', 'Agile/Scrum'],
    education: 'Bachelor\'s degree, PMP certification preferred',
    workEnvironment: 'Office/Hybrid',
    keyTasks: ['Plan projects', 'Coordinate teams', 'Manage timelines', 'Communicate with stakeholders'],
    pros: ['Leadership opportunities', 'Diverse projects', 'Good compensation', 'Transferable skills'],
    cons: ['High responsibility', 'Stressful deadlines', 'Challenging stakeholders'],
    relatedCareers: ['Product Manager', 'Program Manager', 'Business Analyst']
  },
  {
    id: 'financial-analyst',
    title: 'Financial Analyst',
    description: 'Analyze financial data and market trends to provide insights for investment decisions and business planning.',
    salaryRange: '$55,000 - $110,000',
    growth: 'Medium (6% growth)',
    requiredSkills: ['Financial Modeling', 'Excel', 'Statistics', 'Research', 'Critical Thinking'],
    education: 'Bachelor\'s in Finance, Economics, or related field',
    workEnvironment: 'Office',
    keyTasks: ['Build financial models', 'Analyze market trends', 'Create reports', 'Present findings'],
    pros: ['Analytical work', 'Good compensation', 'Career progression', 'Stable industry'],
    cons: ['High pressure', 'Long hours', 'Detailed work', 'Market volatility stress'],
    relatedCareers: ['Investment Banker', 'Risk Analyst', 'Portfolio Manager']
  },
  {
    id: 'nurse',
    title: 'Registered Nurse',
    description: 'Provide patient care, administer medications, and support patients and families in healthcare settings.',
    salaryRange: '$60,000 - $100,000',
    growth: 'Very High (9% growth)',
    requiredSkills: ['Patient Care', 'Medical Knowledge', 'Communication', 'Critical Thinking', 'Empathy'],
    education: 'Associate or Bachelor\'s in Nursing, RN license',
    workEnvironment: 'Hospital/Clinic',
    keyTasks: ['Administer medications', 'Monitor patients', 'Educate families', 'Coordinate care'],
    pros: ['Meaningful work', 'Job security', 'Flexible schedules', 'High demand'],
    cons: ['Emotional stress', 'Physical demands', 'Shift work', 'Difficult patients'],
    relatedCareers: ['Nurse Practitioner', 'Healthcare Administrator', 'Physical Therapist']
  },
  {
    id: 'teacher',
    title: 'Elementary School Teacher',
    description: 'Educate and inspire young students while creating engaging learning environments and curricula.',
    salaryRange: '$40,000 - $70,000',
    growth: 'Medium (4% growth)',
    requiredSkills: ['Teaching', 'Communication', 'Patience', 'Creativity', 'Classroom Management'],
    education: 'Bachelor\'s in Education or subject area, teaching license',
    workEnvironment: 'School',
    keyTasks: ['Plan lessons', 'Teach students', 'Assess progress', 'Communicate with parents'],
    pros: ['Meaningful impact', 'Summers off', 'Job security', 'Helping children grow'],
    cons: ['Low pay', 'Challenging students', 'Long hours', 'Limited resources'],
    relatedCareers: ['School Counselor', 'Curriculum Developer', 'Educational Technology Specialist']
  },
  {
    id: 'mechanical-engineer',
    title: 'Mechanical Engineer',
    description: 'Design, develop, and test mechanical devices, engines, and machines across various industries.',
    salaryRange: '$70,000 - $120,000',
    growth: 'Medium (4% growth)',
    requiredSkills: ['CAD Software', 'Problem Solving', 'Math', 'Physics', 'Project Management'],
    education: 'Bachelor\'s in Mechanical Engineering',
    workEnvironment: 'Office/Manufacturing',
    keyTasks: ['Design mechanical systems', 'Test prototypes', 'Analyze performance', 'Improve designs'],
    pros: ['Diverse industries', 'Good pay', 'Innovation opportunities', 'Problem-solving'],
    cons: ['Complex projects', 'Pressure for perfection', 'Long development cycles'],
    relatedCareers: ['Design Engineer', 'Manufacturing Engineer', 'Aerospace Engineer']
  },
  {
    id: 'graphic-designer',
    title: 'Graphic Designer',
    description: 'Create visual concepts and designs for various media including print, digital, and multimedia platforms.',
    salaryRange: '$35,000 - $75,000',
    growth: 'Medium (3% growth)',
    requiredSkills: ['Design Software', 'Creativity', 'Typography', 'Color Theory', 'Communication'],
    education: 'Bachelor\'s in Graphic Design or related field',
    workEnvironment: 'Office/Remote',
    keyTasks: ['Create visual designs', 'Work with clients', 'Develop branding', 'Produce layouts'],
    pros: ['Creative expression', 'Diverse projects', 'Flexible work', 'Visual impact'],
    cons: ['Client revisions', 'Tight deadlines', 'Subjective feedback', 'Competitive field'],
    relatedCareers: ['Art Director', 'Web Designer', 'Brand Designer']
  }
];

export const generateCareerMatches = (assessmentData: AssessmentData): CareerMatch[] => {
  const matches: CareerMatch[] = [];

  for (const career of careerDatabase) {
    let score = 0;
    let maxScore = 0;

    // Interest matching (30% weight)
    const interestWeight = 30;
    const interestMatches = calculateInterestMatch(assessmentData.interests, career.title, career.description);
    score += interestMatches * interestWeight;
    maxScore += interestWeight;

    // Skills matching (25% weight)
    const skillWeight = 25;
    const skillMatches = calculateSkillMatch(assessmentData.skills, career.requiredSkills);
    score += skillMatches * skillWeight;
    maxScore += skillWeight;

    // Values matching (20% weight)
    const valueWeight = 20;
    const valueMatches = calculateValueMatch(assessmentData.values, career);
    score += valueMatches * valueWeight;
    maxScore += valueWeight;

    // Work style matching (15% weight)
    const workStyleWeight = 15;
    const workStyleMatches = calculateWorkStyleMatch(assessmentData.workStyle, career.workEnvironment);
    score += workStyleMatches * workStyleWeight;
    maxScore += workStyleWeight;

    // Education matching (10% weight)
    const educationWeight = 10;
    const educationMatches = calculateEducationMatch(assessmentData.education, career.education);
    score += educationMatches * educationWeight;
    maxScore += educationWeight;

    const matchScore = Math.round((score / maxScore) * 100);

    matches.push({
      ...career,
      matchScore
    });
  }

  // Sort by match score and return top matches
  return matches.sort((a, b) => b.matchScore - a.matchScore);
};

const calculateInterestMatch = (userInterests: string[], careerTitle: string, careerDescription: string): number => {
  const interestKeywords: { [key: string]: string[] } = {
    'Technology & Innovation': ['software', 'engineer', 'developer', 'tech', 'system', 'programming'],
    'Healthcare & Medicine': ['nurse', 'medical', 'patient', 'health', 'care', 'clinical'],
    'Education & Training': ['teacher', 'education', 'school', 'student', 'learning', 'curriculum'],
    'Arts & Creative': ['design', 'creative', 'visual', 'art', 'graphic', 'aesthetic'],
    'Business & Finance': ['financial', 'analyst', 'business', 'market', 'investment', 'economic'],
    'Science & Research': ['research', 'data', 'scientist', 'analysis', 'study', 'investigation'],
    'Engineering & Manufacturing': ['mechanical', 'engineer', 'design', 'manufacturing', 'technical', 'systems']
  };

  let matches = 0;
  for (const interest of userInterests) {
    if (interestKeywords[interest]) {
      for (const keyword of interestKeywords[interest]) {
        if (careerTitle.toLowerCase().includes(keyword) || careerDescription.toLowerCase().includes(keyword)) {
          matches++;
          break;
        }
      }
    }
  }

  return Math.min(matches / Math.max(userInterests.length, 1), 1);
};

const calculateSkillMatch = (userSkills: string[], careerSkills: string[]): number => {
  const skillMappings: { [key: string]: string[] } = {
    'Problem Solving': ['problem solving', 'analytical', 'critical thinking', 'troubleshooting'],
    'Leadership': ['leadership', 'management', 'team', 'coordination'],
    'Communication': ['communication', 'presentation', 'writing', 'interpersonal'],
    'Creativity': ['creativity', 'design', 'innovation', 'artistic'],
    'Analytical Thinking': ['analytical', 'statistics', 'data', 'research', 'math'],
    'Technical Skills': ['programming', 'software', 'cad', 'technical', 'engineering']
  };

  let matches = 0;
  for (const userSkill of userSkills) {
    const mappedSkills = skillMappings[userSkill] || [userSkill.toLowerCase()];
    for (const careerSkill of careerSkills) {
      if (mappedSkills.some(skill => careerSkill.toLowerCase().includes(skill))) {
        matches++;
        break;
      }
    }
  }

  return Math.min(matches / Math.max(userSkills.length, 1), 1);
};

const calculateValueMatch = (userValues: string[], career: Omit<CareerMatch, 'matchScore'>): number => {
  const valueScores: { [key: string]: number } = {
    'High Salary': career.salaryRange.includes('100,000') ? 1 : 0.5,
    'Job Security': career.growth.includes('High') || career.growth.includes('Very High') ? 1 : 0.7,
    'Work-Life Balance': career.workEnvironment.includes('Remote') ? 1 : 0.6,
    'Growth Opportunities': career.growth.includes('High') || career.growth.includes('Very High') ? 1 : 0.5,
    'Making a Difference': ['teacher', 'nurse', 'social'].some(word => career.title.toLowerCase().includes(word)) ? 1 : 0.3
  };

  let totalScore = 0;
  for (const value of userValues) {
    totalScore += valueScores[value] || 0.5;
  }

  return Math.min(totalScore / Math.max(userValues.length, 1), 1);
};

const calculateWorkStyleMatch = (userWorkStyle: string[], careerWorkEnvironment: string): number => {
  const workStyleScores: { [key: string]: number } = {
    'Remote Work': careerWorkEnvironment.includes('Remote') ? 1 : 0,
    'Office Environment': careerWorkEnvironment.includes('Office') ? 1 : 0,
    'Hybrid Model': careerWorkEnvironment.includes('Hybrid') ? 1 : 0,
    'Team Collaboration': 1, // Most careers involve some collaboration
    'Independent Work': careerWorkEnvironment.includes('Remote') ? 1 : 0.5
  };

  let totalScore = 0;
  for (const style of userWorkStyle) {
    totalScore += workStyleScores[style] || 0.5;
  }

  return Math.min(totalScore / Math.max(userWorkStyle.length, 1), 1);
};

const calculateEducationMatch = (userEducation: string, careerEducation: string): number => {
  const educationLevels: { [key: string]: number } = {
    'High School': 1,
    'Associate Degree': 2,
    'Bachelor\'s Degree': 3,
    'Master\'s Degree': 4,
    'Doctoral Degree': 5
  };

  const userLevel = educationLevels[userEducation] || 1;
  const requiredLevel = careerEducation.includes('Master') ? 4 :
                       careerEducation.includes('Bachelor') ? 3 :
                       careerEducation.includes('Associate') ? 2 : 1;

  return userLevel >= requiredLevel ? 1 : Math.max(0.3, userLevel / requiredLevel);
};