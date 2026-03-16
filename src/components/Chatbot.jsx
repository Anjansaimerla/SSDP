import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Phone, MapPin, MoreHorizontal, User, Smartphone } from 'lucide-react';
import { submitToGoogleSheets } from '../services/googleSheets';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! Welcome to Sri Satyadeva Printing Cluster. How can I assist you today?", sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    // Conversation State Machine: 'IDLE', 'ASKING_NAME', 'ASKING_PHONE', 'CONFIRMING_CALL'
    const [conversationState, setConversationState] = useState('IDLE');
    const [userData, setUserData] = useState({ name: '', phone: '' });

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, isTyping]);

    const determineIntent = (input) => {
        const lowerInput = input.toLowerCase();

        if (lowerInput.includes("call") || lowerInput.includes("arrange") || lowerInput.includes("speak") || lowerInput.includes("contact")) return 'ARRANGE_CALL';
        if (lowerInput.includes("service") || lowerInput.includes("product") || lowerInput.includes("do you") || lowerInput.includes("offer")) return 'SERVICES';
        if (lowerInput.includes("location") || lowerInput.includes("address") || lowerInput.includes("where")) return 'LOCATION';
        if (lowerInput.includes("about") || lowerInput.includes("who are you") || lowerInput.includes("company")) return 'ABOUT';
        if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) return 'GREETING';
        if (lowerInput.includes("price") || lowerInput.includes("quote") || lowerInput.includes("cost")) return 'QUOTE';

        return 'UNKNOWN';
    };

    const processMessage = async (userText) => {
        setIsTyping(true);

        // Simulate "thinking" delay
        const thinkingTime = Math.random() * 1000 + 800; // 0.8s - 1.8s

        setTimeout(() => {
            let botResponse = "";
            let nextState = conversationState;

            // STATE MACHINE LOGIC
            if (conversationState === 'IDLE') {
                const intent = determineIntent(userText);

                switch (intent) {
                    case 'GREETING':
                        botResponse = "Hello there! I'm your virtual assistant. You can ask me about our services, location, or arrange a call with our team.";
                        break;
                    case 'SERVICES':
                        botResponse = "We specialize in high-quality Offset Printing, Digital Printing, Packaging, and Large Format printing. Would you like to know more about a specific service?";
                        break;
                    case 'LOCATION':
                        botResponse = "Our factory is located at APIIC, Ramanayyapeta Industrial Area, Kakinada, Andhra Pradesh. Would you like to visit us?";
                        break;
                    case 'ABOUT':
                        botResponse = "Sri Satyadeva Printing Cluster is a premier collective dedicated to top-tier printing solutions, combining artistry with advanced technology.";
                        break;
                    case 'QUOTE':
                        botResponse = "For a precise quote, it's best to discuss your project requirements directly. Would you like me to arrange a call for you?";
                        break;
                    case 'ARRANGE_CALL':
                        botResponse = "I can certainly help you arrange a call with our experts! First, may I know your name?";
                        nextState = 'ASKING_NAME';
                        break;
                    default:
                        botResponse = "I'm not entirely sure I understood that. I can tell you about our services, location, or help arrange a call. What would you prefer?";
                }
            }
            else if (conversationState === 'ASKING_NAME') {
                // Simple validation: Ensure it's not too short
                if (userText.length < 2) {
                    botResponse = "Could you please provide a valid name so we know who to address?";
                } else {
                    setUserData(prev => ({ ...prev, name: userText }));
                    botResponse = `Thanks, ${userText}! Now, could you please share your phone number so we can reach you?`;
                    nextState = 'ASKING_PHONE';
                }
            }
            else if (conversationState === 'ASKING_PHONE') {
                // Heuristic phone validation (looks for at least 7 digits)
                const phonePattern = /\d{7,}/;
                if (phonePattern.test(userText)) {
                    const updatedUserData = { ...userData, phone: userText };
                    setUserData(updatedUserData);

                    // Respond immediately
                    botResponse = "Perfect! I've forwarded your details to our team. They will contact you shortly to discuss your printing needs. Is there anything else I can help you with?";
                    nextState = 'IDLE';

                    // Submit to Google Sheets in background
                    submitToGoogleSheets({
                        type: 'chatbot',
                        name: updatedUserData.name,
                        mobile: updatedUserData.phone,
                        message: "Requested a call via Chatbot"
                    }).catch(err => console.error("Failed to save chatbot lead", err));

                } else {
                    botResponse = "That doesn't look like a valid phone number. Please enter a number we can reach you at (digits only preferred).";
                }
            }

            setConversationState(nextState);
            const botMessage = { id: Date.now() + 1, text: botResponse, sender: 'bot' };
            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);

        }, thinkingTime);
    };

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMessage = { id: Date.now(), text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInputValue("");

        processMessage(inputValue);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <>
            {/* Floating Action Button */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'} bg-accent-color text-white shadow-accent-color/30 hover:shadow-accent-color/50`}
            >
                <div className="relative">
                    <MessageSquare size={28} fill="currentColor" className="relative z-10" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                </div>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-6 right-6 z-50 w-[350px] md:w-[380px] h-[550px] bg-card-bg/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 bg-accent-color/10 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent-color to-accent-2 flex items-center justify-center text-white font-bold shadow-lg">
                                    AI
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm">Cluster Assistant</h3>
                                    <p className="text-accent-color text-xs flex items-center gap-1 font-medium">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Online
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-full transition-colors text-gray-400"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                            <div className="text-center text-xs text-gray-500 my-4">Today</div>

                            {messages.map((msg) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {msg.sender === 'bot' && (
                                        <div className="w-6 h-6 rounded-full bg-accent-color/20 flex items-center justify-center mt-1 mr-2 flex-shrink-0">
                                            <MessageSquare size={12} className="text-accent-color" />
                                        </div>
                                    )}
                                    <div
                                        className={`max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.sender === 'user'
                                            ? 'bg-accent-color text-white rounded-tr-none'
                                            : 'bg-white/5 text-gray-200 rounded-tl-none border border-white/5'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                    {msg.sender === 'user' && (
                                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mt-1 ml-2 flex-shrink-0">
                                            <User size={12} className="text-gray-300" />
                                        </div>
                                    )}
                                </motion.div>
                            ))}

                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="w-6 h-6 rounded-full bg-accent-color/20 flex items-center justify-center mt-1 mr-2 flex-shrink-0">
                                        <MessageSquare size={12} className="text-accent-color" />
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 flex gap-1.5 items-center h-10">
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-white/5 bg-black/20">
                            {conversationState !== 'IDLE' && (
                                <div className="mb-3 px-2">
                                    <span className="text-xs text-accent-color font-medium uppercase tracking-wider flex items-center gap-1">
                                        {conversationState === 'ASKING_NAME' && <><User size={12} /> Please enter your name</>}
                                        {conversationState === 'ASKING_PHONE' && <><Smartphone size={12} /> Please enter your mobile number</>}
                                    </span>
                                </div>
                            )}
                            <div className="flex gap-2 relative">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder={
                                        conversationState === 'ASKING_NAME' ? "Enter your name..." :
                                            conversationState === 'ASKING_PHONE' ? "Enter your phone number..." :
                                                "Type a message..."
                                    }
                                    className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm text-white focus:outline-none focus:border-accent-color/50 transition-colors placeholder-gray-500 shadow-inner"
                                    autoFocus
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleSend}
                                    disabled={!inputValue.trim()}
                                    className="p-3 bg-gradient-to-r from-accent-color to-accent-2 text-white rounded-full hover:shadow-lg hover:shadow-accent-color/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    <Send size={18} />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;
