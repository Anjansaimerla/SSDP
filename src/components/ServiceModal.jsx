import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';

const ServiceModal = ({ isOpen, onClose, service }) => {
    if (!service) return null;

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
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
                    >
                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-card-bg border border-white/10 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative"
                        >
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors z-10"
                                aria-label="Close"
                            >
                                <X size={24} className="text-gray-400 hover:text-white" />
                            </button>

                            <div className="p-8">
                                <div className="w-16 h-16 rounded-2xl bg-accent-color/10 text-accent-color flex items-center justify-center mb-6">
                                    {service.icon}
                                </div>

                                <h2 className="text-3xl font-serif font-medium text-white mb-4">
                                    {service.title}
                                </h2>

                                <p className="text-gray-300 leading-relaxed mb-6">
                                    {service.details}
                                </p>

                                <div className="space-y-3">
                                    <h4 className="text-sm font-bold text-accent-color uppercase tracking-wider mb-2">Key Features</h4>
                                    {service.features && service.features.map((feature, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <CheckCircle size={18} className="text-accent-3 mt-0.5 shrink-0" />
                                            <span className="text-gray-400 text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                                    <button
                                        onClick={onClose}
                                        className="px-6 py-2 bg-accent-color text-white rounded-lg hover:bg-accent-color/90 transition-colors text-sm font-medium"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ServiceModal;
