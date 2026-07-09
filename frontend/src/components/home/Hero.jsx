import React from "react";
import { Link } from "react-router-dom";
/**
 * Organic Farm — Hero section (colorful / modern)
 * Bold gradients, glassy floating cards, playful color-coded features.
 * No required props — drop straight into a page.
 */
export default function OrganicFarmHero() {
  return (
    <div className="of-hero">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');

        .of-hero {
          --ink: #0f2417;
          --sub: #3d5a45;
          --green: #16a34a;
          --green-deep: #0d7a37;
          --lime: #a3e635;
          --orange: #fb923c;
          --sky: #38bdf8;
          --violet: #a78bfa;
          --sun: #facc15;
          font-family: 'Inter', sans-serif;
          color: var(--ink);
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(60% 50% at 85% 8%, rgba(56,189,248,0.25), transparent 60%),
            radial-gradient(55% 45% at 8% 92%, rgba(250,204,21,0.30), transparent 60%),
            radial-gradient(70% 60% at 15% 5%, rgba(163,230,53,0.35), transparent 60%),
            linear-gradient(180deg, #f4fbef 0%, #eaf7e6 100%);
        }
        .of-hero * { box-sizing: border-box; }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(50px);
          opacity: 0.55;
          z-index: 0;
        }
        .blob1 { width: 320px; height: 320px; background: var(--lime); top: -100px; left: -80px; }
        .blob2 { width: 260px; height: 260px; background: var(--sky); top: 40px; right: -60px; }
        .blob3 { width: 280px; height: 280px; background: var(--sun); bottom: -120px; left: 30%; }

        .of-wrap {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 96px 32px 90px;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 48px;
          align-items: center;
        }
        @media (max-width: 880px) {
          .of-wrap { grid-template-columns: 1fr; padding-top: 64px; }
        }

        .of-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 16px 7px 8px;
          background: #ffffffcc;
          backdrop-filter: blur(6px);
          border-radius: 999px;
          box-shadow: 0 4px 14px rgba(15,36,23,0.08);
          font-size: 13px;
          font-weight: 600;
          color: var(--green-deep);
          margin-bottom: 24px;
        }
        .of-badge-dot {
          width: 22px; height: 22px; border-radius: 50%;
          background: linear-gradient(135deg, var(--sun), var(--orange));
          display: flex; align-items: center; justify-content: center;
          font-size: 12px;
        }

        .of-h1 {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: clamp(36px, 4.8vw, 60px);
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin: 0 0 22px;
        }
        .of-h1 .grad {
          background: linear-gradient(100deg, var(--green) 10%, var(--sky) 55%, var(--violet) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .of-sub {
          font-size: 17.5px;
          line-height: 1.65;
          color: var(--sub);
          max-width: 480px;
          margin: 0 0 34px;
        }

        .of-ctas { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 46px; }
        .of-cta-primary, .of-cta-secondary {
          font-family: inherit;
          font-size: 15px;
          font-weight: 600;
          padding: 15px 26px;
          border-radius: 999px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: none;
        }
        .of-cta-primary {
          background: linear-gradient(135deg, var(--green), var(--green-deep));
          color: #fff;
          box-shadow: 0 10px 24px rgba(22,163,74,0.35);
        }
        .of-cta-secondary {
          background: #ffffffcc;
          color: var(--ink);
          box-shadow: 0 4px 14px rgba(15,36,23,0.08);
        }

        .of-stats { display: flex; gap: 30px; flex-wrap: wrap; }
        .of-stat-num {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 24px;
          font-weight: 700;
        }
        .of-stat-label {
          font-size: 12.5px;
          color: var(--sub);
          font-weight: 500;
        }

        /* --- colorful floating cards --- */
        .of-board { position: relative; height: 440px; }
        .of-card {
          position: absolute;
          width: 250px;
          background: #ffffffe6;
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 20px 22px;
          box-shadow: 0 16px 36px rgba(15,36,23,0.14);
        }
        .of-icon {
          width: 40px; height: 40px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 14px;
        }
        .of-card-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 17px;
          font-weight: 700;
          margin: 0 0 4px;
        }
        .of-card-meta { font-size: 13px; color: var(--sub); margin: 0; }
        .of-card-price {
          margin-top: 12px;
          display: inline-block;
          font-size: 13px;
          font-weight: 700;
          padding: 5px 12px;
          border-radius: 999px;
        }

        .of-card--produce {
          top: 0; left: 10px; z-index: 1;
          border: 1px solid rgba(163,230,53,0.5);
        }
        .of-card--produce .of-icon { background: linear-gradient(135deg, var(--lime), var(--green)); }
        .of-card--produce .of-card-price { background: #e9fbe0; color: var(--green-deep); }

        .of-card--machine {
          top: 150px; right: 0; z-index: 2;
          border: 1px solid rgba(56,189,248,0.5);
        }
        .of-card--machine .of-icon { background: linear-gradient(135deg, var(--sky), #0284c7); }
        .of-card--machine .of-card-price { background: #e3f6fe; color: #0369a1; }

        .of-card--ai {
          bottom: 0; left: 46px; width: 270px; z-index: 3;
          border: 1px solid rgba(167,139,250,0.55);
        }
        .of-card--ai .of-icon { background: linear-gradient(135deg, var(--violet), #7c3aed); }
        .of-ai-name {
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #7c3aed;
          margin-bottom: 4px;
        }
        .of-ai-msg { font-size: 13.5px; line-height: 1.55; margin: 0; color: var(--ink); }

        .of-glow {
          position: absolute;
          inset: -6px;
          border-radius: 26px;
          background: linear-gradient(135deg, var(--sun), var(--orange));
          opacity: 0.25;
          filter: blur(14px);
          z-index: -1;
        }
      `}</style>

      <div className="blob blob1" />
      <div className="blob blob2" />
      <div className="blob blob3" />

      <div className="of-wrap">
        <div>
          <div className="of-badge">
            <span className="of-badge-dot">🌱</span>
            AI-powered smart farming platform
          </div>

          <h1 className="of-h1">
            Fresh from the field,
            <br />
            <span className="grad">straight to your cart.</span>
          </h1>

          <p className="of-sub">
            Organic Farm connects growers directly to buyers, puts an AI
            agronomist in every farmer's pocket, and makes renting a tractor as
            easy as ordering seed.
          </p>

          <div className="of-ctas">
            <Link to="/market-place" className="of-cta-primary">
              Browse the marketplace
              <span aria-hidden="true">→</span>
            </Link>
            <Link to="/farmer/inventory" className="of-cta-secondary">
              List your farm
            </Link>
          </div>

          <div className="of-stats">
            <div>
              <div className="of-stat-num">12,400+</div>
              <div className="of-stat-label">verified farms</div>
            </div>
            <div>
              <div className="of-stat-num">340</div>
              <div className="of-stat-label">crop varieties</div>
            </div>
            <div>
              <div className="of-stat-num">48</div>
              <div className="of-stat-label">states covered</div>
            </div>
          </div>
        </div>

        <div className="of-board">
          <div className="of-card of-card--produce">
            <div className="of-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 21C7 21 4 17.5 4 12.5C4 7.8 7.5 4 12 3C12.6 8 16 8.4 16 13C16 17.5 16 21 12 21Z"
                  fill="#fff"
                />
              </svg>
            </div>
            <h3 className="of-card-title">Heirloom tomatoes</h3>
            <p className="of-card-meta">Sunridge Farm · Sonoma, CA</p>
            <span className="of-card-price">$4.20 / lb</span>
          </div>

          <div className="of-card of-card--machine">
            <div className="of-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="12" width="9" height="6" rx="1.5" fill="#fff" />
                <circle cx="7" cy="19" r="2" fill="#fff" />
                <circle cx="16" cy="19" r="2.6" fill="#fff" />
                <path d="M12 14H17L20 17H12V14Z" fill="#fff" />
              </svg>
            </div>
            <h3 className="of-card-title">John Deere 5075E</h3>
            <p className="of-card-meta">Available Thu – Sun</p>
            <span className="of-card-price">$180 / day</span>
          </div>

          <div className="of-card of-card--ai">
            <div className="of-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" fill="#fff" />
                <path
                  d="M12 3V6M12 18V21M3 12H6M18 12H21M5.6 5.6L7.8 7.8M16.2 16.2L18.4 18.4M5.6 18.4L7.8 16.2M16.2 7.8L18.4 5.6"
                  stroke="#fff"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="of-ai-name">AI agronomist</div>
            <p className="of-ai-msg">
              Soil moisture is low in Field 3 — irrigate before Thursday's heat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
