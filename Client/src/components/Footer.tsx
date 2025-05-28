import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin,
  ExternalLink,
  // Scale
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About us', href: '/aboutUs' },
    { name: 'Contact us', href: '/contactUs' },
    { name: 'Who we are', href: '/who-we-are' },
    { name: 'Strategy reports plans', href: '/strategy' },
    { name: 'Help and advice', href: '/help' },
    { name: 'Our standards', href: '/standards' },
    { name: 'Work with us', href: '/careers' }
  ];

  const usefulLinks = [
    { name: 'Find an Accountant', href: '/find-accountant', external: true },
    { name: 'Sign in', href: '/signIn' },
    { name: 'CPD & Training', href: '/cpd-training' },
    { name: 'Rules and guidance', href: '/rules-guidance' },
    { name: 'Website terms and conditions', href: '/terms' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 to-red-500"></div>
      
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          
          {/* Organization Info Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-150 h-120  from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <Image src="/logo2.jpg"  alt='Logo' width={150} height={120}/>
              </div>
              <div>
                {/* <h3 className="text-xl font-bold text-white">Accountants Society</h3>
                <p className="text-sm text-slate-300">of United Kingdom</p> */}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group cursor-pointer">
                <MapPin className="w-5 h-5 text-slate-400 mt-0.5 group-hover:text-blue-400 transition-colors" />
                <address className="not-italic text-slate-300 group-hover:text-white transition-colors">
                  513 London Road, Cheam,<br />
                   Sutton, SM3 8JR<br />
                  
                </address>
              </div>
              
              <div className="flex items-center space-x-3 group cursor-pointer">
                <Phone className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                <a 
                  href="tel:07988 834395" 
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  07988 834395
                </a>
              </div>
              
              <div className="flex items-center space-x-3 group cursor-pointer">
                <Mail className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                <a 
                  href="admin@accountantssociety.org" 
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  admin@accountantssociety.org
                </a>
              </div>
            </div>

            <div className="pt-4">
              <p className="text-slate-400 text-sm leading-relaxed">
                If you&rsquo;re looking for an Accountant, visit{' '}
                <a 
                  href="https://accountants-society-uk.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center"
                >
                  FindAccountant.scot
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white relative pb-3">
              About us
              <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></span>
            </h3>
            <nav className="space-y-3">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="block text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Useful Links Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white relative pb-3">
              Useful links
              <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full"></span>
            </h3>
            <nav className="space-y-3">
              {usefulLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                  className="flex items-center text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm group"
                >
                  {link.name}
                  {link.external && (
                    <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Social Links */}
            <div className="pt-6">
              <h4 className="text-sm font-medium text-slate-400 mb-4">Follow us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 bg-slate-700 hover:bg-gradient-to-br hover:from-blue-500 hover:to-green-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t border-slate-600/50 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-slate-400 text-sm">
              © {currentYear} Accountant Society United Kingdom. All rights reserved.
            </div>
            <div className="text-slate-500 text-xs">
              Made by{' '}
              <span className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                Md Nasir Uddin
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-green-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-yellow-500/5 to-red-500/5 rounded-full blur-3xl pointer-events-none"></div>
    </footer>
  );
};

export default Footer;