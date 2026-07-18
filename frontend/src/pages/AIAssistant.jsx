import { Bot, Send, User, Sparkles, Leaf } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { sendMessage } from "../services/ai.service";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

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

const TypingIndicator = ({ darkMode }) => (
  <div className="flex justify-start px-6 py-2">
    <div className="flex items-end gap-3">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          darkMode
            ? "bg-emerald-900/60 border border-emerald-700/50"
            : "bg-emerald-100 border border-emerald-200"
        }`}
      >
        <Bot
          size={16}
          className={darkMode ? "text-emerald-400" : "text-emerald-700"}
        />
      </div>
      <div
        className={`backdrop-blur-sm border rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm ${
          darkMode
            ? "bg-[rgba(20,40,30,0.90)] border-emerald-800/50"
            : "bg-white/80 border-stone-200/70"
        }`}
      >
        <div className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  </div>
);

const AIAssistant = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();

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

  // ── Style tokens ──────────────────────────────────────────────────────────
  const rootBg = darkMode
    ? "bg-gradient-to-br from-[#0b1a13] via-[#0f2318] to-[#131a0d]"
    : "bg-gradient-to-br from-stone-100 via-emerald-50/40 to-amber-50/30";

  const panelCls = darkMode
    ? "bg-[rgba(15,30,22,0.88)] border-emerald-900/40 shadow-[0_24px_60px_-16px_rgba(6,78,59,0.40)]"
    : "bg-white/70 border-white/60 shadow-[0_24px_60px_-16px_rgba(6,78,59,0.22)]";

  const aiBubbleCls = darkMode
    ? "bg-[rgba(20,40,30,0.90)] border border-emerald-800/50 text-emerald-100 rounded-bl-sm"
    : "bg-white/90 border border-stone-200/70 text-stone-800 rounded-bl-sm";

  const aiProseCls = darkMode
    ? "prose-invert prose-p:text-emerald-100/90 prose-headings:text-emerald-100 prose-code:bg-emerald-900/60 prose-code:text-emerald-300"
    : "prose-stone prose-headings:text-stone-800 prose-p:text-stone-700 prose-code:bg-stone-100 prose-code:text-emerald-800";

  const timestampCls = darkMode ? "text-emerald-700/70" : "text-stone-400";

  const suggBtnCls = darkMode
    ? "border-emerald-700/50 bg-emerald-900/30 hover:bg-emerald-800/40 hover:border-emerald-600 text-emerald-300"
    : "border-emerald-200/70 bg-emerald-50/60 hover:bg-emerald-100/70 hover:border-emerald-300 text-emerald-800";

  const suggLabelCls = darkMode ? "text-emerald-600/70" : "text-stone-500";

  const formCls = darkMode
    ? "border-emerald-900/50 bg-[rgba(10,22,16,0.70)]"
    : "border-stone-200/60 bg-white/60";

  const textareaCls = darkMode
    ? "border-emerald-800/60 bg-[rgba(15,30,22,0.80)] text-emerald-100 placeholder:text-emerald-700/60 focus:ring-emerald-500/40 focus:border-emerald-600"
    : "border-stone-200 bg-white/80 text-stone-800 placeholder:text-stone-400 focus:ring-emerald-400/60 focus:border-emerald-400";

  const disabledBtnCls = darkMode
    ? "bg-emerald-900/50 text-emerald-700 cursor-not-allowed"
    : "bg-stone-300 cursor-not-allowed";
  // ─────────────────────────────────────────────────────────────────────────

  const sellerSuggestions = [
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
    user?.role === "seller" ? sellerSuggestions : buyerSuggestions;

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
    textareaRef.current?.focus();
  };

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div
      className={`min-h-screen flex justify-center items-center p-4 md:p-6 ${rootBg}`}
    >
      <div
        className={`w-full max-w-4xl h-[88vh] rounded-3xl overflow-hidden flex flex-col border backdrop-blur-xl ${panelCls}`}
      >
        {/* ── Header ── */}
        <div className="relative flex items-center gap-4 px-6 py-5 border-b border-white/10 bg-gradient-to-r from-emerald-800 to-emerald-700 overflow-hidden shrink-0">
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
            <span className="text-white/80 text-xs font-medium">
              Powered by Gemini
            </span>
          </div>
        </div>

        {/* ── Messages ── */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 scroll-smooth">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
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
                      : darkMode
                      ? "bg-emerald-900/60 border border-emerald-700/50 text-emerald-400"
                      : "bg-emerald-100 border border-emerald-200 text-emerald-700"
                  }`}
                >
                  {msg.sender === "user" ? (
                    <User size={16} />
                  ) : (
                    <Bot size={16} />
                  )}
                </div>

                {/* Bubble */}
                <div className="flex flex-col gap-1">
                  <div
                    className={`rounded-2xl px-4 py-3 shadow-sm ${
                      msg.sender === "user"
                        ? "bg-gradient-to-br from-emerald-700 to-emerald-800 text-white rounded-br-sm"
                        : aiBubbleCls
                    }`}
                  >
                    <article
                      className={`prose prose-sm max-w-none break-words leading-relaxed ${
                        msg.sender === "user"
                          ? "prose-invert prose-p:text-white/90"
                          : aiProseCls
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
                      className={`text-[10px] px-1 ${timestampCls} ${
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
          {loading && <TypingIndicator darkMode={darkMode} />}

          {/* Scroll anchor — always rendered, always at bottom */}
          <div ref={messagesEndRef} />
        </div>

        {/* ── Suggestions ── */}
        {messages.length === 1 && !loading && (
          <div className="px-6 pb-3 shrink-0">
            <div className="flex items-center gap-1.5 mb-2.5">
              <Leaf size={12} className="text-emerald-600" />
              <p className={`text-xs font-medium ${suggLabelCls}`}>
                Try asking
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((item) => (
                <button
                  key={item}
                  onClick={() => handleSuggestionClick(item)}
                  className={`px-3 py-1.5 rounded-full text-xs border font-medium transition-colors backdrop-blur-sm ${suggBtnCls}`}
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
          className={`border-t backdrop-blur-sm p-4 flex items-end gap-3 shrink-0 ${formCls}`}
        >
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              rows={1}
              placeholder="Ask anything about farming… (Enter to send)"
              className={`w-full resize-none border rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 backdrop-blur-sm transition-all leading-relaxed ${textareaCls}`}
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
                ? disabledBtnCls
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
