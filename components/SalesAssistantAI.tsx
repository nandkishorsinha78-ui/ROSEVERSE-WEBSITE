'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, Headset, Volume2, VolumeX, X, Send, ShieldCheck, Award } from 'lucide-react';

interface SalesAssistantAIProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  onOpenConsultation: (tier?: string) => void;
  onOpenCatalog: () => void;
}

interface Message {
  sender: 'assistant' | 'user';
  text: string;
  time: string;
  actions?: { label: string; action: string }[];
}

export default function SalesAssistantAI({
  isOpen,
  setIsOpen,
  onOpenConsultation,
  onOpenCatalog,
}: SalesAssistantAIProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'assistant',
      text: `Welcome to AURA BLOOM Atelier! 👋 I am your dedicated Sales & Business Assistant.\n\nMy mission is to help you find the ideal 300-frame kinetic animation assets, licensing solutions, or custom engineering services for your project with 100% transparent and ethical guidance.\n\nHow can I assist you today?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actions: [
        { label: '🏷️ View Products & Pricing', action: 'pricing' },
        { label: '📅 Book Consultation', action: 'consultation' },
        { label: '🖼️ Inspect 300-Frame Catalog', action: 'catalog' },
      ],
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleActionClick = (action: string) => {
    if (action === 'pricing') {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'consultation') {
      onOpenConsultation();
    } else if (action === 'catalog') {
      onOpenCatalog();
    }
  };

  const processQuery = (query: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [...prev, { sender: 'user', text: query, time: timeStr }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const lower = query.toLowerCase();
      let replyText = '';
      let actions: { label: string; action: string }[] | undefined;

      if (
        lower.includes('recommend') ||
        lower.includes('best') ||
        lower.includes('solution') ||
        lower.includes('choose')
      ) {
        replyText = `Based on your website requirements, here are our top recommendations:\n\n1. **For Single Site & Agencies (Most Popular):**\n   👉 **Atelier Commercial License ($799)** — Includes 300 4K Ultra-HD raw frames, multi-domain commercial license, dual canvas/WebGL shaders, and 1-on-1 integration support.\n\n2. **For Independent Developers:**\n   👉 **Essential Botanical Kit ($299)** — Complete 300 1080p frames with lightweight LERP engine.\n\n3. **For High-End Luxury Brands:**\n   👉 **Custom Atelier Engineering ($2,499+)** — 300+ frame custom macro studio shoot & bespoke WebGL physics.`;
        actions = [
          { label: '📅 Book Consultation', action: 'consultation' },
          { label: '🏷️ View Pricing Section', action: 'pricing' },
        ];
      } else if (
        lower.includes('price') ||
        lower.includes('cost') ||
        lower.includes('license') ||
        lower.includes('buy')
      ) {
        replyText = `We maintain **100% transparent pricing** with no recurring subscription fees:\n\n• **Essential Botanical Kit**: **$299** (300 1080p HD Frames, HTML5 Canvas LERP)\n• **Atelier Commercial License**: **$799** (300 4K Ultra-HD Raw Sequence, Unlimited Multi-Domain License)\n• **Custom Atelier Engineering**: **$2,499+** (Tailor-made macro botanical shoot, bespoke WebGL physics)\n\nAll assets deliver smooth 60FPS canvas motion.`;
        actions = [
          { label: '💳 Select Atelier License ($799)', action: 'pricing' },
          { label: '📅 Book Free Consultation', action: 'consultation' },
        ];
      } else if (
        lower.includes('book') ||
        lower.includes('consultation') ||
        lower.includes('schedule')
      ) {
        replyText = `I would be delighted to help you book a consultation with our Atelier specialists! 📅\n\nDuring our 1-on-1 session, we will:\n✔ Analyze your website architecture & design goals\n✔ Determine the optimal frame format and resolution\n✔ Demonstrate canvas step interpolation for Next.js / React`;
        actions = [{ label: '📅 Book Consultation Now', action: 'consultation' }];
      } else {
        replyText = `Thank you for reaching out! AURA BLOOM provides high-performance 300-frame botanical kinetic assets and HTML5 canvas engines designed to elevate website conversion, user engagement, and brand perception.\n\nHow can I best assist you right now?`;
        actions = [
          { label: '🏷️ Products & Pricing', action: 'pricing' },
          { label: '📅 Book Consultation', action: 'consultation' },
        ];
      }

      setMessages((prev) => [
        ...prev,
        { sender: 'assistant', text: replyText, time: timeStr, actions },
      ]);

      if (isSpeechEnabled && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const clean = replyText.replace(/[*#_•]/g, '');
        const utterance = new SpeechSynthesisUtterance(clean);
        window.speechSynthesis.speak(utterance);
      }
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-crimson-rose to-crimson-dark text-white shadow-2xl shadow-crimson-rose/40 hover:scale-105 transition-all group"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
          <span className="font-display font-semibold text-xs tracking-wide">
            Sales Assistant
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-accent animate-ping" />
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[540px] rounded-3xl bg-surface/95 border border-white/15 shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-crimson-rose/20 text-crimson-rose flex items-center justify-center">
                <Headset className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-white text-sm">
                  Sales & Business Assistant
                </h4>
                <p className="font-body text-[10px] text-emerald-accent flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Ethical & Transparent Advisor
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsSpeechEnabled(!isSpeechEnabled)}
                className={`p-2 rounded-full hover:bg-white/10 ${
                  isSpeechEnabled ? 'text-gold-accent' : 'text-slate-400'
                }`}
                title="Toggle Speech Output"
              >
                {isSpeechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mission Bar */}
          <div className="px-4 py-2 bg-crimson-rose/10 border-b border-crimson-rose/20 text-[11px] font-semibold text-crimson-rose flex items-center gap-2">
            <Award className="w-3.5 h-3.5" /> Official Sales Advisor • 100% Transparent Support
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 font-body text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  m.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed whitespace-pre-wrap ${
                    m.sender === 'user'
                      ? 'bg-crimson-rose text-white rounded-br-none'
                      : 'bg-white/5 border border-white/10 text-slate-200 rounded-bl-none'
                  }`}
                >
                  {m.text}
                  {m.actions && (
                    <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                      {m.actions.map((act, aIdx) => (
                        <button
                          key={aIdx}
                          onClick={() => handleActionClick(act.action)}
                          className="px-2.5 py-1 rounded-full bg-gold-accent/15 border border-gold-accent/30 text-gold-accent hover:bg-gold-accent hover:text-obsidian transition-colors text-[10px] font-semibold"
                        >
                          {act.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1">{m.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-white/5 border border-white/10 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-accent animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-gold-accent animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-gold-accent animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (inputQuery.trim()) {
                processQuery(inputQuery.trim());
                setInputQuery('');
              }
            }}
            className="p-3 border-t border-white/10 bg-surface/50 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask about products, pricing, or consultation..."
              className="flex-1 px-4 py-2.5 rounded-full bg-white/5 border border-white/15 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-gold-accent"
            />
            <button
              type="submit"
              className="w-8 h-8 rounded-full bg-crimson-rose text-white flex items-center justify-center shrink-0 hover:scale-105 transition-transform"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
