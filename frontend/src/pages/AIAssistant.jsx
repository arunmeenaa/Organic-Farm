import { Bot, Send, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { sendMessage } from "../services/ai.service";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useAuth } from "../context/AuthContext";
const AIAssistant = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
  {
    id: Date.now(),
    sender: "ai",
    text: `Hello ${user?.name || ""}! 👋 I'm GreenHarvest AI. How can I help you today?`,
  },
]);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const farmerSuggestions = [
    "🌾 Recommend the best crop for this season",
    "🐛 My tomato leaves have yellow spots",
    "🌦️ Give me today's farming tips",
    "💧 How often should I irrigate wheat?",
    "🧪 Recommend an organic fertilizer for tomatoes",
    "🚜 How do I prepare soil for sowing?",
  ];

  const buyerSuggestions = [
    "🥬 Recommend fresh organic vegetables",
    "🍎 What fruits are in season right now?",
    "🥗 Suggest healthy organic foods",
    "🌱 What are the benefits of organic farming?",
    "🥕 Recommend vegetables for a balanced diet",
    "📦 How can I track my order on GreenHarvest?",
  ];
  const suggestions =
    user?.role === "farmer" ? farmerSuggestions : buyerSuggestions;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text: userMessage,
      },
    ]);

    setMessage("");

    try {
      setLoading(true);

      const { data } = await sendMessage(userMessage);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "ai",
          text: data.reply,
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
        },
      ]);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-green-50 flex justify-center items-center p-6">
      <div className="w-full max-w-5xl h-[85vh] bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-green-700 text-white px-6 py-5 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
            <Bot size={26} />
          </div>

          <div>
            <h1 className="text-xl font-bold">GreenHarvest AI</h1>
            <p className="text-green-100 text-sm">
              Your Smart Farming Assistant
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-gradient-to-b from-green-50 to-white">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-start gap-3 max-w-[75%] ${
                  msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    msg.sender === "user"
                      ? "bg-green-600 text-white"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {msg.sender === "user" ? (
                    <User size={20} />
                  ) : (
                    <Bot size={20} />
                  )}
                </div>

                <div
                  className={`rounded-2xl px-4 py-3 shadow-sm ${
                    msg.sender === "user"
                      ? "bg-green-600 text-white"
                      : "bg-white border border-green-100"
                  }`}
                >
                  <article
                    className={`prose prose-sm max-w-none wrap-break-words ${
                      msg.sender === "user" ? "prose-invert" : ""
                    }`}
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.text}
                    </ReactMarkdown>
                  </article>
                </div>
              </div>
            </div>
          ))}
        </div>
        {loading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Bot size={20} className="text-green-700" />
              </div>

              <div className="bg-white border border-green-100 rounded-2xl px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></span>
                  <span
                    className="w-2 h-2 bg-green-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></span>
                  <span
                    className="w-2 h-2 bg-green-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></span>
                </div>
              </div>
            </div>
            <div ref={messagesEndRef}></div>
          </div>
        )}
        {messages.length === 1 && (
          <div className="px-6 pb-4">
            <p className="text-sm text-gray-500 mb-3">Try asking:</p>

            <div className="flex flex-wrap gap-3">
              {suggestions.map((item) => (
                <button
                  key={item}
                  onClick={() => setMessage(item)}
                  className="px-4 py-2 rounded-full border border-green-200 bg-green-50 hover:bg-green-100 transition"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="border-t bg-white p-4 flex items-center gap-3"
        >
          <textarea
            rows={1}
            placeholder="Ask anything about farming..."
            className="flex-1 resize-none border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className={`p-3 rounded-xl text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIAssistant;
