import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Phone, Mail } from 'lucide-react';

const AboutModal = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
                    >
                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()} // Prevent close on modal click
                            className="bg-gray-900 border border-white/10 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative"
                        >
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
                                aria-label="Close"
                            >
                                <X size={24} className="text-gray-400" />
                            </button>

                            <div className="p-8 md:p-12">
                                <h2 className="text-3xl font-bold text-white mb-6">About Us</h2>

                                <div className="space-y-6 text-gray-300">
                                    <p className="leading-relaxed">
                                        Welcome to <span className="font-semibold text-accent-color">SRI SATYADEVA PRINTING CLUSTER ASSOCIATION</span>.
                                        We are a premier collective dedicated to providing top-tier printing solutions.
                                        With state-of-the-art machinery and a commitment to excellence, we serve a diverse range of
                                        printing needs, ensuring quality, precision, and timeliness in every project.
                                    </p>

                                    <p className="leading-relaxed">
                                        Our cluster brings together the best in the industry to offer comprehensive services utilizing
                                        advanced technology. From commercial printing to specialized packaging, we are your trusted partner in print.
                                    </p>
                                </div>

                                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-white/10">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-accent-color/10 rounded-lg text-accent-color">
                                            <Phone size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white">Contact</h3>
                                            <p className="text-sm text-gray-400">+91 94404 94160</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-accent-color/10 rounded-lg text-accent-color">
                                            <Mail size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white">Email</h3>
                                            <p className="text-sm text-gray-400">ssd.cluster@gmail.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 md:col-span-2">
                                        <div className="p-2 bg-accent-color/10 rounded-lg text-accent-color">
                                            <MapPin size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white">Factory Address</h3>
                                            <p className="text-sm text-gray-400">
                                                APIIC, Ramanayyapeta Industrial Area,<br />
                                                Plot no. 193, 197, KAKINADA-1,<br />
                                                Kakinada Dist, Andhra Pradesh, INDIA
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AboutModal;
