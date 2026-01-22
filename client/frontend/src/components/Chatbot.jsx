import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader, Minimize2, ShoppingBag } from 'lucide-react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'model', text: 'Hello! Namaste! 🙏\nPlease select your language to continue' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const languages = [
        { id: 'en', label: 'English' },
        { id: 'hi', label: 'Hindi' },
        { id: 'kn', label: 'Kannada' },
        { id: 'hin', label: 'Hinglish' }
    ];

    const handleLanguageSelect = (lang) => {
        setSelectedLanguage(lang);
        const langMap = {
            'en': 'English',
            'hi': 'Hindi',
            'kn': 'Kannada',
            'hin': 'Hinglish'
        };
        const userMsg = { role: 'user', text: `${langMap[lang.id]} Selected` };
        setMessages(prev => [...prev, userMsg]);

        // Simulate bot response acknowledging language
        setTimeout(() => {
            const welcomeMsg = {
                role: 'model',
                text: `Great! I will now converse in ${langMap[lang.id]}.\nHow can I help you with our products today?`
            };
            setMessages(prev => [...prev, welcomeMsg]);
        }, 600);
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setIsLoading(true);

        try {
            // Prepare history for context (optional, but good for flow)
            const history = messages.map(m => ({
                role: m.role === 'user' ? 'user' : 'model',
                parts: [{ text: m.text }]
            }));

            const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/chat` : '/chat';
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: userMessage,
                    history: history
                })
            });

            const data = await response.json();

            if (data.reply) {
                setMessages(prev => [...prev, { role: 'model', text: data.reply }]);
            } else {
                setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error. Please try again." }]);
            }

        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, { role: 'model', text: "Network error. Please make sure the server is running." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
            {/* Toggle Button */}
            {!isOpen && (
                <button
                    onClick={toggleChat}
                    className="!bg-red-500 hover:!bg-red-700 text-white !p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center group"
                >
                    <MessageSquare size={28} />
                    <span className="absolute right-full !mr-3 bg-gray-800 text-white text-xs !px-2 !py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Chat with AI
                    </span>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="bg-white rounded-2xl shadow-2xl w-[350px] sm:w-[380px] h-[500px] flex flex-col overflow-hidden border border-gray-100 animate-slide-up">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-300 to-blue-600 !p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-2">
                            <div className="bg-white/20 !p-2 rounded-full">
                                <ShoppingBag size={18} />
                            </div>
                            <div>
                                <h3 className="font-bold text-base tracking-wide">Shopping Assistant</h3>
                                <p className="text-xs text-indigo-100 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                    Online
                                </p>
                            </div>
                        </div>
                        <button onClick={toggleChat} className="hover:bg-white/10 p-1.5 rounded-full transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto !p-4 !bg-gray-50/50 !space-y-4">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] !p-3 !rounded-2xl !text-sm !leading-relaxed !shadow-sm whitespace-pre-line ${msg.role === 'user'
                                        ? 'bg-indigo-600 text-white rounded-br-none'
                                        : 'bg-white text-gray-700 border border-gray-200 rounded-bl-none'
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {/* Language Selection Buttons */}
                        {!selectedLanguage && (
                            <div className="grid grid-cols-2 gap-2 !mt-4 !animate-fade-in">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.id}
                                        onClick={() => handleLanguageSelect(lang)}
                                        className="!p-2 !text-sm !bg-white !border !border-indigo-100 !text-indigo-600 !rounded-xl hover:bg-indigo-50 hover:border-indigo-200 transition-all font-medium shadow-sm hover:shadow-md"
                                    >
                                        {lang.label}
                                    </button>
                                ))}
                            </div>
                        )}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white !p-3 !rounded-2xl !rounded-bl-none !shadow-sm !border !border-gray-200">
                                    <div className="flex gap-1.5">
                                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area (Disabled until language selected) */}
                    <div className={`!p-4 !bg-white !border-t !border-gray-100 ${!selectedLanguage ? 'opacity-50 pointer-events-none blur-[1px]' : ''}`}>
                        <div className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder={selectedLanguage ? "Ask about products..." : "Select language first..."}
                                className="w-full !pl-4 !pr-12 !py-3 !bg-gray-50 !border !border-gray-200 !rounded-xl !focus:outline-none !focus:ring-2 !focus:ring-indigo-500/50 !focus:border-indigo-500 !text-sm !transition-all"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="absolute right-2 top-1/2 -translate-y-1/2 !p-2 !bg-indigo-600 !text-white !rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                        <p className="text-[10px] text-center text-gray-400 mt-2">
                            Powered by Groq AI • Information from database
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
