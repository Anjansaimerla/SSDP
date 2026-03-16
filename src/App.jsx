import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Machinery from './components/Machinery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AboutModal from './components/AboutModal';
import Chatbot from './components/Chatbot';

function App() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <div className="relative">
      <Header onOpenAbout={() => setIsAboutOpen(true)} />

      <main>
        <Hero />
        <Services />
        <Machinery />
        <Contact onOpenAbout={() => setIsAboutOpen(true)} />
      </main>

      <Footer />
      <Chatbot />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </div>
  );
}

export default App;
