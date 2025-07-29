'use client';

import React, { useState, ChangeEvent } from 'react';
import { FaPaperPlane, FaWhatsapp, FaGithub, FaLinkedin, FaTwitter, FaDiscord } from 'react-icons/fa';
import Lanyard from '../Lanyard/Lanyard'; // pastikan path ini sesuai

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendWhatsApp = async () => {
    const { name, message } = formData;
    if (!name || !message) return;
    
    setIsSubmitting(true);
    const phone = '6282134946260';
    const encoded = encodeURIComponent(`Halo, saya ${name}. ${message}`);
    window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
    
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  const sendEmail = async () => {
    const { name, email, message } = formData;
    if (!name || !email || !message) return;
    
    setIsSubmitting(true);
    const subject = encodeURIComponent(`Pesan dari ${name}`);
    const body = encodeURIComponent(`Email: ${email}\n\n${message}`);
    window.location.href = `mailto:youremail@example.com?subject=${subject}&body=${body}`;
    
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <footer className="relative mt-32 overflow-hidden" id="contact">
      {/* Background dengan gradient dan blur effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
      <div className="absolute inset-0 backdrop-blur-3xl bg-black/30"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 px-6 md:px-12 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
              Let's Create Something Amazing
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Ready to bring your ideas to life? Let's connect and discuss your next project.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Form Side */}
            <div className="order-2 lg:order-1">
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-white mb-2">Send Me a Message</h3>
                  <p className="text-gray-400">Fill out the form below and I'll get back to you as soon as possible.</p>
                </div>

                <div className="space-y-6">
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-4 rounded-xl border border-white/20 text-white placeholder-gray-500 bg-white/5 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 group-hover:border-white/30"
                    />
                  </div>
                  
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-4 rounded-xl border border-white/20 text-white placeholder-gray-500 bg-white/5 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 group-hover:border-white/30"
                    />
                  </div>
                  
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <textarea
                      name="message"
                      placeholder="Tell me about your project..."
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-4 rounded-xl border border-white/20 text-white placeholder-gray-500 bg-white/5 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none group-hover:border-white/30"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      onClick={sendEmail}
                      disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                      className="flex-1 group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 hover:shadow-xl"
                    >
                      <span className="flex items-center justify-center">
                        {isSubmitting ? 'Sending...' : 'Send Email'}
                        <FaPaperPlane className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </button>
                    
                    <button
                      onClick={sendWhatsApp}
                      disabled={isSubmitting || !formData.name || !formData.message}
                      className="flex-1 group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-400 hover:to-emerald-500 focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 hover:shadow-xl"
                    >
                      <span className="flex items-center justify-center">
                        {isSubmitting ? 'Opening...' : 'WhatsApp'}
                        <FaWhatsapp className="ml-2 group-hover:scale-110 transition-transform duration-300" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Side */}
            <div className="order-1 lg:order-2 flex flex-col items-center justify-center">
              <div className="w-full max-w-xl mb-8 transform scale-125">
                <Lanyard />
              </div>

              {/* Social Links */}
              <div className="flex space-x-6">
                <a
                  href="https://github.com/VO1DRB"
                  className="group p-4 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-110"
                >
                  <FaGithub className="w-5 h-5 text-gray-300 group-hover:text-cyan-400 transition-colors duration-300" />
                </a>
                <a
                  href="https://www.linkedin.com/in/mikhael-jamie-496b75346?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  className="group p-4 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-110"
                >
                  <FaLinkedin className="w-5 h-5 text-gray-300 group-hover:text-blue-400 transition-colors duration-300" />
                </a>
                <a
                  href="https://www.linkedin.com/in/mikhael-jamie"
                  className="group p-4 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 hover:border-sky-400/50 transition-all duration-300 transform hover:scale-110"
                >
                  <FaDiscord className="w-5 h-5 text-gray-300 group-hover:text-sky-400 transition-colors duration-300" />
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-16">
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Michael Jamie. Crafted with{' '}
              <span className="text-red-400 animate-pulse">❤️</span>{' '}
              using Next.js & Tailwind CSS
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Building digital experiences that matter
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;