
import React, { useState } from 'react';
import Header from './components/Header';
import DailyMissions from './components/DailyMissions';
import GoalWidget from './components/GoalWidget';
import GamificationPanel from './components/GamificationPanel';
import ReviewPanel from './components/ReviewPanel';
import ActivityTimeline from './components/ActivityTimeline';
import QuickActions from './components/QuickActions';
import Sidebar from './components/Sidebar';
import SkillTreePage from './components/SkillTreePage';
import DojoPage from './components/DojoPage';
import PlannerPage from './components/PlannerPage';
import ReviewPage from './components/ReviewPage';
import LibraryPage from './components/LibraryPage';
import CommunityPage from './components/CommunityPage';
import { PageView } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('DASHBOARD');

  const renderContent = () => {
    switch (currentPage) {
      case 'SKILL_TREE':
        return <SkillTreePage onNavigate={setCurrentPage} />;
      
      case 'DOJO':
        return <DojoPage onNavigate={setCurrentPage} />;

      case 'PLANNER':
        return <PlannerPage onNavigate={setCurrentPage} />;

      case 'REVIEW':
        return <ReviewPage onNavigate={setCurrentPage} />;
      
      case 'LIBRARY':
        return <LibraryPage onNavigate={setCurrentPage} />;

      case 'COMMUNITY':
        return <CommunityPage onNavigate={setCurrentPage} />;
      
      case 'DASHBOARD':
      default:
        return (
          <>
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 pb-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Row 1: Main Missions Area & Goal Widget */}
                <section className="lg:col-span-8 flex flex-col h-full">
                   <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
                      <DailyMissions onNavigate={setCurrentPage} />
                   </div>
                </section>
      
                <section className="lg:col-span-4 h-full">
                   <GoalWidget />
                </section>
      
                {/* Row 2: Gamification & Reviews */}
                <section className="lg:col-span-5 h-full">
                   <GamificationPanel />
                </section>
      
                <section className="lg:col-span-7 h-full">
                   <ReviewPanel />
                </section>
      
                {/* Row 3: Timeline & Actions */}
                <section className="lg:col-span-8 h-full">
                  <ActivityTimeline />
                </section>
      
                <section className="lg:col-span-4 h-full">
                  <QuickActions />
                </section>
                
              </div>
      
              {/* Footer info */}
              <div className="mt-12 text-center text-gray-400 text-xs">
                 <p>© 2024 DevPath. Sigue construyendo tu futuro.</p>
              </div>
            </main>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 font-sans flex">
      {/* Fixed Sidebar */}
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* Main Content Area */}
      <div className="flex-1 ml-20 lg:ml-64 relative transition-all duration-300">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
