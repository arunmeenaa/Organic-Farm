import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Leaf,
} from "lucide-react";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace with your backend API
    toast.success("Message sent successfully!");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="bg-slate-50">

      {/* Hero */}

      <section className="bg-gradient-to-r from-green-700 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">

          <Leaf size={70} className="mx-auto mb-5" />

          <h1 className="text-5xl font-bold">
            Contact Us
          </h1>

          <p className="mt-5 text-lg text-green-100 max-w-2xl mx-auto">
            We'd love to hear from you. Whether you're a seller, buyer,
            or simply have a question, our team is here to help.
          </p>

        </div>
      </section>

      {/* Contact Section */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-3 gap-10">

          {/* Left */}

          <div className="space-y-6">

            <div className="bg-white rounded-2xl shadow p-6 flex gap-4">
              <Mail className="text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">
                  Email
                </h3>

                <p className="text-gray-600">
                  support@organicfarm.com
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-6 flex gap-4">
              <Phone className="text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">
                  Phone
                </h3>

                <p className="text-gray-600">
                  +91 98765 43210
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-6 flex gap-4">
              <MapPin className="text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">
                  Address
                </h3>

                <p className="text-gray-600">
                  Indore, Madhya Pradesh
                  <br />
                  India
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-6 flex gap-4">
              <Clock className="text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">
                  Working Hours
                </h3>

                <p className="text-gray-600">
                  Monday - Saturday
                  <br />
                  9:00 AM - 6:00 PM
                </p>
              </div>
            </div>

          </div>

          {/* Form */}

          <div className="lg:col-span-2 bg-white rounded-2xl shadow p-8">

            <h2 className="text-3xl font-bold mb-8">
              Send Us a Message
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              <div className="grid md:grid-cols-2 gap-6">

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />

              </div>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
              />

              <textarea
                rows="6"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                required
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
              />

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl flex items-center gap-2"
              >
                <Send size={18} />
                Send Message
              </button>

            </form>

          </div>

        </div>

      </section>

      {/* Google Map */}

      <section className="pb-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="bg-white rounded-2xl shadow overflow-hidden">

            <iframe
              title="Organic Farm Location"
              src="https://www.google.com/maps?q=Indore&output=embed"
              className="w-full h-[450px] border-0"
              loading="lazy"
            />

          </div>

        </div>

      </section>

    </div>
  );
};

export default Contact;