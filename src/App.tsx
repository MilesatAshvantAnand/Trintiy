import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/Layout';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';
import { Subjects } from './components/Subjects';
import { Pathways } from './components/Pathways';
import { Planner } from './components/Planner';
import { EventReflectionView } from './components/Reflection';
import { Jobs } from './components/Jobs';
import { Grades } from './components/Grades';
import './index.css';

type Page = 'dashboard' | 'subjects' | 'pathways' | 'jobs' | 'grades' | 'planner' | 'reflection';

function AppContent() {
  const { state } = useApp();
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [showOnboarding, setShowOnboarding] = useState(true);

  // Check if user has completed onboarding
  const user = state.user;
  const needsOnboarding = !user || !user.onboardingComplete;

  if (needsOnboarding && showOnboarding) {
    return <Onboarding onComplete={() => setShowOnboarding(false)} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'subjects':
        return <Subjects />;
      case 'pathways':
        return <Pathways />;
      case 'jobs':
        return <Jobs />;
      case 'grades':
        return <Grades />;
      case 'planner':
        return <Planner />;
      case 'reflection':
        return <EventReflectionView />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
