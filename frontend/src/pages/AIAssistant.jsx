import { Bot, Send, User, Sparkles, Leaf } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { sendMessage } from "../services/ai.service";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useAuth } from "../context/AuthContext";

// Auto-resize textarea to fit content
const useAutoResize = (value) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }, [value]);
  return ref;
};

const TypingIndicator = () => (
  <div className="flex justify-start px-6 py-2">
    <div className="flex items-end gap-3">
      <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0">
        <Bot size={16} className="text-emerald-700" />
      </div>
      <div className="bg-white/80 backdrop-blur-sm border border-stone-200/70 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  </div>
);

const AIAssistant = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: Date.now(),
      sender: "ai",
      text: `Hello ${user?.name || "there"}! 👋 I'm GreenHarvest AI. How can I help you today?`,
      timestamp: new Date(),
    },
  ]);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useAutoResize(message);

  const farmerSuggestions = [
    "🌾 Best crop for this season",
    "🐛 Yellow spots on tomato leaves",
    "🌦️ Today's farming tips",
    "💧 Irrigation schedule for wheat",
    "🧪 Organic fertilizer for tomatoes",
    "🚜 How to prepare soil for sowing",
  ];

  const buyerSuggestions = [
    "🥬 Fresh organic vegetables",
    "🍎 Fruits in season right now",
    "🥗 Suggest healthy organic foods",
    "🌱 Benefits of organic farming",
    "🥕 Vegetables for a balanced diet",
    "📦 Track my GreenHarvest order",
  ];

  const suggestions =
    user?.role === "farmer" ? farmerSuggestions : buyerSuggestions;

  // Always keep scroll pinned to the bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSubmit = useCallback(
    async (e) => {
      e?.preventDefault();
      const trimmed = message.trim();
      if (!trimmed || loading) return;

      const userMessage = trimmed;
      setMessage("");

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "user",
          text: userMessage,
          timestamp: new Date(),
        },
      ]);

      setLoading(true);
      try {
        const { data } = await sendMessage(userMessage);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            sender: "ai",
            text: data.reply,
            timestamp: new Date(),
          },
        ]);
      } catch (err) {
        console.error(err);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            sender: "ai",
            text: "Sorry, something went wrong. Please try again.",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [message, loading]
  );

  // Enter to send, Shift+Enter for new line
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setMessage(suggestion);
    // focus textarea after selecting suggestion
    textareaRef.current?.focus();
  };

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-emerald-50/40 to-amber-50/30 flex justify-center items-center p-4 md:p-6">
      <div className="w-full max-w-4xl h-[88vh] rounded-3xl overflow-hidden flex flex-col shadow-[0_24px_60px_-16px_rgba(6,78,59,0.22)] border border-white/60 bg-white/70 backdrop-blur-xl">

        {/* ── Header ── */}
        <div className="relative flex items-center gap-4 px-6 py-5 border-b border-white/50 bg-gradient-to-r from-emerald-800 to-emerald-700 overflow-hidden shrink-0">
          {/* decorative blobs */}
          <div className="pointer-events-none absolute -top-6 -left-6 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl" />
          <div className="pointer-events-none absolute -bottom-8 right-12 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl" />

          <div className="relative w-11 h-11 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center shrink-0">
            <Bot size={24} className="text-white" />
          </div>

          <div className="relative">
            <h1 className="text-white font-semibold text-lg leading-tight">
              GreenHarvest AI
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
              <p className="text-emerald-200 text-xs">Smart Farming Assistant</p>
            </div>
          </div>

          <div className="ml-auto relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20">
            <Sparkles size={13} className="text-amber-300" />
            <span className="text-white/80 text-xs font-medium">Powered by Gemini</span>
          </div>
        </div>

        {/* ── Messages ── */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 scroll-smooth">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex items-end gap-2.5 max-w-[78%] ${
                  msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mb-0.5 ${
                    msg.sender === "user"
                      ? "bg-emerald-700 text-white"
                      : "bg-emerald-100 border border-emerald-200 text-emerald-700"
                  }`}
                >
                  {msg.sender === "user" ? <User size={16} /> : <Bot size={16} />}
                </div>

                {/* Bubble */}
                <div className="flex flex-col gap-1">
                  <div
                    className={`rounded-2xl px-4 py-3 shadow-sm ${
                      msg.sender === "user"
                        ? "bg-gradient-to-br from-emerald-700 to-emerald-800 text-white rounded-br-sm"
                        : "bg-white/90 border border-stone-200/70 text-stone-800 rounded-bl-sm"
                    }`}
                  >
                    <article
                      className={`prose prose-sm max-w-none break-words leading-relaxed ${
                        msg.sender === "user"
                          ? "prose-invert prose-p:text-white/90"
                          : "prose-stone prose-headings:text-stone-800 prose-p:text-stone-700 prose-code:bg-stone-100 prose-code:text-emerald-800"
                      }`}
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.text}
                      </ReactMarkdown>
                    </article>
                  </div>

                  {/* Timestamp */}
                  {msg.timestamp && (
                    <span
                      className={`text-[10px] text-stone-400 px-1 ${
                        msg.sender === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      {formatTime(msg.timestamp)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator — inside the scroll container so it scrolls into view */}
          {loading && <TypingIndicator />}

          {/* Scroll anchor — always rendered, always at bottom */}
          <div ref={messagesEndRef} />
        </div>

        {/* ── Suggestions ── */}
        {messages.length === 1 && !loading && (
          <div className="px-6 pb-3 shrink-0">
            <div className="flex items-center gap-1.5 mb-2.5">
              <Leaf size={12} className="text-emerald-600" />
              <p className="text-xs text-stone-500 font-medium">Try asking</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((item) => (
                <button
                  key={item}
                  onClick={() => handleSuggestionClick(item)}
                  className="px-3 py-1.5 rounded-full text-xs border border-emerald-200/70 bg-emerald-50/60 hover:bg-emerald-100/70 hover:border-emerald-300 text-emerald-800 font-medium transition-colors backdrop-blur-sm"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Input ── */}
        <form
          onSubmit={handleSubmit}
          className="border-t border-stone-200/60 bg-white/60 backdrop-blur-sm p-4 flex items-end gap-3 shrink-0"
        >
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              rows={1}
              placeholder="Ask anything about farming… (Enter to send)"
              className="w-full resize-none border border-stone-200 rounded-2xl px-4 py-3 pr-4 text-sm text-stone-800 placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-emerald-400/60 focus:border-emerald-400 bg-white/80 backdrop-blur-sm transition-all leading-relaxed"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !message.trim()}
            className={`p-3 rounded-2xl text-white transition-all duration-200 shrink-0 mb-0.5 ${
              loading || !message.trim()
                ? "bg-stone-300 cursor-not-allowed"
                : "bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-[0_4px_12px_-4px_rgba(4,120,87,0.5)] hover:shadow-[0_6px_16px_-4px_rgba(4,120,87,0.6)] active:scale-95"
            }`}
          >
            <Send size={18} />
          </button>
        </form>

      </div>
    </div>
  );
};

export default AIAssistant;
