import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Printer, PenTool, Scissors, Zap, Package } from 'lucide-react';
import ServiceModal from './ServiceModal';

const servicesInit = [
    {
        icon: <Layers size={32} />,
        title: "Offset Printing",
        description: "High-volume commercial printing for magazines, brochures, and books with superior quality.",
        details: "Our offset printing services are designed for high-volume projects where quality and consistency are paramount. Utilizing state-of-the-art machinery, we deliver sharp, clean, and professional results for magazines, books, brochures, and catalogs. This method is cost-effective for large runs and supports a wide variety of paper types and finishes.",
        features: [
            "Cost-effective for large quantities",
            "Superior image quality and color fidelity",
            "Supports a wide range of paper stocks and finishes",
            "Consistent high-quality output"
        ]
    },
    {
        icon: <Printer size={32} />,
        title: "Digital Printing",
        description: "Fast turnaround times for short-run projects, ensuring crisp and vibrant prints.",
        details: "Perfect for short-run jobs and tight deadlines, our digital printing service offers flexibility without compromising on quality. Whether you need business cards, flyers, or personalized marketing materials, we ensure vibrant colors and crisp text. Digital printing allows for variable data printing, making it ideal for customized campaigns.",
        features: [
            "Fast turnaround times",
            "Cost-effective for short runs",
            "Variable data capability for personalization",
            "High-quality vibrant prints"
        ]
    },
    {
        icon: <Package size={32} />,
        title: "Packaging",
        description: "Custom packaging designs and production for products that need to stand out.",
        details: "We create custom packaging solutions that not only protect your products but also enhance their shelf appeal. From folding cartons to rigid boxes, our packaging services cover design, rapid prototyping, and production. We use high-quality materials and innovative structural designs to make your brand stand out.",
        features: [
            "Custom structural design",
            "High-quality materials and finishes",
            "Prototyping and sampling",
            "Brand-enhancing aesthetics"
        ]
    },
    {
        icon: <Zap size={32} />,
        title: "Large Format",
        description: "Banners, posters, and signage that capture attention from a distance.",
        details: "Make a big impact with our large format printing services. We produce high-resolution banners, posters, signage, and trade show displays that grab attention. Our equipment handles a variety of substrates including vinyl, canvas, and rigid boards, ensuring durability for both indoor and outdoor use.",
        features: [
            "High-resolution large scale prints",
            "Durable materials for indoor/outdoor use",
            "Wide variety of substrates",
            "Eye-catching displays and signage"
        ]
    },
    {
        icon: <PenTool size={32} />,
        title: "Graphic Design",
        description: "Creative design services to bring your ideas to life before they hit the press.",
        details: "Our talented team of graphic designers works closely with you to bring your vision to life. Whether you need a new logo, a complete brand identity, or layout design for your print materials, we provide creative solutions that communicate your message effectively. We ensure all designs are optimized for print production.",
        features: [
            "Logo and brand identity design",
            "Print layout and typesetting",
            "Creative consultation",
            "Print-ready file preparation"
        ]
    },
    {
        icon: <Scissors size={32} />,
        title: "Finishing",
        description: "Cutting, binding, laminating, and folding to add the perfect final touch.",
        details: "The finishing touch is what sets professional print work apart. Our comprehensive finishing services include precision cutting, various binding methods (saddle stitch, perfect bind, etc.), laminating, foiling, embossing, and folding. We ensure your project looks polished and professional down to the last detail.",
        features: [
            "Precision cutting and trimming",
            "Multiple binding options",
            "Laminating, foiling, and embossing",
            "Folding and scoring"
        ]
    }
];

const Services = () => {
    const [selectedService, setSelectedService] = useState(null);

    return (
        <section id="services" className="py-24 bg-background-color relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-accent-color font-bold tracking-wider text-sm uppercase">Our Expertise</span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-serif text-white mt-3 mb-6"
                    >
                        Crafted for Perfection
                    </motion.h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        We combine traditional craftsmanship with modern technology to provide a comprehensive range of printing services.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {servicesInit.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            whileHover={{ y: -8 }}
                            className="group bg-card-bg p-8 rounded-[32px] hover:shadow-2xl hover:shadow-accent-color/10 transition-all duration-300 border border-white/5 hover:border-accent-color/30 flex flex-col h-full"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-accent-color/10 text-accent-color flex items-center justify-center mb-6 group-hover:bg-accent-color group-hover:text-white transition-colors duration-300">
                                {service.icon}
                            </div>

                            <h3 className="text-2xl font-serif font-medium text-white mb-3 group-hover:text-accent-color transition-colors">
                                {service.title}
                            </h3>

                            <p className="text-gray-400 leading-normal mb-8 flex-grow">
                                {service.description}
                            </p>

                            <div className="mt-auto">
                                <button
                                    onClick={() => setSelectedService(service)}
                                    className="text-sm font-bold text-accent-3 border-b border-accent-3/20 pb-0.5 group-hover:border-accent-3 transition-colors hover:text-white cursor-pointer"
                                >
                                    Learn More
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <ServiceModal
                isOpen={!!selectedService}
                onClose={() => setSelectedService(null)}
                service={selectedService}
            />
        </section>
    );
};

export default Services;
