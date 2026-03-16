import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ onOpenAbout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['home', 'services', 'machinery', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -100 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'machinery', label: 'Machinery' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center pt-6 px-4 pointer-events-none">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`pointer-events-auto flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 ${isScrolled
            ? 'bg-black/80 backdrop-blur-md shadow-lg border border-white/10 w-full max-w-5xl'
            : 'bg-black/40 backdrop-blur-sm border border-white/10 w-full max-w-6xl'
          }`}
      >
        {/* Logo & Name */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAbout}
            className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold text-xl transition-colors bg-white text-primary-color hover:bg-accent-color hover:text-white"
            aria-label="About Company"
          >
            S
          </button>

          <span
            onClick={() => scrollToSection('home')}
            className="font-serif font-bold text-sm md:text-lg cursor-pointer tracking-tight hidden md:block text-white hover:text-accent-color transition-colors"
          >
            SRI SATYADEVA PRINTING CLUSTER ASSOCIATION
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`text-sm font-medium transition-colors relative px-3 py-1 rounded-full
                ${activeSection === link.id
                  ? 'bg-white/20 text-accent-color'
                  : 'text-gray-300 hover:text-white'
                }
              `}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('contact')}
            className="text-sm font-bold px-5 py-2 rounded-full transition-transform hover:scale-105 active:scale-95 bg-accent-color text-white hover:bg-accent-2"
          >
            Get In Touch
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 rounded-full text-white hover:bg-white/10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="absolute top-24 left-4 right-4 bg-gray-900 rounded-3xl shadow-xl overflow-hidden p-4 pointer-events-auto border border-white/10 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-left font-semibold p-3 rounded-xl transition-colors ${activeSection === link.id ? 'bg-white/10 text-accent-color' : 'text-gray-300 hover:bg-white/5'
                    }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="mt-2 w-full bg-accent-color text-white font-bold p-3 rounded-xl hover:bg-accent-2 transition-colors"
              >
                Get In Touch
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
