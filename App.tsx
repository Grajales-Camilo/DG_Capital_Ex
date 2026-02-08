import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import FloatingControls from './components/FloatingControls';
import TrainingSection from './components/TrainingSection';
import BooksSection from './components/BooksSection';

import CommunitySection from './components/CommunitySection';
import InvestmentSection from './components/InvestmentSection';
import AuthSection from './components/AuthSection';
import Dashboard from './components/Dashboard';
import { supabase } from './src/lib/supabase';
import { useEffect } from 'react';

const App: React.FC = () => {
  // Use state with explicit type declaration, defaulting to 'home'
  const [currentPage, setCurrentPage] = useState<'home' | 'training' | 'books' | 'community' | 'investment' | 'auth' | 'dashboard'>('home');
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check active session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setCurrentPage('dashboard');
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setCurrentPage('dashboard');
      } else if (currentPage === 'dashboard') {
        setCurrentPage('home'); // Redirect to home on logout if on dashboard
      }
    });

    return () => subscription.unsubscribe();
  }, [currentPage]);

  // When leaving dashboard, force dark mode back? 
  // For now, we'll just pass the state. 
  // If the user sets light mode in dashboard, and goes to home, 
  // home is dark-only, so navbar should probably be white-text (mode=dark) 
  // to be visible against dark bg.

  // Logic: If NOT on dashboard, Navbar should operate in "dark mode" context 
  // because the rest of the site is dark.
  const navbarDarkMode = currentPage === 'dashboard' ? isDarkMode : true;

  return (
    <div className="relative min-h-screen bg-background-dark text-slate-100 selection:bg-primary selection:text-black">
      <Navbar onNavigate={setCurrentPage} isDarkMode={navbarDarkMode} />
      <main>
        {currentPage === 'home' && (
          <>
            <Hero onNavigate={setCurrentPage} />
            <Features onNavigate={setCurrentPage} />
          </>
        )}
        {currentPage === 'training' && <TrainingSection />}
        {currentPage === 'books' && <BooksSection />}
        {currentPage === 'community' && <CommunitySection />}
        {currentPage === 'investment' && <InvestmentSection onNavigate={setCurrentPage} />}
        {currentPage === 'auth' && <AuthSection />}
        {currentPage === 'dashboard' && (
          <Dashboard
            isDarkMode={isDarkMode}
            toggleTheme={() => setIsDarkMode(!isDarkMode)}
          />
        )}
      </main>
      <Footer onNavigate={setCurrentPage} />
      <FloatingControls />
    </div>
  );
};

export default App;