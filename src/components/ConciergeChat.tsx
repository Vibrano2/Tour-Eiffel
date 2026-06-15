import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { ChatMessage } from '../types';
import { HOTEL_INFO } from '../data';
import { Send, Sparkles, User, Landmark, HelpCircle, Loader2 } from 'lucide-react';

export default function ConciergeChat() {
  const { language, t } = useLanguage();
  
  const welcomeText = language === 'fr'
    ? "Bienvenue au Tour Eiffel Hôtel Bénin, très cher hôte. Je suis votre Adjoint Virtuel, le Concierge Privé Élite de cet établissement souverain. C'est un privilège et un honneur absolu de vous guider à Porto-Novo.\n\nSouhaitez-vous explorer notre Suite Présidentielle dotée de son jacuzzi privatif, vous enquérir des créations culinaires bio de notre Chef Kofi D'Almeida, ou estimer l'organisation d'un somptueux banquet de mille convives au sein de notre Salon Concorde ?"
    : "Welcome to the Tour Eiffel Hotel Benin, dear guests. I am your Virtual Assistant, the Private Elite Concierge of this sovereign grand palace. It is an absolute pleasure and honour to assist your journey here in Porto-Novo.\n\nWould you like to explore our Presidential Suite with its private Jacuzzi, inquire about Chef Kofi D'Almeida's organic master culinary creations, or plan an imperial banquet holding up to 1000 guests in our Concorde Grand Ballroom?";

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Set initial welcome text depending on active language
  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        sender: 'concierge',
        text: welcomeText,
        timestamp: new Date()
      }
    ]);
  }, [language]);

  const suggestionPrompts = language === 'fr'
    ? [
        "Parlez-moi de la Suite Présidentielle Tour Eiffel",
        "Quel est l'héritage gastronomique du Chef Kofi ?",
        "Quelles sont les capacités de la Salle Concorde ?",
        "Racontez-moi l'histoire de la capitale Porto-Novo"
      ]
    : [
        "Tell me about the Tour Eiffel Presidential Suite",
        "What is the gastronomic legacy of Chef Kofi?",
        "What are the capacities of the Concorde Hall?",
        "Tell me the royal history of Porto-Novo capital"
      ];

  // Scroll to bottom whenever message stack updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      // API call to our full-stack secure proxy route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': language
        },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          lang: language
        })
      });

      if (!response.ok) {
        throw new Error("Erreur de connexion au serveur de conciergerie.");
      }

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'concierge',
        text: data.text,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMsg]);

    } catch (error) {
      console.error("Chat error:", error);
      // Fallback message
      const fallbackMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'concierge',
        text: language === 'fr'
          ? "Mes hommages les plus dévoués, très cher hôte. Mon dispositif d'esprit virtuel subit une légère résonance céleste, mais sachez que notre Suite d'Ivoire à 120,000 FCFA et la Suite Présidentielle à 650,000 FCFA se tiennent parfaitement prêtes à vous recevoir. La table signature du Chef vous est bien ouverte ce soir, et notre héliport privé est dégagé. Souhaitez-vous que je signale votre l'arrivée immédiate au Maître d'Hôtel ?"
          : "My most respectful greetings, dear guest. My virtual matrix is experiencing a stellar celestial signal delay, but be assured that our Ivory Suite at 120,000 FCFA and Tour Eiffel Presidential Suite at 650,000 FCFA stand fully prepared for your grand check-in. The Chef's table is open for you tonight, and our private heliport is cleared. Shall I notify the Master of Ceremonies of your immediate arrival?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section className="py-24 bg-[#FAFAFA] text-gray-900 relative min-h-[calc(100vh-80px)] flex flex-col justify-between" id="concierge-chat-section">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-gold-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-between">
        
        {/* Chat Panel Header - Luxury branding */}
        <div className="text-center mb-6">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.35em] text-gold-400 uppercase block mb-2">
            {language === 'fr' ? 'La Conciergerie Digitale Élite' : 'Elite Sovereign Digital Concierge'}
          </span>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-2.5 h-2.5 bg-gold-400 rounded-full animate-pulse mr-1" />
            <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-gray-900 uppercase inline">
              {language === 'fr' ? 'Adjoint Virtuel' : 'Elite Virtual Attendant'}
            </h2>
          </div>
          <p className="max-w-lg mx-auto text-gray-600 text-xs font-light">
            {language === 'fr'
              ? "Votre intendant diplomatique privé est disponible h24 pour planifier vos rituels, réserver nos suites et éclairer votre curiosité culturelle."
              : "Your dedicated high-security digital steward is standing by 24/7 to design your protocols, secure rooms and clarify cultural curiosities."}
          </p>
        </div>

        {/* Chat Conversation Console */}
        <div className="bg-[#0b1227] border border-gold-500/10 rounded-lg shadow-2xl flex flex-col h-[500px] overflow-hidden mb-6" id="message-console-container">
          
          {/* Header of container */}
          <div className="p-4 bg-[#FAFAFA]/80 border-b border-gold-500/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-gray-900">
                <Landmark className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-bold tracking-wider text-gray-900">
                  {language === 'fr' ? 'CONCIERGE DE HAUTE VOLÉE' : 'SOVEREIGN PRIVATE CONCIERGE'}
                </span>
                <span className="block text-[9px] tracking-widest text-[#4ade80] uppercase font-bold">
                  ● {language === 'fr' ? 'En ligne à Porto-Novo' : 'Live from Porto-Novo'}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[9px] text-gray-500 block uppercase font-bold">{language === 'fr' ? 'Standard Officiel' : 'Official Hotline'}</span>
              <span className="text-[10px] text-gold-400 font-bold">{HOTEL_INFO.phone}</span>
            </div>
          </div>

          {/* Bubble messages container */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4" id="messages-scroller">
            {messages.map((msg) => {
              const isConcierge = msg.sender === 'concierge';
              return (
                <div 
                  key={msg.id}
                  className={`flex gap-3 max-w-[85%] sm:max-w-[75%] ${isConcierge ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                  id={`chat-bubble-${msg.id}`}
                >
                  
                  {/* Avatar bubble */}
                  <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs ${
                    isConcierge 
                      ? 'bg-gold-500/10 border border-gold-500/20 text-gold-400' 
                      : 'bg-[#FAFAFA] border border-gold-500/20 text-gray-900'
                  }`}>
                    {isConcierge ? <Landmark className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                  </div>

                  {/* Text Container bubble */}
                  <div className={`p-4 rounded text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                    isConcierge 
                      ? 'bg-[#FAFAFA]/60 border border-gold-500/5 text-gray-800 rounded-tl-none' 
                      : 'bg-gold-400 text-gray-900 font-medium rounded-tr-none shadow-md shadow-gold-500/5'
                  }`}>
                    {msg.text}
                    
                    <span className={`block text-[9px] text-right mt-2 ${
                      isConcierge ? 'text-gray-500' : 'text-gray-900/65'
                    }`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                </div>
              );
            })}

            {/* Is typing animation */}
            {isTyping && (
              <div className="flex gap-3 max-w-[50%] mr-auto" id="typing-indicator">
                <div className="w-8 h-8 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-400 flex items-center justify-center shrink-0">
                  <Landmark className="w-3.5 h-3.5" />
                </div>

                <div className="p-4 rounded rounded-tl-none bg-[#FAFAFA]/40 border border-gold-500/5 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-gold-400 animate-spin" />
                  <span className="text-[11px] font-medium tracking-wider text-gray-500 uppercase animate-pulse">
                    {language === 'fr' ? "L'Adjoint Virtuel compose sa réponse..." : 'Virtual Steward is formulating reply...'}
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions grid */}
          <div className="p-3 bg-[#FAFAFA]/90 border-t border-gold-500/5" id="suggestion-pills-bar">
            <span className="block text-[9px] text-gray-500 tracking-widest font-bold uppercase mb-2 flex items-center gap-1">
              <HelpCircle className="w-3 h-3 text-gold-400" />
              {language === 'fr' ? 'Sujets suggérés par la Conciergerie :' : 'Suggestions for discussion :'}
            </span>
            
            <div className="flex flex-wrap gap-1.5">
              {suggestionPrompts.map((p, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => handleSendMessage(p)}
                  className="px-2.5 py-1.5 text-[10px] text-left rounded bg-[#0c142c] text-gold-300/80 hover:text-gold-300 hover:bg-[#121c3d] border border-gold-500/10 hover:border-gold-400/30 transition cursor-pointer"
                  id={`suggest-btn-${pIdx}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Input Text Form bar */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputText); }}
          className="flex items-center gap-2 bg-[#0b1227] border border-gold-500/10 rounded-lg p-2"
          id="chat-input-form"
        >
          <input 
            type="text"
            required
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={language === 'fr' ? "Transmettez vos instructions au Concierge Privé Élite..." : "Submit your instructions to our Elite Concierge Desk..."}
            className="flex-1 bg-transparent border-none text-xs sm:text-sm text-gray-900 px-3 py-3 outline-none focus:ring-0 placeholder:text-gray-500"
            id="chat-text-input"
          />

          <button
            type="submit"
            className="w-11 h-11 bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-300 hover:to-gold-500 rounded text-gray-900 flex items-center justify-center shrink-0 shadow-lg shadow-gold-500/10 cursor-pointer"
            id="chat-submit-btn"
            aria-label="Envoyer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </section>
  );
}
