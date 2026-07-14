import { Bot, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FloatingAIButton = () => {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate("/ai")}
      aria-label="GreenHarvest AI"
      className="fixed bottom-8 right-8 z-[9999] group animate-float-ai"
    >
      <div
        className="
        relative
        overflow-hidden

        flex
        items-center
        gap-3

        rounded-full

        px-5
        py-3

        bg-gradient-to-r
        from-emerald-600
        via-green-500
        to-lime-500

        text-white

        shadow-2xl
        shadow-emerald-500/30

        transition-all
        duration-300

        hover:-translate-y-1
        hover:scale-105
        "
      >
        {/* Glow */}
        <div
          className="
          absolute
          inset-0
          rounded-full
          bg-white/10
          blur-xl
          animate-pulse
          "
        />

        <Bot className="relative z-10 h-6 w-6" />

        <span
          className="
          relative
          z-10

          overflow-hidden
          whitespace-nowrap

          max-w-0
          opacity-0

          group-hover:max-w-[220px]
          group-hover:opacity-100

          transition-all
          duration-300

          font-medium
        "
        >
          Ask GreenHarvest AI
        </span>

        <Sparkles
          className="
          relative
          z-10

          h-4
          w-4

          transition-transform
          duration-500

          group-hover:rotate-180
          "
        />
      </div>
    </button>
  );
};

export default FloatingAIButton;