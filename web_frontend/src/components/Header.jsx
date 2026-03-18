import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { FiMessageSquare, FiHome, FiUser, FiLogOut, FiSun, FiMoon, FiClock, FiSettings, FiChevronDown } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();

  // ... (rest of states)

  // Sub-component or function for avatar logic
  const getAvatarChar = () => user?.name?.charAt(0) || <FiUser />;

  // ... handle dropdown toggle, etc
  const { theme, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navLinkClass = ({ isActive }) => 
    `relative px-4 py-2 font-black text-[10px] uppercase tracking-widest transition-all duration-500 flex flex-col items-center group ${
      isActive ? 'text-indigo-600' : 'text-gray-500 dark:text-gray-400 hover:text-indigo-600'
    }`;

  return (
    <div className="w-full flex justify-center py-6 px-4 relative z-[100] animate-slide-up transition-colors duration-700">
      <header className="w-full max-w-7xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl border border-white/20 dark:border-gray-800/50 px-6 sm:px-10 py-4 rounded-[2.5rem] shadow-2xl shadow-indigo-500/10 dark:shadow-none flex items-center justify-between transition-all duration-500 group/nav hover:shadow-indigo-500/20">
        
        {/* Logo Section */}
        <div 
          onClick={() => navigate('/')}
          className="flex items-center space-x-4 cursor-pointer group/logo"
        >
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center group-hover/logo:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 dark:shadow-none group-hover/logo:rotate-[360deg] duration-1000">
            <FiHome className="text-white text-2xl" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tighter group-hover/logo:text-indigo-600 transition duration-500">
            Odisha<span className="text-indigo-600">Vox</span>
          </h1>
        </div>

        {/* Floating Navigation Links */}
        <nav className="hidden md:flex items-center space-x-2">
          {[
            { to: '/about', label: 'About' },
            { to: '/pricing', label: 'Pricing' },
            { to: '/faq', label: 'FAQ' }
          ].map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 w-1 h-1 bg-indigo-600 rounded-full animate-pulse transition-all"></span>
                  )}
                  {/* Hover background effect */}
                  <span className="absolute inset-0 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 -z-0"></span>
                </>
              )}
            </NavLink>
          ))}
          
          {isLoggedIn ? (
            <NavLink 
              to="/workbench" 
              className={({ isActive }) => 
                `relative px-6 py-2 ml-4 font-black text-[10px] uppercase tracking-[0.2em] border-l border-gray-100 dark:border-gray-800 transition-all duration-500 flex flex-col items-center group ${
                  isActive ? 'text-indigo-600' : 'text-gray-500 dark:text-gray-400 hover:text-indigo-600'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="relative z-10">Workbench</span>
                  {isActive && (
                    <span className="absolute -bottom-1 ml-8 w-1 h-1 bg-indigo-600 rounded-full animate-pulse"></span>
                  )}
                  <span className="absolute inset-x-4 inset-y-0 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 -z-0"></span>
                </>
              )}
            </NavLink>
          ) : (
            <NavLink to="/contact" className={navLinkClass}>
               {({ isActive }) => (
                <>
                  <span className="relative z-10">Contact</span>
                  {isActive && (
                    <span className="absolute -bottom-1 w-1 h-1 bg-indigo-600 rounded-full animate-pulse"></span>
                  )}
                  <span className="absolute inset-0 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 -z-0"></span>
                </>
              )}
            </NavLink>
          )}
        </nav>

        {/* Action Set */}
        <div className="flex items-center space-x-6">
          <button
            onClick={toggleTheme}
            className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:shadow-indigo-500/10 duration-500"
          >
            {theme === 'light' ? <FiMoon className="text-xl" /> : <FiSun className="text-xl" />}
          </button>

          {!isLoggedIn ? (
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/login')}
                className="group relative px-6 py-3 rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-indigo-50/50 dark:bg-gray-800/30 backdrop-blur-md border border-indigo-100/50 dark:border-gray-700/50 rounded-full transition-all duration-500 group-hover:border-indigo-500/30"></div>
                <span className="relative text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 dark:text-gray-100">Sign In</span>
              </button>
              <button 
                onClick={() => navigate('/register')}
                className="group relative px-8 py-3.5 rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-xl shadow-indigo-500/10"
              >
                <div className="absolute inset-0 bg-gray-950 dark:bg-white transition-colors duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <span className="relative text-[10px] font-black uppercase tracking-[0.25em] text-white dark:text-black">Join Platform</span>
              </button>
            </div>
          ) : (
            <div className="relative group">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-3 p-1.5 pr-5 rounded-[2rem] bg-indigo-50/50 dark:bg-gray-800/40 backdrop-blur-md border border-indigo-100/50 dark:border-gray-700/50 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 ${isDropdownOpen && 'ring-2 ring-indigo-500/20 bg-white dark:bg-gray-900 border-indigo-500/30'}`}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center text-sm font-black shadow-lg shadow-indigo-200/50 dark:shadow-none transition-transform duration-500 group-hover:scale-105">
                    {getAvatarChar()}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full animate-pulse shadow-sm"></div>
                </div>
                
                <div className="hidden sm:block text-left ml-1">
                  <p className="text-[9px] font-black text-indigo-500/80 dark:text-indigo-400 uppercase tracking-[0.15em] mb-0.5">Neural Hub</p>
                  <p className="text-xs font-black text-gray-950 dark:text-white leading-none tracking-tight">
                    {user?.name?.split(' ')[0] || "Profile"}
                  </p>
                </div>
                
                <FiChevronDown className={`text-indigo-500 transition-transform duration-500 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="relative z-[110]">
                  <div className="fixed inset-0" onClick={() => setIsDropdownOpen(false)}></div>
                  <div className="absolute right-0 mt-6 w-72 bg-white/95 dark:bg-gray-950/95 backdrop-blur-2xl rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-3xl p-6 z-20 animate-scale-in">
                    <div className="mb-6 pb-6 border-b border-gray-50 dark:border-gray-800 px-2">
                       <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em]">Access Level 1</p>
                       <p className="text-xl font-black text-gray-900 dark:text-gray-100 mt-2">Neural Hub</p>
                    </div>
                    
                    <div className="space-y-2">
                      {[
                        { to: '/profile', icon: <FiUser />, label: 'Profile Intelligence' },
                        { to: '/history', icon: <FiClock />, label: 'Neural Logs' },
                        { to: '/feedback', icon: <FiMessageSquare />, label: 'Signal Feedback' }
                      ].map((item) => (
                        <button 
                          key={item.to}
                          onClick={() => { navigate(item.to); setIsDropdownOpen(false); }}
                          className="w-full flex items-center gap-4 p-4 text-gray-500 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-2xl transition duration-300 font-bold text-xs group"
                        >
                          <span className="text-lg group-hover:scale-110 transition-transform">{item.icon}</span>
                          {item.label}
                        </button>
                      ))}
                      <button 
                        onClick={() => {
                          logout();
                          setIsDropdownOpen(false);
                          navigate('/');
                        }}
                        className="w-full flex items-center justify-center gap-3 p-5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition font-black text-[10px] uppercase tracking-[0.3em] mt-6 border-t border-gray-50 dark:border-gray-800 pt-8 cursor-pointer relative z-30"
                      >
                        <FiLogOut className="text-lg" /> Terminate Session
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;