import React, { useState, useReducer, useEffect, useRef } from 'react';
import { ShoppingCart, Sparkles, ShieldCheck, Bot, Send, Activity, BrainCircuit, X, Terminal, Database, Server, Cpu } from 'lucide-react';

// --- MOCK DATABASE ---
const INVENTORY = [
  { id: 1, name: 'ErgoPro Developer Chair', price: 450.00, margin: 120, category: 'Furniture', features: ['Lumbar support', 'Mesh back', 'Adjustable armrests'], vectorTags: ['wfh', 'comfort', 'office', 'posture'] },
  { id: 2, name: 'Keychron K8 Mechanical', price: 95.00, margin: 25, category: 'Electronics', features: ['Hot-swappable', 'Wireless', 'Tactile switches'], vectorTags: ['typing', 'keyboard', 'developer', 'budget'] },
  { id: 3, name: 'Dell UltraSharp 34" Curved', price: 650.00, margin: 180, category: 'Electronics', features: ['USB-C Hub', 'WQHD', 'Color accurate'], vectorTags: ['monitor', 'screen', 'productivity', 'wfh'] },
  { id: 4, name: 'Sony WH-1000XM5 ANC', price: 348.00, margin: 90, category: 'Electronics', features: ['Active Noise Cancellation', '30hr battery', 'Multipoint'], vectorTags: ['audio', 'focus', 'headphones', 'noise'] },
  { id: 5, name: 'Logitech MX Master 3S', price: 99.00, margin: 30, category: 'Electronics', features: ['MagSpeed scrolling', 'Ergonomic', 'Custom buttons'], vectorTags: ['mouse', 'productivity', 'wireless', 'ergonomic'] },
];

// --- STATE MANAGEMENT ---
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) return { ...state, items: state.items.map(i => i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i) };
      return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] };
    case 'CLEAR_CART': return { items: [] };
    default: return state;
  }
};

// --- NEW COMPONENT: Text-to-SQL Developer Console ---
const DeveloperConsole = ({ onClose }) => {
  const [sqlInput, setSqlInput] = useState('');
  const [logs, setLogs] = useState([{ type: 'system', text: 'PostgreSQL DB Connected. Text-to-SQL Agent Initialized.' }]);
  
  const handleSqlSim = (e) => {
    e.preventDefault();
    if (!sqlInput) return;
    
    setLogs(prev => [...prev, { type: 'user', text: sqlInput }]);
    
    setTimeout(() => {
      let generatedSql = "SELECT * FROM inventory LIMIT 5;";
      if (sqlInput.toLowerCase().includes('electronics') || sqlInput.toLowerCase().includes('margin')) {
        generatedSql = "SELECT id, name, price, margin FROM inventory WHERE category = 'Electronics' ORDER BY margin DESC;";
      }
      
      setLogs(prev => [
        ...prev, 
        { type: 'agent', text: `-- Generated via LangChain Text-to-SQL --\n${generatedSql}` },
        { type: 'success', text: `Query executed successfully in 42ms. 4 rows returned.` }
      ]);
    }, 600);
    
    setSqlInput('');
  };

  return (
    <div className="fixed bottom-0 left-0 w-full h-64 bg-slate-900 border-t-4 border-indigo-500 z-50 flex flex-col font-mono animate-in slide-in-from-bottom-full">
      <div className="flex justify-between items-center bg-black px-4 py-2 text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><Terminal className="w-3 h-3 text-emerald-400"/> Text-to-SQL Terminal</span>
          <span className="flex items-center gap-1"><Database className="w-3 h-3 text-blue-400"/> PostgreSQL Connected</span>
          <span className="flex items-center gap-1"><Server className="w-3 h-3 text-red-400"/> Redis Cache Hit: 94.2%</span>
          <span className="flex items-center gap-1"><Cpu className="w-3 h-3 text-purple-400"/> Elasticsearch Latency: 12ms</span>
        </div>
        <button onClick={onClose} className="hover:text-white"><X className="w-4 h-4"/></button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2 text-xs">
        {logs.map((log, i) => (
          <div key={i} className={`
            ${log.type === 'system' ? 'text-slate-500' : ''}
            ${log.type === 'user' ? 'text-white' : ''}
            ${log.type === 'agent' ? 'text-indigo-400 whitespace-pre' : ''}
            ${log.type === 'success' ? 'text-emerald-400' : ''}
          `}>
            {log.type === 'user' ? '> ' : ''}{log.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSqlSim} className="p-2 bg-black flex border-t border-slate-800">
        <span className="text-emerald-400 p-2 text-sm">{">"}</span>
        <input 
          type="text" 
          value={sqlInput}
          onChange={(e) => setSqlInput(e.target.value)}
          placeholder="Ask database in plain English (e.g. 'Show me the highest margin electronics')"
          className="flex-1 bg-transparent text-emerald-400 focus:outline-none text-sm"
        />
      </form>
    </div>
  );
};

// --- EXISTING COMPONENTS ---
const ExplainableAIOverlay = ({ product, matchScore, onClose }) => (
  <div className="absolute inset-0 bg-gray-900/95 text-white p-4 rounded-lg flex flex-col z-10 animate-in fade-in zoom-in duration-200">
    <div className="flex justify-between items-start mb-4">
      <h4 className="font-bold flex items-center gap-2"><Activity className="w-4 h-4 text-emerald-400"/> AI Match Analysis</h4>
      <button onClick={onClose} className="hover:text-red-400"><X className="w-4 h-4"/></button>
    </div>
    <div className="space-y-3 text-sm flex-1">
      <div>
        <div className="flex justify-between text-xs mb-1 text-gray-300"><span>Semantic Vector Match</span><span>{matchScore.semantic}%</span></div>
        <div className="w-full bg-gray-700 rounded-full h-1.5"><div className="bg-emerald-400 h-1.5 rounded-full" style={{width: `${matchScore.semantic}%`}}></div></div>
      </div>
      <div>
        <div className="flex justify-between text-xs mb-1 text-gray-300"><span>Price Boundary Alignment</span><span>{matchScore.price}%</span></div>
        <div className="w-full bg-gray-700 rounded-full h-1.5"><div className="bg-blue-400 h-1.5 rounded-full" style={{width: `${matchScore.price}%`}}></div></div>
      </div>
      <div>
        <div className="flex justify-between text-xs mb-1 text-gray-300"><span>Feature Relevance (SHAP)</span><span>{matchScore.feature}%</span></div>
        <div className="w-full bg-gray-700 rounded-full h-1.5"><div className="bg-purple-400 h-1.5 rounded-full" style={{width: `${matchScore.feature}%`}}></div></div>
      </div>
    </div>
  </div>
);

const ProductCard = ({ product, onAddToCart, isRecommended }) => {
  const [showXAI, setShowXAI] = useState(false);
  const matchScore = {
    semantic: isRecommended ? Math.floor(Math.random() * 15) + 85 : Math.floor(Math.random() * 40) + 20,
    price: isRecommended ? Math.floor(Math.random() * 20) + 80 : Math.floor(Math.random() * 50) + 10,
    feature: isRecommended ? Math.floor(Math.random() * 10) + 90 : Math.floor(Math.random() * 30) + 40,
  };

  return (
    <div className={`relative flex flex-col p-5 bg-white border ${isRecommended ? 'border-indigo-400 shadow-indigo-100' : 'border-gray-200'} rounded-xl shadow-sm hover:shadow-md transition-all`}>
      {isRecommended && <div className="absolute -top-3 -right-3 bg-indigo-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm"><Sparkles className="w-3 h-3"/> Top Pick</div>}
      {showXAI && <ExplainableAIOverlay product={product} matchScore={matchScore} onClose={() => setShowXAI(false)} />}
      <div className="h-32 bg-slate-50 rounded-lg mb-4 border border-slate-100 flex items-center justify-center relative overflow-hidden">
         <BrainCircuit className="w-8 h-8 text-slate-200 absolute opacity-50" />
      </div>
      <h5 className="mb-1 text-lg font-bold text-gray-900 leading-tight">{product.name}</h5>
      <p className="mb-3 font-semibold text-indigo-600">${product.price.toFixed(2)}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {product.features.map(f => (
          <span key={f} className="bg-slate-100 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded-md border border-slate-200">{f}</span>
        ))}
      </div>
      <div className="mt-auto grid grid-cols-5 gap-2">
        <button onClick={() => setShowXAI(true)} className="col-span-2 flex items-center justify-center px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"><Activity className="w-4 h-4 mr-1.5" /> XAI</button>
        <button onClick={() => onAddToCart(product)} className="col-span-3 flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-indigo-600 transition-colors">Add <ShoppingCart className="w-4 h-4 ml-2" /></button>
      </div>
    </div>
  );
};

// --- MAIN APPLICATION ARCHITECTURE ---
export default function App() {
  const [cartState, dispatchCart] = useReducer(cartReducer, { items: [] });
  const [activeProducts, setActiveProducts] = useState(INVENTORY);
  const [recommendedIds, setRecommendedIds] = useState([]);
  const [devMode, setDevMode] = useState(false);
  
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([{ role: 'agent', text: 'Hi! I am your AI Copilot. What kind of workspace are you building today?' }]);
  const chatEndRef = useRef(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleAgentQuery = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const query = chatInput.toLowerCase();
    setMessages(prev => [...prev, { role: 'user', text: chatInput }]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      let responseText = "I found some great options for you.";
      let filtered = [...INVENTORY];
      let highlights = [];

      if (query.includes('budget') || query.includes('cheap')) {
        filtered = INVENTORY.filter(p => p.price < 100);
        highlights = filtered.map(p => p.id);
        responseText = "I've filtered the catalog for budget-friendly options under $100.";
      } else if (query.includes('wfh') || query.includes('setup')) {
        highlights = [1, 3];
        responseText = "For a complete WFH setup, investing in ergonomics and screen real estate is critical.";
      }

      setActiveProducts(filtered.length > 0 ? filtered : INVENTORY);
      setRecommendedIds(highlights);
      setMessages(prev => [...prev, { role: 'agent', text: responseText }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleCheckout = () => {
    if (cartState.items.length === 0) return;
    const total = cartState.items.reduce((s, i) => s + (i.price * i.qty), 0);
    alert(`[Simulating .NET Web API Call]\nPayload: { items: ${cartState.items.length}, total: $${total.toFixed(2)} }\nHeaders: Authorization: Bearer eyJhbGciOi... (JWT)`);
    dispatchCart({ type: 'CLEAR_CART' });
  };

  const cartTotal = cartState.items.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-32">
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 text-xl font-black text-slate-900 tracking-tight">
            <div className="bg-indigo-600 p-1.5 rounded-lg"><Sparkles className="w-5 h-5 text-white"/></div>
            NeuroCommerce
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
            {/* Developer Mode Toggle */}
            <button onClick={() => setDevMode(!devMode)} className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors ${devMode ? 'bg-slate-900 text-emerald-400 border-slate-900' : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'}`}>
              <Terminal className="w-4 h-4" /> Dev Mode
            </button>
            <span className="hidden sm:inline-flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-500"/> JWT Secured</span>
            <div className="relative flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-full cursor-pointer hover:bg-slate-200 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              <span className="font-bold text-slate-900">${cartTotal.toFixed(2)}</span>
              {cartState.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {cartState.items.reduce((sum, item) => sum + item.qty, 0)}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-[350px] flex flex-col h-[600px] bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex-shrink-0 sticky top-24">
          <div className="bg-slate-900 p-4 text-white flex items-center gap-3">
            <div className="bg-indigo-500/20 p-2 rounded-lg border border-indigo-500/30"><Bot className="w-5 h-5 text-indigo-400" /></div>
            <div>
              <h3 className="font-bold text-sm">AI Shopping Copilot</h3>
              <p className="text-[10px] text-slate-400 font-mono">Powered by LangGraph & RAG</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm'}`}>{msg.text}</div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-sm shadow-sm flex gap-1">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={handleAgentQuery} className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="E.g., I need a WFH setup under $500..." className="flex-1 bg-slate-100 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
            <button type="submit" disabled={isTyping} className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white p-2.5 rounded-xl transition-colors"><Send className="w-4 h-4" /></button>
          </form>
        </div>

        <div className="flex-1 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {activeProducts.map(product => (
              <ProductCard key={product.id} product={product} isRecommended={recommendedIds.includes(product.id)} onAddToCart={(p) => dispatchCart({ type: 'ADD_ITEM', payload: p })} />
            ))}
          </div>
        </div>
      </main>
      
      {cartState.items.length > 0 && (
        <div className="fixed bottom-8 right-8 z-40 animate-in slide-in-from-bottom-8">
          <button onClick={handleCheckout} className="flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white px-6 py-4 rounded-2xl shadow-2xl shadow-slate-900/20 font-bold transition-transform hover:scale-105">
            <ShieldCheck className="w-5 h-5 text-emerald-400" /> Secure Checkout (${cartTotal.toFixed(2)})
          </button>
        </div>
      )}

      {/* Developer Terminal Overlay */}
      {devMode && <DeveloperConsole onClose={() => setDevMode(false)} />}
    </div>
  );
}