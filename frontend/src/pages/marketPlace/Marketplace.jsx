import { useState } from "react";
import { Sprout, Tractor } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import ProductsTab from "./ProductsTab";
import MachineryTab from "./MachineryTab";

const Marketplace = () => {
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("products");

  const headings = {
    products: "Fresh Organic Marketplace",
    machines: "Agricultural Equipment Hub",
  };

  const subtexts = {
    products: `Discover ${0} organic crop batches direct from farms.`,
    machines: "Explore machinery listings ready for deployment.",
  };

  return (
    <div className="font-sans min-h-screen relative overflow-hidden transition-[background] duration-400 pb-16">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
      />

      <div
        className={[
          "absolute top-[10%] -right-[10%] w-[35%] h-[35%] rounded-full pointer-events-none blur-[120px]",
          darkMode ? "bg-[rgba(52,211,153,0.07)]" : "bg-[rgba(251,191,36,0.10)]",
        ].join(" ")}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-10">
        <div
          className={[
            "flex flex-col md:flex-row md:items-end justify-between border-b pb-6 mb-8 gap-4",
            darkMode ? "border-[rgba(52,211,153,0.10)]" : "border-[rgba(6,95,70,0.10)]",
          ].join(" ")}
        >
          {/* Title */}
          <div>
            <h1
              className={[
                "text-4xl font-extrabold tracking-tight bg-clip-text text-transparent font-['Space_Grotesk',ui-sans-serif,sans-serif]",
                darkMode
                  ? "bg-gradient-to-r from-[#34D399] to-[#A3E635]"
                  : "bg-gradient-to-r from-[#065F46] to-[#65A30D]",
              ].join(" ")}
            >
              {headings[activeTab]}
            </h1>
            <p
              className={[
                "mt-2 text-sm font-medium",
                darkMode ? "text-[rgba(167,243,208,0.55)]" : "text-[rgba(6,95,70,0.55)]",
              ].join(" ")}
            >
              {subtexts[activeTab]}
            </p>
          </div>

          {/* Tab switcher */}
          <div
            className={[
              "flex gap-1.5 p-1.5 rounded-2xl w-max shadow-sm backdrop-blur-[12px]",
              darkMode
                ? "bg-white/[0.06] border border-[rgba(52,211,153,0.12)]"
                : "bg-white/60 border border-[rgba(6,95,70,0.10)]",
            ].join(" ")}
          >
            {[
              { id: "products", icon: <Sprout size={14} />, label: "Crops & Produce" },
              { id: "machines", icon: <Tractor size={14} />, label: "Farm Machinery" },
            ].map(({ id, icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all text-xs tracking-wider uppercase ${
                  activeTab === id
                    ? "bg-gradient-to-r from-emerald-600 to-lime-500 text-white shadow-[0_8px_16px_-6px_rgba(5,150,105,0.50)]"
                    : darkMode
                    ? "text-[rgba(167,243,208,0.45)] hover:text-[rgba(167,243,208,0.85)]"
                    : "text-[rgba(6,95,70,0.50)] hover:text-[rgba(6,95,70,0.85)]"
                }`}
              >
                {icon} {label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "products" && <ProductsTab darkMode={darkMode} />}
        {activeTab === "machines" && <MachineryTab darkMode={darkMode} />}
      </div>
    </div>
  );
};

export default Marketplace;
