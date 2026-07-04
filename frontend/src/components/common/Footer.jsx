import { Leaf, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Matches Navbar/Hero/MyProducts/Orders/AddProduct/Dashboard: emerald →
// lime gradient accents, Space Grotesk display type. Footer stays dark,
// now using a deep emerald base instead of the earlier forest/marigold one.
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');

    .fd-footer { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; background: #0B2318; color: #B9CFC0; }
    .fd-display { font-family: 'Space Grotesk', ui-sans-serif, sans-serif; }

    .fd-newsletter-section {
      border-bottom: 1px solid rgba(132, 204, 22, 0.15);
      transition: background 0.3s ease;
    }
    .fd-newsletter-section:hover { background: rgba(132, 204, 22, 0.04); }

    .fd-newsletter-input {
      background: #123A27;
      border: 1px solid rgba(132, 204, 22, 0.2);
      color: #F4F9F2;
      transition: border-color 0.15s ease;
    }
    .fd-newsletter-input:focus { outline: none; border-color: #84CC16; }
    .fd-newsletter-input::placeholder { color: #7FA08C; }

    .fd-newsletter-btn {
      background: linear-gradient(90deg, #059669, #84CC16);
      color: #063527;
      transition: filter 0.15s ease;
    }
    .fd-newsletter-btn:hover { filter: brightness(1.08); }

    .fd-social-btn {
      background: #123A27;
      transition: background 0.15s ease, color 0.15s ease;
    }
    .fd-social-btn:hover { background: linear-gradient(135deg, #059669, #84CC16); color: #063527; }

    .fd-heading { color: #F4F9F2; }

    .fd-footer-link { transition: color 0.15s ease; }
    .fd-footer-link:hover { color: #84CC16; }

    .fd-contact-icon { color: #84CC16; }

    .fd-footer-divider { border-top: 1px solid rgba(132, 204, 22, 0.15); }
  `}</style>
);

const Footer = () => {
  const { isAuthenticated } = useAuth();
  return (
    <footer className="fd-footer">
      <FontImport />
      {/* Newsletter */}
      {!isAuthenticated && (
        <section className="fd-newsletter-section">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="fd-display fd-heading text-3xl font-semibold">
                  Stay Updated 🌱
                </h2>

                <p className="mt-2 max-w-xl" style={{ color: "#7FA08C" }}>
                  Subscribe to receive updates about fresh organic products,
                  farming tips and exclusive offers.
                </p>
              </div>

              <div className="flex w-full lg:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="fd-newsletter-input w-full lg:w-80 rounded-l-xl px-5 py-4"
                />

                <button className="fd-newsletter-btn px-6 rounded-r-xl flex items-center font-semibold">
                  <ArrowRight />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Footer */}

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}

          <div>
            <div className="fd-display fd-heading flex items-center gap-2 text-2xl font-semibold">
              <Leaf style={{ color: "#84CC16" }} />
              Organic Farm
            </div>

            <p className="mt-5 leading-7" style={{ color: "#7FA08C" }}>
              Connecting farmers directly with buyers to provide fresh, organic
              and healthy products while ensuring fair prices for everyone.
            </p>

            <div className="flex gap-4 mt-6">
              <a href="#" className="fd-social-btn p-3 rounded-full">
                <FaFacebook size={18} />
              </a>

              <a href="#" className="fd-social-btn p-3 rounded-full">
                <FaInstagram size={18} />
              </a>

              <a href="#" className="fd-social-btn p-3 rounded-full">
                <FaXTwitter size={18} />
              </a>

              <a href="#" className="fd-social-btn p-3 rounded-full">
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="fd-display fd-heading font-semibold text-xl mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4">
              <li>
                <Link to="/" className="fd-footer-link">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/products" className="fd-footer-link">
                  Products
                </Link>
              </li>

              <li>
                <Link to="/about" className="fd-footer-link">
                  About Us
                </Link>
              </li>

              <li>
                <Link to="/contact" className="fd-footer-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Buyer */}

          <div>
            <h3 className="fd-display fd-heading font-semibold text-xl mb-6">
              Buyer
            </h3>

            <ul className="space-y-4">
              <li>
                <Link to="/products" className="fd-footer-link">
                  Browse Products
                </Link>
              </li>

              <li>
                <Link to="/orders" className="fd-footer-link">
                  My Orders
                </Link>
              </li>

              <li>
                <Link to="/cart" className="fd-footer-link">
                  Shopping Cart
                </Link>
              </li>

              <li>
                <Link to="/register" className="fd-footer-link">
                  Become a Member
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3 className="fd-display fd-heading font-semibold text-xl mb-6">
              Contact
            </h3>

            <div className="space-y-5">
              <div className="flex gap-3">
                <MapPin className="fd-contact-icon mt-1" />

                <p>
                  Indore, Madhya Pradesh
                  <br />
                  India
                </p>
              </div>

              <div className="flex gap-3">
                <Phone className="fd-contact-icon" />

                <p>+91 XXXXX XXXXX</p>
              </div>

              <div className="flex gap-3">
                <Mail className="fd-contact-icon" />

                <p>support@organicfarm.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}

      <div className="fd-footer-divider">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-center" style={{ color: "#7FA08C" }}>
            © {new Date().getFullYear()} © 2026 Organic Farm. Empowering farmers. Delivering freshness.
          </p>

          <div className="flex gap-6">
            <Link to="#" className="fd-footer-link">
              Privacy Policy
            </Link>

            <Link to="#" className="fd-footer-link">
              Terms & Conditions
            </Link>

            <Link to="#" className="fd-footer-link">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;