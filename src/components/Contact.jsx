import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { submitToGoogleSheets } from '../services/googleSheets';

const Contact = ({ onOpenAbout }) => {
    const [formData, setFormData] = useState({
        name: '',
        countryCode: '+91',
        mobile: '',
        email: '',
        address: '',
        message: ''
    });
    const [status, setStatus] = useState('idle');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            await submitToGoogleSheets({
                type: 'contact',
                name: formData.name,
                mobile: `${formData.countryCode} ${formData.mobile}`,
                email: formData.email,
                address: formData.address,
                message: formData.message
            });

            setStatus('success');
            setFormData({
                name: '',
                countryCode: '+91',
                mobile: '',
                email: '',
                address: '',
                message: ''
            });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <section id="contact" className="py-24 bg-card-bg text-white relative overflow-hidden rounded-[48px] md:rounded-[80px] my-12 mx-4 md:mx-8 border border-white/5">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-color/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-accent-3 font-bold tracking-wider text-sm uppercase">Contact Us</span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-serif mt-3 mb-6"
                    >
                        Let's Print Something <span className="italic text-accent-color">Amazing.</span>
                    </motion.h2>
                    <p className="mt-4 text-gray-400 max-w-xl mx-auto text-lg">
                        Reach out for quotes, collaborations, or just to say hello.
                    </p>
                    <button
                        onClick={onOpenAbout}
                        className="mt-4 text-accent-color text-sm font-medium hover:text-white transition-colors underline underline-offset-4"
                    >
                        View Contact Details & Address
                    </button>
                </div>

                <div className="max-w-4xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-6 py-4 rounded-full bg-black/30 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:bg-black/50 focus:border-accent-color transition-all"
                                    placeholder="Full Name"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex">
                                    <select
                                        name="countryCode"
                                        value={formData.countryCode}
                                        onChange={handleChange}
                                        className="px-4 py-4 rounded-l-full bg-black/30 border-r border-white/10 text-gray-400 focus:outline-none focus:bg-black/50 transition-all appearance-none cursor-pointer text-center min-w-[80px]"
                                    >
                                        <option value="+91">+91 (IN)</option>
                                        <option value="+1">+1 (US/CA)</option>
                                        <option value="+44">+44 (UK)</option>
                                        <option value="+971">+971 (UAE)</option>
                                        <option value="+61">+61 (AU)</option>
                                        <option value="+65">+65 (SG)</option>
                                        <option value="+49">+49 (DE)</option>
                                        <option value="+33">+33 (FR)</option>
                                    </select>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        required
                                        pattern="[0-9]{10}"
                                        className="w-full px-6 py-4 rounded-r-full bg-black/30 border-l-0 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:bg-black/50 focus:border-accent-color transition-all"
                                        placeholder="Mobile Number"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-6 py-4 rounded-full bg-black/30 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:bg-black/50 focus:border-accent-color transition-all"
                                    placeholder="Email Address"
                                />
                            </div>
                            <div className="space-y-2">
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 rounded-full bg-black/30 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:bg-black/50 focus:border-accent-color transition-all"
                                    placeholder="Delivery Location"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="w-full px-6 py-4 rounded-[32px] bg-black/30 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:bg-black/50 focus:border-accent-color transition-all resize-none"
                                placeholder="Tell us about your project requirements..."
                            />
                        </div>

                        <div className="text-center pt-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={status === 'submitting' || status === 'success'}
                                className={`px-12 py-4 rounded-full font-bold text-lg inline-flex items-center gap-2 shadow-lg hover:shadow-accent-color/20 transition-all
                  ${status === 'success' ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-accent-color to-accent-2 text-white'}
                  disabled:opacity-70 disabled:cursor-not-allowed
                `}
                            >
                                {status === 'idle' && (
                                    <>
                                        Send Request <Send size={20} />
                                    </>
                                )}
                                {status === 'submitting' && 'Sending...'}
                                {status === 'success' && (
                                    <>
                                        Sent Successfully <CheckCircle size={20} />
                                    </>
                                )}
                            </motion.button>
                        </div>

                        {status === 'error' && (
                            <div className="flex items-center gap-2 text-red-300 text-sm justify-center mt-2">
                                <AlertCircle size={16} /> Something went wrong. Please try again.
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
