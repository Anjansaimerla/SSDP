import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Import images
import imgKomoriGL37 from '../assets/machinery/komori-gl37.jpeg';
import imgKonicaMinolta from '../assets/machinery/konica-minolta.jpg';
import imgSingleColour from '../assets/machinery/single-colour.jpeg';
import imgCTCP from '../assets/machinery/ctcp.jpeg';
import imgBinding from '../assets/machinery/binding-machine.png';
import imgWebOffset from '../assets/machinery/web-offset.jpg';
import imgCutting from '../assets/machinery/cutting-machine.jpeg';
import imgKomoriEnthrone from '../assets/machinery/komori-enthrone.jpg';

const heroImages = [
    imgKomoriGL37, imgKonicaMinolta, imgSingleColour, imgCTCP,
    imgBinding, imgWebOffset, imgCutting, imgKomoriEnthrone,
    imgKomoriGL37, imgKonicaMinolta, imgSingleColour, imgCTCP // Duplicates for smoother loop if needed
];

const Column = ({ images, y, duration = 20 }) => {
    return (
        <motion.div
            className="flex flex-col gap-4 w-full"
            style={{ y }}
            animate={{ y: ["0%", "-50%"] }}
            transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: duration,
                ease: "linear"
            }}
        >
            {images.concat(images).map((src, i) => (
                <div key={i} className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden opacity-60 hover:opacity-80 transition-opacity">
                    <img src={src} alt="machinery" className="w-full h-full object-cover" />
                </div>
            ))}
        </motion.div>
    );
};

const Hero = () => {
    // Split images into columns
    const col1 = heroImages.slice(0, 4);
    const col2 = heroImages.slice(4, 8);
    const col3 = heroImages.slice(0, 4).reverse();
    const col4 = heroImages.slice(4, 8).reverse();

    return (
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-primary-color text-white rounded-b-[48px] md:rounded-b-[80px] border-b border-white/10">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0 flex gap-4 p-4 -rotate-6 scale-110 opacity-60 pointer-events-none">
                <Column images={col1} duration={45} />
                <Column images={col2} duration={55} />
                <Column images={col3} duration={40} />
                <Column images={col4} duration={60} />
            </div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

            <div className="container mx-auto px-4 z-20 text-center relative mt-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block mb-6 px-6 py-2 rounded-full border border-accent-color/30 bg-accent-color/10 text-accent-color text-sm font-medium tracking-wider"
                >
                    PREMIER PRINTING SOLUTIONS
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium mb-8 leading-tight tracking-tight text-white drop-shadow-2xl"
                >
                    Precision in <br className="hidden md:block" />
                    <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-accent-color to-accent-2">Every Print.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="text-lg md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md"
                >
                    Sri Satyadeva Printing Cluster Association brings together artistry and technology to deliver excellence.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col md:flex-row gap-4 justify-center items-center"
                >
                    <button
                        onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-10 py-5 bg-accent-color text-white text-lg font-bold rounded-full hover:bg-sky-600 transition-all hover:scale-105 shadow-[0_0_20px_rgba(0,147,211,0.5)] z-20 relative"
                    >
                        Explore Services
                    </button>

                    <button
                        onClick={() => document.getElementById('machinery')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-10 py-5 bg-black/40 border border-white/20 text-white text-lg font-medium rounded-full hover:bg-white/10 hover:border-accent-2 transition-all backdrop-blur-sm z-20 relative"
                    >
                        View Machinery
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
