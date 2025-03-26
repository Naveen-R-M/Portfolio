import React from 'react';
import { ProfileHeader } from './components/profile-header';
import { StoryHighlights } from './components/story-highlights';
import { PortfolioGrid } from './components/portfolio-grid';
import { ContactForm } from './components/contact-form';
import { Footer } from './components/footer';
import { ThemeSwitcher } from './components/theme-switcher';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <ThemeSwitcher />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <ProfileHeader />
        <StoryHighlights />
        <PortfolioGrid />
        <div id="contact" className="mt-12">
          <ContactForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
