import React from 'react';
import { motion } from 'framer-motion';

// Import images
import imgKomoriGL37 from '../assets/machinery/komori-gl37.jpeg';
import imgKonicaMinolta from '../assets/machinery/konica-minolta.jpg';
import imgSingleColour from '../assets/machinery/single-colour.jpeg';
import imgCTCP from '../assets/machinery/ctcp.jpeg';
import imgBinding from '../assets/machinery/binding-machine.png';
import imgWebOffset from '../assets/machinery/web-offset.jpg';
import imgCutting from '../assets/machinery/cutting-machine.jpeg';
import imgKomoriEnthrone from '../assets/machinery/komori-enthrone.jpg';

const machines = [
    {
        id: 1,
        name: "Komori GL37",
        type: "Offset",
        image: imgKomoriGL37,
        description: "High-performance offset press for precision printing."
    },
    {
        id: 2,
        name: "Konica Minolta",
        type: "Digital",
        image: imgKonicaMinolta,
        description: "Advanced digital printing solution for versatile needs."
    },
    {
        id: 3,
        name: "Single Colour Printing Machine",
        type: "Offset",
        image: imgSingleColour,
        description: "Reliable single-color offset printing."
    },
    {
        id: 4,
        name: "CTCP",
        type: "Pre-press",
        image: imgCTCP,
        description: "Computer to Conventional Plate technology."
    },
    {
        id: 5,
        name: "6 Clamp Binding Machine",
        type: "Binding",
        image: imgBinding,
        description: "Efficient perfect binding for books and catalogs."
    },
    {
        id: 6,
        name: "Web Offset",
        type: "Offset",
        image: imgWebOffset,
        description: "High-speed web offset for large volume publications."
    },
    {
        id: 7,
        name: "Cutting Machine",
        type: "Finishing",
        image: imgCutting,
        description: "Precision cutting for perfect finish."
    },
    {
        id: 8,
        name: "Komori Enthrone 4 Colour",
        type: "Offset",
        image: imgKomoriEnthrone,
        description: "Compact 4-color press for high quality output."
    }
];

const Machinery = () => {
    return (
        <section id="machinery" className="py-24 bg-card-bg rounded-t-[48px] md:rounded-t-[80px] -mt-12 relative z-10 border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-serif text-white mt-3 leading-tight"
                        >
                            World-Class Machinery <br /> for World-Class Results
                        </motion.h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {machines.map((machine, index) => (
                        <motion.div
                            key={machine.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group cursor-pointer"
                        >
                            {/* Image Container with Soft Rounded Corners */}
                            <div className="relative aspect-square rounded-[32px] overflow-hidden mb-4 shadow-lg border border-white/5 group-hover:border-accent-color/50 transition-all duration-500">
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors z-10" />
                                <motion.img
                                    src={machine.image}
                                    alt={machine.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-accent-3 tracking-wide z-20 border border-white/10 uppercase">
                                    {machine.type}
                                </div>
                            </div>

                            <div className="px-1">
                                <h3 className="text-xl font-serif text-white mb-1 group-hover:text-accent-color transition-colors line-clamp-1">
                                    {machine.name}
                                </h3>
                                <p className="text-gray-400 text-sm font-light line-clamp-2">
                                    {machine.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Machinery;
