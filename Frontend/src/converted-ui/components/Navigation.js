import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const savedMode = localStorage.getItem('theme');
    if (savedMode === 'dark') setDarkMode(true);
    else if (savedMode === 'light') setDarkMode(false);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const navItems = [
    { name: 'Profile', href: '/profile' },
    { name: 'Wrap', href: '/wrap' },
    { name: 'Connect', href: '/connect' },
    { name: 'Learn', href: '/learn' },
    { name: 'Resources', href: '/resources' },
    { name: 'Find a Job', href: '/jobs' },
    { name: 'AI Tools', href: '/ai-tools' },
  ];

  return (
    <nav className="bg-black shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-white no-underline">
              Skillora
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-white no-underline hover:text-gray-300 transition-colors duration-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Light/Dark Toggle Icon */}
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="ml-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white dark:text-yellow-400 light:text-[#202A44] transition-colors duration-300"
            aria-label="Toggle light/dark mode"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0112 21.75c-5.385 0-9.75-4.365-9.75-9.75 0-4.136 2.664-7.626 6.393-9.093a.75.75 0 01.908.911A7.501 7.501 0 0019.5 12c0 1.273-.3 2.474-.835 3.535a.75.75 0 01.911.908z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5M12 19.5V21M4.219 4.219l1.061 1.061M17.657 17.657l1.061 1.061M3 12h1.5M19.5 12H21M4.219 19.781l1.061-1.061M17.657 6.343l1.061-1.061M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
              </svg>
            )}
          </button>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/auth" className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300">
              Login
            </Link>
            <Link to="/auth" className="text-white px-6 py-2 rounded-lg font-semibold hover:text-gray-300 transition-colors duration-300">
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-gray-300 focus:outline-none"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 text-white no-underline hover:text-gray-300 transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 pb-3 border-t border-gray-700">
                <Link to="/auth" className="block w-full bg-white text-black rounded-lg mb-2 text-center font-semibold py-2 no-underline">
                  Login
                </Link>
                <Link to="/auth" className="block w-full text-white rounded-lg text-center font-semibold py-2 hover:text-gray-300 no-underline">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
