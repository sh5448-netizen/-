import React, { useState, useEffect } from 'react';
import { PomeranianProfile, Screen } from './types';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import HealthCheck from './components/HealthCheck';
import Scanner from './components/Scanner';
import Community from './components/Community';
import Shop from './components/Shop';
import Header from './components/shared/Header';
import BottomNav from './components/shared/BottomNav';

const App: React.FC = () => {
  const [profile, setProfile] = useState<PomeranianProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeScreen, setActiveScreen] = useState<Screen>(Screen.Dashboard);

  useEffect(() => {
    // Simulate loading profile from storage
    try {
      const savedProfile = localStorage.getItem('pomeranianProfile');
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
    } catch (error) {
      console.error("Failed to parse profile from localStorage", error);
      localStorage.removeItem('pomeranianProfile');
    }
    setLoading(false);
  }, []);

  const handleProfileSave = (newProfile: PomeranianProfile) => {
    localStorage.setItem('pomeranianProfile', JSON.stringify(newProfile));
    setProfile(newProfile);
    setActiveScreen(Screen.Dashboard);
  };

  const renderScreen = () => {
    if (!profile) return null;
    switch (activeScreen) {
      case Screen.Dashboard:
        return <Dashboard profile={profile} />;
      case Screen.HealthCheck:
        return <HealthCheck profile={profile} />;
      case Screen.Scanner:
        return <Scanner profile={profile} />;
      case Screen.Community:
        return <Community />;
      case Screen.Shop:
        return <Shop />;
      default:
        return <Dashboard profile={profile} />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-stone-100">
        <div className="text-xl font-semibold">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-gray-800">
      <div className="container mx-auto max-w-lg min-h-screen flex flex-col shadow-lg bg-white">
        {!profile ? (
          <Onboarding onSave={handleProfileSave} />
        ) : (
          <>
            <Header dogName={profile.name} photo={profile.photo} />
            <main className="flex-grow p-4 overflow-y-auto pb-20 bg-stone-50">
              {renderScreen()}
            </main>
            <BottomNav activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;