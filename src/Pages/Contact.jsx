import React, { useState } from "react";
import { Mail, Phone, Send, MapPin, Check, AlertTriangle } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: "Sending Message...",
      html: "Please wait while your message is being sent",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const formSubmitUrl = "https://formsubmit.co/akshatamahajan101@gmail.com";
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      submitData.append("message", formData.message);
      submitData.append("_subject", "New message from Portfolio");
      submitData.append("_captcha", "false");
      submitData.append("_template", "table");

      await axios.post(formSubmitUrl, submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        title: "Success!",
        text: "Your message has been sent!",
        icon: "success",
        confirmButtonColor: "#6366f1",
        timer: 2000,
        timerProgressBar: true,
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonColor: "#6366f1",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="Contact"
      className="px-[5%] md:px-[10%] py-16 bg-[#030014] text-white"
    >
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          Get In Touch
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto">
          I'm always excited to take on new challenges and collaborate on
          innovative projects. Whether you have a project in mind or just want
          to connect, I'd love to hear from you!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="flex flex-col gap-4 justify-center">
          <h3 className="text-2xl font-bold text-white">
            Let's build something amazing!
          </h3>

          <div className="flex items-center gap-4 mt-4">
            <Mail className="text-[#a855f7] w-6 h-6" />
            <span className="text-slate-300">
              akshatamahajan101@gmail.com
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Phone className="text-[#a855f7] w-6 h-6" />
            <span className="text-slate-300">+91-8767211462</span>
          </div>

          <div className="flex gap-4 mt-6">
            <a
              href="https://github.com/Akshata-Mahajan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-[#6366f1] rounded-lg text-[#6366f1] hover:bg-[#6366f1]/10"
            >
              <FaGithub /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/akshata-mahajan22"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-[#a855f7] rounded-lg text-[#a855f7] hover:bg-[#a855f7]/10"
            >
              <FaLinkedin /> LinkedIn
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-lg p-8 rounded-xl shadow-xl"
        >
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="p-4 bg-transparent border border-[#6366f1]/30 rounded-lg focus:outline-none focus:border-[#6366f1] text-white"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-4 bg-transparent border border-[#6366f1]/30 rounded-lg focus:outline-none focus:border-[#6366f1] text-white"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="p-4 bg-transparent border border-[#6366f1]/30 rounded-lg focus:outline-none focus:border-[#6366f1] text-white"
            ></textarea>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>

      {/* My Location Section */}
      <div className="mt-20 grid md:grid-cols-2 gap-10">
        {/* Left box */}
        <div className="rounded-xl bg-[#0f0f1c] border border-white/10 p-6 space-y-4">
          <h3 className="text-xl font-bold bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-transparent bg-clip-text flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#6366f1]" /> Current Location
          </h3>
          <p className="text-white font-medium">
            Pune, Maharashtra, India
          </p>
          <p className="text-slate-400 text-sm">
            Available for remote work worldwide
          </p>
          <p className="text-slate-400 text-sm">
            Open to relocation for the right opportunity
          </p>

          <div className="mt-4 border-t border-white/10 pt-4">
            <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7] font-bold mb-2">
              Work Preferences
            </h4>
            <ul className="text-sm space-y-1">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#6366f1]" /> Remote Work
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#6366f1]" /> On-site (Pune)
              </li>
              <li className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#a855f7]" /> Open to discuss relocation
              </li>
            </ul>
          </div>
        </div>

        {/* Map */}
        <div className="rounded-xl overflow-hidden border border-white/10">
          <iframe
            title="Pune Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.1224417099633!2d73.85674287502432!3d18.5204302717418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c06fe6d05db5%3A0xc9b9ab054b022cb9!2sPune%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sin!4v1713897767874!5m2!1sen!2sin"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-[300px]"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
