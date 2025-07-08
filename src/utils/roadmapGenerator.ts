import { CareerMatch, RoadmapStep, Resource } from '../types';

export const generateCareerRoadmap = (career: CareerMatch): RoadmapStep[] => {
  const roadmapTemplates: { [key: string]: RoadmapStep[] } = {
    'software-engineer': [
      {
        id: 'se-1',
        title: 'Learn Programming Fundamentals',
        description: 'Master the basics of programming with languages like Python, JavaScript, or Java. Focus on data structures, algorithms, and problem-solving techniques.',
        timeframe: '0-6 months',
        type: 'skill',
        resources: [
          {
            id: 'se-r1',
            title: 'Python for Everybody Specialization',
            type: 'course',
            url: 'https://www.coursera.org/specializations/python',
            provider: 'Coursera',
            duration: '8 months',
            price: '$49/month'
          },
          {
            id: 'se-r2',
            title: 'JavaScript: The Complete Guide',
            type: 'course',
            url: 'https://www.udemy.com/course/javascript-the-complete-guide-2020-beginner-advanced/',
            provider: 'Udemy',
            duration: '52 hours',
            price: '$89.99'
          }
        ]
      },
      {
        id: 'se-2',
        title: 'Build Your First Projects',
        description: 'Create portfolio projects to demonstrate your skills. Start with simple applications and gradually increase complexity.',
        timeframe: '6 months - 1 year',
        type: 'experience',
        resources: [
          {
            id: 'se-r3',
            title: 'GitHub Pages',
            type: 'tool',
            url: 'https://pages.github.com/',
            provider: 'GitHub',
            price: 'Free'
          },
          {
            id: 'se-r4',
            title: '100 Days of Code',
            type: 'website',
            url: 'https://www.100daysofcode.com/',
            provider: '100 Days of Code',
            price: 'Free'
          }
        ]
      },
      {
        id: 'se-3',
        title: 'Learn Web Development Frameworks',
        description: 'Master popular frameworks like React, Angular, or Vue.js for front-end development, and Node.js or Django for back-end.',
        timeframe: '1-2 years',
        type: 'skill',
        resources: [
          {
            id: 'se-r5',
            title: 'React - The Complete Guide',
            type: 'course',
            url: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/',
            provider: 'Udemy',
            duration: '48 hours',
            price: '$89.99'
          }
        ]
      },
      {
        id: 'se-4',
        title: 'Get Your First Developer Job',
        description: 'Apply for junior developer positions, internships, or freelance projects. Focus on companies that value growth and learning.',
        timeframe: '1-2 years',
        type: 'experience',
        resources: [
          {
            id: 'se-r6',
            title: 'LeetCode',
            type: 'website',
            url: 'https://leetcode.com/',
            provider: 'LeetCode',
            price: 'Free/Premium'
          }
        ]
      },
      {
        id: 'se-5',
        title: 'Advance Your Technical Skills',
        description: 'Learn advanced concepts like system design, cloud computing, DevOps practices, and software architecture.',
        timeframe: '2+ years',
        type: 'skill',
        resources: [
          {
            id: 'se-r7',
            title: 'AWS Cloud Practitioner',
            type: 'certification',
            url: 'https://aws.amazon.com/certification/certified-cloud-practitioner/',
            provider: 'Amazon',
            price: '$100'
          }
        ]
      }
    ],
    'data-scientist': [
      {
        id: 'ds-1',
        title: 'Master Statistics and Mathematics',
        description: 'Build a strong foundation in statistics, linear algebra, and calculus. These are essential for understanding machine learning algorithms.',
        timeframe: '0-6 months',
        type: 'education',
        resources: [
          {
            id: 'ds-r1',
            title: 'Statistics for Data Science',
            type: 'course',
            url: 'https://www.coursera.org/learn/statistical-thinking-for-data-science-and-analytics',
            provider: 'Coursera',
            duration: '5 weeks',
            price: '$49/month'
          }
        ]
      },
      {
        id: 'ds-2',
        title: 'Learn Python and R',
        description: 'Master programming languages commonly used in data science. Focus on libraries like pandas, NumPy, scikit-learn, and matplotlib.',
        timeframe: '6 months - 1 year',
        type: 'skill',
        resources: [
          {
            id: 'ds-r2',
            title: 'Python for Data Science Handbook',
            type: 'book',
            url: 'https://jakevdp.github.io/PythonDataScienceHandbook/',
            provider: 'O\'Reilly',
            price: 'Free online'
          }
        ]
      },
      {
        id: 'ds-3',
        title: 'Complete Data Science Projects',
        description: 'Work on end-to-end projects involving data collection, cleaning, analysis, and visualization. Build a portfolio on GitHub.',
        timeframe: '1-2 years',
        type: 'experience',
        resources: [
          {
            id: 'ds-r3',
            title: 'Kaggle',
            type: 'website',
            url: 'https://www.kaggle.com/',
            provider: 'Kaggle',
            price: 'Free'
          }
        ]
      },
      {
        id: 'ds-4',
        title: 'Learn Machine Learning',
        description: 'Study machine learning algorithms, deep learning, and model evaluation techniques. Practice with real datasets.',
        timeframe: '1-2 years',
        type: 'skill',
        resources: [
          {
            id: 'ds-r4',
            title: 'Machine Learning Specialization',
            type: 'course',
            url: 'https://www.coursera.org/specializations/machine-learning',
            provider: 'Coursera',
            duration: '3 months',
            price: '$49/month'
          }
        ]
      },
      {
        id: 'ds-5',
        title: 'Get Industry Experience',
        description: 'Apply for data science internships or entry-level positions. Consider adjacent roles like data analyst to gain experience.',
        timeframe: '2+ years',
        type: 'experience',
        resources: []
      }
    ],
    'ux-designer': [
      {
        id: 'ux-1',
        title: 'Learn UX Design Principles',
        description: 'Study user-centered design principles, design thinking methodology, and human-computer interaction basics.',
        timeframe: '0-6 months',
        type: 'education',
        resources: [
          {
            id: 'ux-r1',
            title: 'Google UX Design Certificate',
            type: 'certification',
            url: 'https://www.coursera.org/professional-certificates/google-ux-design',
            provider: 'Coursera',
            duration: '3-6 months',
            price: '$49/month'
          }
        ]
      },
      {
        id: 'ux-2',
        title: 'Master Design Tools',
        description: 'Learn industry-standard tools like Figma, Sketch, Adobe XD, and prototyping tools. Practice creating wireframes and mockups.',
        timeframe: '6 months - 1 year',
        type: 'skill',
        resources: [
          {
            id: 'ux-r2',
            title: 'Figma',
            type: 'tool',
            url: 'https://www.figma.com/',
            provider: 'Figma',
            price: 'Free/Paid'
          }
        ]
      },
      {
        id: 'ux-3',
        title: 'Build Your Portfolio',
        description: 'Create case studies showcasing your design process, user research, and problem-solving skills. Include real or conceptual projects.',
        timeframe: '1-2 years',
        type: 'experience',
        resources: [
          {
            id: 'ux-r3',
            title: 'Portfolio Examples',
            type: 'website',
            url: 'https://www.behance.net/',
            provider: 'Behance',
            price: 'Free'
          }
        ]
      },
      {
        id: 'ux-4',
        title: 'Gain Real-World Experience',
        description: 'Apply for internships, freelance projects, or volunteer opportunities. Consider redesigning existing products as practice.',
        timeframe: '1-2 years',
        type: 'experience',
        resources: []
      },
      {
        id: 'ux-5',
        title: 'Specialize and Advance',
        description: 'Develop expertise in specific areas like mobile design, accessibility, or user research. Consider leadership roles.',
        timeframe: '2+ years',
        type: 'skill',
        resources: []
      }
    ],
    'default': [
      {
        id: 'default-1',
        title: 'Research the Field',
        description: 'Conduct thorough research about the career path, including job requirements, industry trends, and growth opportunities.',
        timeframe: '0-3 months',
        type: 'education',
        resources: [
          {
            id: 'default-r1',
            title: 'Bureau of Labor Statistics',
            type: 'website',
            url: 'https://www.bls.gov/',
            provider: 'U.S. Government',
            price: 'Free'
          }
        ]
      },
      {
        id: 'default-2',
        title: 'Develop Required Skills',
        description: 'Identify and develop the key skills needed for this career through courses, practice, and hands-on experience.',
        timeframe: '6 months - 2 years',
        type: 'skill',
        resources: [
          {
            id: 'default-r2',
            title: 'LinkedIn Learning',
            type: 'course',
            url: 'https://www.linkedin.com/learning/',
            provider: 'LinkedIn',
            duration: 'Self-paced',
            price: '$29.99/month'
          }
        ]
      },
      {
        id: 'default-3',
        title: 'Build Experience',
        description: 'Gain relevant experience through internships, volunteer work, projects, or entry-level positions in the field.',
        timeframe: '1-3 years',
        type: 'experience',
        resources: []
      },
      {
        id: 'default-4',
        title: 'Network and Apply',
        description: 'Build professional networks, attend industry events, and apply for positions that match your growing skill set.',
        timeframe: '2+ years',
        type: 'experience',
        resources: [
          {
            id: 'default-r3',
            title: 'LinkedIn',
            type: 'website',
            url: 'https://www.linkedin.com/',
            provider: 'LinkedIn',
            price: 'Free'
          }
        ]
      }
    ]
  };

  const careerKey = career.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z-]/g, '');
  const template = roadmapTemplates[careerKey] || roadmapTemplates['default'];

  // Customize the template based on career-specific requirements
  return template.map(step => ({
    ...step,
    resources: step.resources.map(resource => ({
      ...resource,
      rating: Math.random() * 0.5 + 4.5 // Random rating between 4.5-5.0
    }))
  }));
};