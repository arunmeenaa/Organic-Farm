import { Leaf, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-gray-300">
      {/* Newsletter */}
      <section className="border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold text-white">Stay Updated 🌱</h2>

              <p className="mt-2 text-gray-400 max-w-xl">
                Subscribe to receive updates about fresh organic products,
                farming tips and exclusive offers.
              </p>
            </div>

            <div className="flex w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full lg:w-80 rounded-l-xl px-5 py-4 bg-slate-800 border border-slate-700 outline-none focus:border-green-500"
              />

              <button className="bg-green-600 hover:bg-green-700 transition px-6 rounded-r-xl flex items-center">
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer */}

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}

          <div>
            <div className="flex items-center gap-2 text-white text-2xl font-bold">
              <Leaf className="text-green-500" />
              Organic Farm
            </div>

            <p className="mt-5 leading-7 text-gray-400">
              Connecting farmers directly with buyers to provide fresh, organic
              and healthy products while ensuring fair prices for everyone.
            </p>

            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="bg-slate-800 hover:bg-green-600 transition p-3 rounded-full"
              >
                <FaFacebook size={18} />
              </a>

              <a
                href="#"
                className="bg-slate-800 hover:bg-green-600 transition p-3 rounded-full"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="bg-slate-800 hover:bg-green-600 transition p-3 rounded-full"
              >
                <FaXTwitter size={18} />
              </a>

              <a
                href="#"
                className="bg-slate-800 hover:bg-green-600 transition p-3 rounded-full"
              >
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="text-white font-semibold text-xl mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4">
              <li>
                <Link to="/" className="hover:text-green-400">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/products" className="hover:text-green-400">
                  Products
                </Link>
              </li>

              <li>
                <Link to="/about" className="hover:text-green-400">
                  About Us
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:text-green-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Buyer */}

          <div>
            <h3 className="text-white font-semibold text-xl mb-6">Buyer</h3>

            <ul className="space-y-4">
              <li>
                <Link to="/products" className="hover:text-green-400">
                  Browse Products
                </Link>
              </li>

              <li>
                <Link to="/orders" className="hover:text-green-400">
                  My Orders
                </Link>
              </li>

              <li>
                <Link to="/cart" className="hover:text-green-400">
                  Shopping Cart
                </Link>
              </li>

              <li>
                <Link to="/register" className="hover:text-green-400">
                  Become a Member
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3 className="text-white font-semibold text-xl mb-6">Contact</h3>

            <div className="space-y-5">
              <div className="flex gap-3">
                <MapPin className="text-green-500 mt-1" />

                <p>
                  Indore, Madhya Pradesh
                  <br />
                  India
                </p>
              </div>

              <div className="flex gap-3">
                <Phone className="text-green-500" />

                <p>+91 XXXXX XXXXX</p>
              </div>

              <div className="flex gap-3">
                <Mail className="text-green-500" />

                <p>support@organicfarm.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}

      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-center">
            © {new Date().getFullYear()} Organic Farm. All Rights Reserved.
          </p>

          <div className="flex gap-6">
            <Link to="#" className="hover:text-green-400">
              Privacy Policy
            </Link>

            <Link to="#" className="hover:text-green-400">
              Terms & Conditions
            </Link>

            <Link to="#" className="hover:text-green-400">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
