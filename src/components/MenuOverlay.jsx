import React, { useEffect } from 'react';

export default function MenuOverlay({ isOpen, onClose, onNavigate }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const navItems = ["HOME", "TIMELINE", "STORY", "VILLAIN"];

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-[#0a0a0a]/95 backdrop-blur-md text-white flex flex-col justify-center items-center overflow-hidden transition-all duration-500 ease-in-out ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      id="hamburger-overlay"
      onClick={(e) => {
        if (e.target.id === 'hamburger-overlay') onClose();
      }}
    >
      <button 
        className="fixed top-8 right-12 z-[999] hover:rotate-90 transition-transform duration-500 text-white hover:text-[#EC1D24] flex items-center justify-center p-2 rounded-full hover:bg-white/10" 
        onClick={onClose}
      >
        <span className="material-symbols-outlined text-[3.5rem] font-light">close</span>
      </button>
      
      <nav className="flex flex-col items-center gap-12 font-label font-medium tracking-[0.4em] text-3xl md:text-5xl" style={{ pointerEvents: isOpen ? 'auto' : 'none' }}>
        {navItems.map((item) => (
          <a 
            key={item} 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              onNavigate(item.toLowerCase());
              window.scrollTo({ top: 0, behavior: "smooth" });
              onClose();
            }}
            className="text-gray-300 hover:text-[#EC1D24] hover:scale-110 transition-all duration-500 ease-out inline-block"
          >
            {item}
          </a>
        ))}
      </nav>
    </div>
  );
}
