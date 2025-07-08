import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Login from './components/Login';
import Signup from './components/Signup';
import Assessment from './components/Assessment';
import Results from './components/Results';
import CareerRoadmap from './components/CareerRoadmap';
import Resources from './components/Resources';
import { AssessmentData, CareerMatch } from './types';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'login' | 'signup' | 'assessment' | 'results' | 'roadmap' | 'resources'>('home');
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);
  const [careerMatches, setCareerMatches] = useState<CareerMatch[]>([]);
  const [selectedCareer, setSelectedCareer] = useState<CareerMatch | null>(null);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const handleAssessmentComplete = (data: AssessmentData, matches: CareerMatch[]) => {
    setAssessmentData(data);
    setCareerMatches(matches);
    setCurrentView('results');
  };

  const handleCareerSelect = (career: CareerMatch) => {
    setSelectedCareer(career);
    setCurrentView('roadmap');
  };

  const handleLogin = (email: string, password: string) => {
    // Simulate login - in real app, this would call an API
    setUser({ name: 'John Doe', email });
    setCurrentView('home');
  };

  const handleSignup = (userData: { name: string; email: string; password: string }) => {
    // Simulate signup - in real app, this would call an API
    setUser({ name: userData.name, email: userData.email });
    setCurrentView('home');
  };

  const handleLogout = () => {
    setUser(null);
    setAssessmentData(null);
    setCareerMatches([]);
    setSelectedCareer(null);
    setCurrentView('home');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'login':
        return (
          <Login
            onBack={() => setCurrentView('home')}
            onLogin={handleLogin}
            onSwitchToSignup={() => setCurrentView('signup')}
          />
        );
      case 'signup':
        return (
          <Signup
            onBack={() => setCurrentView('home')}
            onSignup={handleSignup}
            onSwitchToLogin={() => setCurrentView('login')}
          />
        );
      case 'assessment':
        return <Assessment onComplete={handleAssessmentComplete} />;
      case 'results':
        return (
          <Results
            assessmentData={assessmentData}
            careerMatches={careerMatches}
            onCareerSelect={handleCareerSelect}
            onBackToHome={() => setCurrentView('home')}
          />
        );
      case 'roadmap':
        return (
          <CareerRoadmap
            career={selectedCareer}
            onBack={() => setCurrentView('results')}
          />
        );
      case 'resources':
        return <Resources onBack={() => setCurrentView('home')} />;
      default:
        return (
          <Hero
            onStartAssessment={() => setCurrentView('assessment')}
            onLogin={() => setCurrentView('login')}
            onSignup={() => setCurrentView('signup')}
            user={user}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header
        currentView={currentView}
        onNavigate={setCurrentView}
        hasAssessmentData={!!assessmentData}
        user={user}
        onLogin={() => setCurrentView('login')}
        onLogout={handleLogout}
      />
      <main className="pt-16">
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;