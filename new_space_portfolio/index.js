import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Twitter, Mail, Globe, Menu, X, ChevronUp, Code, BarChart3, Heart } from 'lucide-react';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [webDevModalOpen, setWebDevModalOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
      
      const sections = ['home', 'services', 'portfolio', 'blog', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('✓ Message sent! I will get back to you soon.');
    setFormData({ fullName: '', email: '', message: '' });
    setTimeout(() => setFormStatus(''), 5000);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fadeIn" onClick={e => e.stopPropagation()}>
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
              <X size={24} />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform"
            >
              Joana Lawer
            </button>

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8">
              {['home', 'services', 'portfolio', 'blog', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all ${
                    activeSection === item
                      ? 'text-blue-600 font-semibold'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="md:hidden pb-4 space-y-2 border-t">
              {['home', 'services', 'portfolio', 'blog', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left px-4 py-2 capitalize hover:bg-blue-50 rounded transition-colors text-gray-700"
                >
                  {item}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative group md:order-2">
            <div className="w-72 h-72 mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <img
                src="/static/images/lawer.jpg"
                alt="Joana Lawer"
                className="relative w-full h-full rounded-full object-cover border-4 border-white shadow-2xl"
              />
            </div>
          </div>

          <div className="space-y-6 md:order-1">
            <p className="text-lg text-gray-700 leading-relaxed">
              I'm Front-End developer who builds user-friendly systems that solve real-world problems. With proficiency in HTML, CSS, JavaScript, React, and PostgreSQL, 
              I focus on creating digital solutions that are both powerful and intuitive.
            </p>
            <p className="text-lg text-gray-700">
              Beyond coding, I'm passionate about turning data into decisions.
            </p>
            <p className="text-lg text-gray-700">
              I also believe in giving back—I regularly volunteer to share my technical knowledge and contribute to social impact initiatives.
            </p>
            <button
              onClick={() => setProfileModalOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all"
            >
              Profile
            </button>
          </div>
        </div>
      </section>

      {/* Profile Modal */}
      <Modal isOpen={profileModalOpen} onClose={() => setProfileModalOpen(false)} title="Hi, I'm Joana">
        <div className="space-y-6">
          <div className="space-y-4 text-gray-700">
            <p><strong className="text-gray-900">Skills:</strong> Front-End Development, Data Analysis</p>
            <p><strong className="text-gray-900">Tools:</strong> HTML, CSS, JavaScript, React, PostgreSQL, Python, Excel</p>
            <p><strong className="text-gray-900">Fun Fact:</strong> Crochet, Movies, Good Food</p>
          </div>
          
          <button
            onClick={() => {
              setProfileModalOpen(false);
              scrollToSection('contact');
            }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all"
          >
            Let's Talk
          </button>

          <div className="flex space-x-4 pt-4">
            <a href="https://github.com/joanalawer" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 transition-colors">
              <Github size={28} />
            </a>
            <a href="https://www.linkedin.com/in/joanalawer" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 transition-colors">
              <Linkedin size={28} />
            </a>
            <a href="https://x.com/joana_lawer" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 transition-colors">
              <Twitter size={28} />
            </a>
          </div>
        </div>
      </Modal>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Services</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Here are some services I provide based on skills and expertise.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Web Development */}
            <div 
              onClick={() => setWebDevModalOpen(true)}
              className="group text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-xl transition-all transform hover:-translate-y-2 cursor-pointer"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Code size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Web Development</h3>
              <p className="text-gray-600">Front-end and back-end development, database management, and ensuring seamless functionality.</p>
            </div>

            {/* Data Analysis */}
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Data Analysis</h3>
              <p className="text-gray-600">Data visualization, developing and maintaining dashboards, database management and reporting.</p>
            </div>

            {/* Volunteering */}
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Heart size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Volunteering & Training</h3>
              <p className="text-gray-600">I actively take part in volunteering initiatives, sharing my experience to younger generations through workshops and mentorship programs, towards a worthy cause.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Web Dev Modal */}
      <Modal isOpen={webDevModalOpen} onClose={() => setWebDevModalOpen(false)} title="Web Development Profile">
        <div className="text-gray-700">
          <p><strong className="text-gray-900">Tools:</strong> HTML, CSS, JavaScript, React, Bootstrap, PostgreSQL, Git/GitHub, WordPress</p>
        </div>
      </Modal>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Portfolio</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Explore some projects I have worked on</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: 'PrivaVerse', 
                desc: 'An API to compare privacy policies and highlight key differences in updates.', 
                link: 'pending.html',
                emoji: '🔒',
                gradient: 'from-purple-100 to-pink-100'
              },
              { 
                title: 'Online Banking', 
                desc: 'A banking web application that includes basic online transactions.', 
                link: 'pending.html',
                emoji: '🏦',
                gradient: 'from-blue-100 to-cyan-100'
              },
              { 
                title: 'Text Classification', 
                desc: 'A simple classification Web App to predict if a message is spam or ham (not spam).', 
                link: 'https://cybrex.onrender.com',
                emoji: '📧',
                gradient: 'from-green-100 to-emerald-100'
              }
            ].map((project, idx) => (
              <div key={idx} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                  <span className="text-6xl">{project.emoji}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.desc}</p>
                  <a 
                    href={project.link} 
                    target={project.link.startsWith('http') ? '_blank' : '_self'} 
                    rel="noopener noreferrer" 
                    className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all"
                  >
                    Explore
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Blog</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">I write on experiences and findings from projects and other engagements</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="group bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl hover:shadow-xl transition-all transform hover:-translate-y-2">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Text Classification</h3>
              <p className="text-gray-600 mb-6">Building a Spam Classification Web App with Flask: A Step-by-Step Guide</p>
              <a 
                href="https://medium.com/@joanalawer001/spam-classification-web-app-with-flask-a-step-by-step-guide-part-1-8e906deedae4" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all"
              >
                Read
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Thank you for reaching out. Leave a message and I will do well to reply as soon as I can.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-lg text-gray-700">
                  <Mail className="text-blue-600" size={24} />
                  <span>joanalawer.site@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-lg text-gray-700">
                  <Globe className="text-blue-600" size={24} />
                  <span>joanalawer.github.io</span>
                </div>
              </div>

              <div className="flex gap-4">
                <a href="https://github.com/joanalawer" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white hover:shadow-lg transform hover:-translate-y-1 transition-all">
                  <Github size={24} />
                </a>
                <a href="https://www.linkedin.com/in/joanalawer" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white hover:shadow-lg transform hover:-translate-y-1 transition-all">
                  <Linkedin size={24} />
                </a>
                <a href="https://x.com/joana_lawer" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white hover:shadow-lg transform hover:-translate-y-1 transition-all">
                  <Twitter size={24} />
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className="px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your Message"
                rows="6"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all resize-none"
              ></textarea>
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all"
              >
                Submit
              </button>
              {formStatus && (
                <p className="text-green-600 text-center font-medium">{formStatus}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <p>Copyright © 2025. By Joana Lawer | All Rights Reserved.</p>
          <button
            onClick={scrollToTop}
            className="mt-4 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto hover:shadow-lg transition-all"
          >
            <ChevronUp size={24} />
          </button>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all z-40"
        >
          <ChevronUp size={24} />
        </button>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}