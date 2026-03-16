import React from 'react';

const Footer = () => {
    return (
        <footer className="text-gray-500 py-12 border-t border-white/5 bg-primary-color">
            <div className="container mx-auto px-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-full bg-white text-primary-color flex items-center justify-center font-serif font-bold">
                        S
                    </div>
                    <span className="font-serif font-bold text-white text-xl">SRI SATYADEVA</span>
                </div>

                <div className="flex justify-center gap-8 mb-8 text-sm font-medium">
                    <a href="#home" className="hover:text-accent-color transition-colors">Home</a>
                    <a href="#services" className="hover:text-accent-color transition-colors">Services</a>
                    <a href="#machinery" className="hover:text-accent-color transition-colors">Machinery</a>
                    <a href="#contact" className="hover:text-accent-color transition-colors">Contact</a>
                </div>

                <p className="text-sm opacity-60">
                    &copy; {new Date().getFullYear()} SRI SATYADEVA PRINTING CLUSTER ASSOCIATION. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
