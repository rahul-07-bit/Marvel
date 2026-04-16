import React, { useState } from 'react';
import Gallery from './components/Gallery';
import MenuOverlay from './components/MenuOverlay';
import AvengersOverlay from './components/AvengersOverlay';
import AvengersTimeline from './components/AvengersTimeline';
import AvengersStory from './components/AvengersStory';
import VillainSection from './components/VillainSection';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAvengersOpen, setIsAvengersOpen] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [currentTab, setCurrentTab] = useState('home'); // 'home', 'timeline', 'story', or 'villain'

  const [introPhase, setIntroPhase] = useState('start');

  const handleStartSequence = () => {
    setIntroPhase('video');
  };

  const playLogoSequence = () => {
    setIntroPhase('logo');
    // Ensure the logo animation stays on screen with impact
    setTimeout(() => {
      setIntroPhase('settle');
      // Added cinematic delay before final UI reveal
      setTimeout(() => {
        setIntroPhase('complete');
        // Auto-trigger notification dot after UI reveal
        setTimeout(() => setHasUnread(true), 2500);
      }, 2000); // 2s settle before main UI starts fade-in
    }, 3200); // 3.2s logo focus duration
  };

  const finishVideo = () => {
    playLogoSequence();
  };

  const skipSequence = () => {
    playLogoSequence();
  };

  const totalGalleryItems = 10;

  const handleNextVideo = () => {
    if (activeGalleryIndex === null) setActiveGalleryIndex(0);
    else setActiveGalleryIndex((prev) => (prev + 1) % totalGalleryItems);
    setIsVideoPlaying(true);
  };

  const handlePrevVideo = () => {
    if (activeGalleryIndex === null) setActiveGalleryIndex(totalGalleryItems - 1);
    else setActiveGalleryIndex((prev) => (prev - 1 + totalGalleryItems) % totalGalleryItems);
    setIsVideoPlaying(true);
  };

  const togglePlayPause = () => {
    if (activeGalleryIndex === null) {
      setActiveGalleryIndex(0);
      setIsVideoPlaying(true);
    } else {
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const handleNotificationClick = () => {
    setShowNotification(true);
    setHasUnread(false);
    setTimeout(() => setShowNotification(false), 3500);
  };

  return (
    <>
      {/* Cinematic Hero Intro Video Overlay */}
      {(introPhase === 'start' || introPhase === 'video') && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black">
          {introPhase === 'start' ? (
            <div className="relative flex flex-col items-center justify-center w-full h-full z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#240000] via-[#050000] to-black overflow-hidden animate-[fadeIn_2s_ease-out]">

              {/* Tactical Background Depth & Vignette */}
              <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,1)] pointer-events-none z-10"></div>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgoJPHJlY3Qgd2lkdGg9IjQiIGhlaWdodD0iMSIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjA4Ii8+Cjwvc3ZnPg==')] opacity-50 mix-blend-screen pointer-events-none z-0 transform transition-transform duration-[20s] linear"></div>

              {/* Soft Depth Light Rays */}
              <div className="absolute top-1/2 left-[20%] w-[1px] h-[200vh] bg-white -translate-y-1/2 animate-[softLightRay_8s_ease-in-out_infinite] z-0 pointer-events-none mix-blend-screen"></div>
              <div className="absolute top-1/2 right-[20%] w-[1px] h-[200vh] bg-white -translate-y-1/2 animate-[softLightRay_12s_ease-in-out_infinite_reverse] z-0 pointer-events-none mix-blend-screen"></div>

              {/* Central Light Focus behind Title */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

              {/* HUD Targeting Elements */}
              <div className="absolute inset-10 z-0 pointer-events-none border border-[#EC1D24]/10 rounded-[1px]"></div>
              <div className="absolute top-1/2 left-10 w-6 h-[1px] bg-[#EC1D24]/60 z-0"></div>
              <div className="absolute top-1/2 right-10 w-6 h-[1px] bg-[#EC1D24]/60 z-0"></div>
              <div className="absolute top-10 left-1/2 w-[1px] h-6 bg-[#EC1D24]/60 z-0"></div>
              <div className="absolute bottom-10 left-1/2 w-[1px] h-6 bg-[#EC1D24]/60 z-0"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border-[0.5px] border-[#EC1D24]/5 rounded-full scale-150 pointer-events-none"></div>

              {/* Animated HUD Scanning Line */}
              <div className="absolute left-0 w-full h-[1px] bg-[#EC1D24] shadow-[0_0_20px_rgba(236,29,36,1)] z-10 animate-[scanningLine_7s_linear_infinite] pointer-events-none"></div>

              {/* System Text (Top-Left) with Typewriter and Glitch */}
              <div className="absolute top-16 left-16 font-body text-[#EC1D24] text-[0.65rem] tracking-[0.3em] font-bold opacity-80 flex flex-col gap-3 pointer-events-none z-20">
                <div className="flex items-center gap-2 animate-[glitchFlicker_6s_infinite]">
                  <span className="w-1.5 h-1.5 bg-[#EC1D24] shadow-[0_0_10px_#EC1D24]"></span>
                  <div className="overflow-hidden whitespace-nowrap border-r-[1.5px] border-[#EC1D24] animate-[typingHUD_2.5s_steps(40,end),blink_0.75s_step-end_infinite]">
                    <span className="pr-1">SYS.VER: 4.9.0.2 // ENCRYPTION: ALPHA</span>
                  </div>
                </div>
                <span className="animate-[glitchFlicker_8s_infinite] delay-100">GLOBAL_SECURITY_GRID: ACTIVE</span>
                <span className="animate-pulse text-white mt-1">AWAITING SECURE LOCAL AUTHORIZATION...</span>
              </div>

              {/* Clearance Text (Bottom-Right) */}
              <div className="absolute bottom-16 right-16 font-body text-[#EC1D24] text-[0.65rem] tracking-[0.3em] font-bold opacity-80 text-right flex flex-col gap-2 pointer-events-none z-20 animate-[glitchFlicker_10s_infinite]">
                <span>PROJECT: PEGASUS</span>
                <span>COORD: 39.0438° N, -77.4874° W</span>
                <span>CLEARANCE LOG: TIER_7 REQUIRED</span>
              </div>

              {/* Main Center UI */}
              <div className="flex flex-col items-center justify-center gap-14 z-30 relative">
                <div className="flex flex-col items-center gap-6">
                  <div className="w-20 h-20 border-[1.5px] border-[#EC1D24]/30 rounded-full flex items-center justify-center mb-2 relative shadow-[0_0_20px_rgba(236,29,36,0.4)] bg-black/70 backdrop-blur-md">
                    <div className="w-14 h-14 border-t-[3px] border-r-[1px] border-[#EC1D24] rounded-full animate-spin"></div>
                    <div className="w-3 h-3 bg-[#EC1D24] rounded-full absolute shadow-[0_0_15px_rgba(236,29,36,1)] animate-pulse"></div>
                    <div className="absolute inset-0 rounded-full border-[0.5px] border-white/20 scale-110"></div>
                  </div>

                  <div className="flex flex-col items-center group relative cursor-default">
                    <span className="font-marvel text-7xl md:text-[9rem] tracking-[0.25em] leading-none text-center text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-700 select-none animate-[titleEntranceScale_3s_cubic-bezier(0.2,0.8,0.2,1)_forwards,glowPulseRed_5s_ease-in-out_infinite]">
                      AVENGERS INITIATIVE
                    </span>
                  </div>

                  <span className="font-label text-[0.65rem] tracking-[0.7em] text-[#EC1D24] uppercase font-bold bg-[#EC1D24]/10 px-8 py-2.5 border-[1px] border-[#EC1D24]/40 rounded-[2px] shadow-[0_0_30px_rgba(236,29,36,0.15)] backdrop-blur-xl animate-[fadeIn_4s_ease-out]">
                    Highly Classified Protocol
                  </span>
                </div>

                {/* Enhanced Access Terminal Button */}
                <button
                  onClick={handleStartSequence}
                  className="group relative px-20 py-7 overflow-visible transition-all duration-[600ms] hover:scale-[1.06] active:scale-95 active:brightness-150"
                >
                  <div className="absolute inset-0 border-[1.5px] border-[#EC1D24]/60 bg-black/80 backdrop-blur-2xl transition-all duration-500 group-hover:bg-[#EC1D24]/15 group-hover:border-[#EC1D24] group-hover:shadow-[0_0_40px_rgba(236,29,36,0.7)] rounded-[2px]"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#EC1D24]/50 to-transparent -translate-x-[150%] group-hover:animate-[shimmer_2s_infinite]"></div>

                  <span className="relative font-label font-bold tracking-[0.7em] uppercase text-[0.85rem] text-[#EC1D24] group-hover:text-white transition-colors duration-500 drop-shadow-[0_0_15px_rgba(236,29,36,0.9)] flex items-center gap-4">
                    Access Terminal <span className="material-symbols-outlined text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-light drop-shadow-[0_0_15px_rgba(255,255,255,1)]">fingerprint</span>
                  </span>

                  {/* Aggressive Tactical Bracket Corners */}
                  <div className="absolute -top-2 -left-2 w-5 h-5 border-t-[3px] border-l-[3px] border-[#EC1D24] transition-all duration-500 group-hover:scale-110 group-hover:-translate-x-1 group-hover:-translate-y-1 drop-shadow-[0_0_10px_rgba(236,29,36,0.5)]"></div>
                  <div className="absolute -top-2 -right-2 w-5 h-5 border-t-[3px] border-r-[3px] border-[#EC1D24] transition-all duration-500 group-hover:scale-110 group-hover:translate-x-1 group-hover:-translate-y-1 drop-shadow-[0_0_10px_rgba(236,29,36,0.5)]"></div>
                  <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-[3px] border-l-[3px] border-[#EC1D24] transition-all duration-500 group-hover:scale-110 group-hover:-translate-x-1 group-hover:translate-y-1 drop-shadow-[0_0_10px_rgba(236,29,36,0.5)]"></div>
                  <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-[3px] border-r-[3px] border-[#EC1D24] transition-all duration-500 group-hover:scale-110 group-hover:translate-x-1 group-hover:translate-y-1 drop-shadow-[0_0_10px_rgba(236,29,36,0.5)]"></div>
                </button>
              </div>
            </div>
          ) : (
            <>
              <video
                src="https://res.cloudinary.com/ds1mlkugo/video/upload/f_auto,q_auto/v1776279018/intro_zr1f2r.mp4"
                autoPlay
                playsInline
                onEnded={finishVideo}
                className="absolute inset-0 w-full h-full object-cover animate-[fadeIn_0.5s_ease-out]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-[#00000000] to-[rgba(0,0,0,0.8)] pointer-events-none z-[205]"></div>
              <button
                onClick={skipSequence}
                className="absolute bottom-12 right-12 text-white/50 hover:text-white font-label font-bold tracking-[0.4em] text-[0.65rem] uppercase flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 group z-[210] animate-[fadeIn_2s_ease-out] bg-black/40 px-6 py-3 rounded-full backdrop-blur-md border border-white/10 hover:border-white/30"
              >
                SKIP SEQUENCE <span className="material-symbols-outlined text-[1rem] group-hover:translate-x-1.5 transition-transform" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}>arrow_forward</span>
              </button>
            </>
          )}
        </div>
      )}

      <div className="paper-grain z-[-2]"></div>

      <div
        className={`fixed inset-0 pointer-events-none flex items-center justify-center transition-all ease-in-out
          ${introPhase === 'start' || introPhase === 'video' ? 'opacity-0 scale-50 z-[-1]' : ''}
          ${introPhase === 'logo' ? 'opacity-100 scale-[1.05] z-[150] filter grayscale invert drop-shadow-[0_0_120px_rgba(236,29,36,0.9)] duration-[1500ms] blur-none' : ''}
          ${introPhase === 'settle' || introPhase === 'complete' ? 'opacity-[0.08] blur-[1.5px] scale-[1.3] z-[-1] filter grayscale invert drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] duration-[2000ms]' : ''}
        `}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Marvel%27s_The_Avengers_logo.svg"
          alt="Avengers Background"
          className="w-[850px] object-contain mix-blend-screen"
        />
      </div>

      {/* Main UI Reveal Wrapper */}
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={(tab) => setCurrentTab(tab)}
      />
      <AvengersOverlay isOpen={isAvengersOpen} onClose={() => setIsAvengersOpen(false)} />

      {/* Main UI Reveal Wrapper (Optimized for scrolling content) */}
      <div className={`transition-all duration-[1500ms] ${introPhase === 'complete' ? 'reveal-complete reveal-wrapper active pointer-events-auto' : 'reveal-sequence reveal-wrapper pointer-events-none'} flex flex-col w-full min-h-screen relative pt-[80px]`}>

        {currentTab === 'home' && (
          <div className="transition-all duration-1000 ease-in-out transform animate-[fadeIn_0.5s_ease-out]">
            <Gallery
              activeGalleryIndex={activeGalleryIndex}
              setActiveGalleryIndex={setActiveGalleryIndex}
              isVideoPlaying={isVideoPlaying}
            />
          </div>
        )}

        {currentTab === 'timeline' && (
          <div className="transition-all duration-1000 ease-in-out transform animate-[fadeIn_0.5s_ease-out]">
            <AvengersTimeline onClose={() => setCurrentTab('home')} />
          </div>
        )}

        {currentTab === 'story' && (
          <AvengersStory onClose={() => setCurrentTab('home')} />
        )}

        {currentTab === 'villain' && (
          <VillainSection onClose={() => setCurrentTab('home')} />
        )}
      </div>

      {/* Persistent UI Elements (Outside filter wrapper to fix position issues) */}
      <div className={`transition-opacity duration-[2000ms] ${introPhase === 'complete' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* TopNavBar */}
        <header className="bg-black/60 backdrop-blur-xl text-white docked full-width top-0 border-b border-white/5 flex items-center w-full px-6 md:px-12 h-[72px] md:h-[80px] max-w-none fixed z-[100] justify-between pointer-events-none transition-all duration-500">
          {/* Left Section: Logo */}
          <div className="flex items-center pointer-events-auto cursor-pointer group shrink-0" onClick={() => setCurrentTab('home')}>
            <div className="bg-[#EC1D24] px-2 pt-1.5 pb-1 flex items-center justify-center group-hover:brightness-125 transition-all shadow-[0_0_20px_rgba(236,29,36,0.3)]">
              <span className="font-marvel text-3xl md:text-5xl text-white tracking-[-0.02em] leading-none uppercase mix-blend-screen scale-y-110">MARVEL</span>
            </div>
          </div>

          {/* Center Section: Main Nav (Hidden on Mobile) */}
          <nav className="hidden lg:flex items-center gap-10 pointer-events-auto absolute left-1/2 -translate-x-1/2">
            {['home', 'timeline', 'story', 'villain'].map((tab, idx) => (
              <React.Fragment key={tab}>
                <button 
                  onClick={() => setCurrentTab(tab)}
                  className={`font-label text-[0.7rem] tracking-[0.4em] uppercase font-bold transition-all duration-500 hover:text-[#EC1D24] px-2 py-4 ${currentTab === tab ? 'text-[#EC1D24]' : 'text-gray-400'}`}
                >
                  {tab}
                </button>
                {idx !== 3 && <span className="text-white/10 font-light select-none">|</span>}
              </React.Fragment>
            ))}
          </nav>

          {/* Right Section: Tools */}
          <div className="flex items-center gap-4 md:gap-10 pointer-events-auto">
            <button 
              className="relative touch-target rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 group"
              onClick={handleNotificationClick}
              aria-label="Notifications"
            >
              <span className="material-symbols-outlined text-[1.5rem] md:text-[2rem] text-gray-300 group-hover:text-white transition-all duration-500 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}>notifications</span>
              
              {hasUnread && (
                <div className="absolute top-2 right-2 w-[7px] h-[7px] bg-[#ed1d24] rounded-full shadow-[0_0_15px_rgba(237,29,36,0.9)] animate-pulse"></div>
              )}
            </button>

            <button 
              className="touch-target hover:text-[#EC1D24] transition-all duration-300 active:scale-90" 
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open Menu"
            >
              <span className="material-symbols-outlined font-light text-[1.8rem] md:text-[2.2rem]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}>menu</span>
            </button>
          </div>
        </header>

        {/* Footer */}
        {currentTab === 'home' && (
          <footer className="fixed bottom-0 left-0 w-full z-[80] flex flex-col md:flex-row justify-between items-center px-12 pb-12 bg-transparent text-gray-300 gap-8 md:gap-0 pointer-events-none transition-all duration-500 animate-[fadeIn_0.5s_ease-out]">
            <div
              className="flex items-center gap-3 group cursor-pointer pointer-events-auto"
              onClick={() => setIsAvengersOpen(true)}
            >
              <span className="material-symbols-outlined text-gray-400 group-hover:text-[#EC1D24] transition-colors duration-600" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}>volume_up</span>
              <span className="font-label uppercase tracking-[0.05em] text-[0.6875rem] text-gray-400 group-hover:text-[#EC1D24] transition-colors duration-600">
                SEE ALL 15 AVENGERS
              </span>
            </div>
            <div className="flex items-center gap-8 pointer-events-auto">
              <div className="flex gap-4 items-center">
                <button onClick={handlePrevVideo} className="hover:text-[#EC1D24] transition-colors duration-600 active:scale-95 hidden md:block">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}>skip_previous</span>
                </button>
                <button onClick={togglePlayPause} className="hover:text-[#EC1D24] transition-colors duration-600 active:scale-95">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}>{isVideoPlaying && activeGalleryIndex !== null ? 'pause' : 'play_arrow'}</span>
                </button>
                <button onClick={handleNextVideo} className="hover:text-[#EC1D24] transition-colors duration-600 active:scale-95">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}>skip_next</span>
                </button>
              </div>
            </div>
          </footer>
        )}

        {/* Toast Notification Container */}
        <div
          className={`fixed top-32 right-12 z-[120] w-[380px] bg-[#0a0a0a]/80 backdrop-blur-2xl rounded-2xl border border-white/5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)] px-6 py-5 flex items-start gap-4 transition-all duration-500 ease-out transform ${showNotification ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-8 opacity-0 scale-95 pointer-events-none'
            }`}
        >
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
            <span className="material-symbols-outlined text-[#EC1D24] text-[1.5rem] font-light" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}>priority_high</span>
          </div>

          <div className="flex flex-col w-full pr-2">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EC1D24] shadow-[0_0_8px_#EC1D24] animate-pulse"></span>
              <span className="font-label font-medium text-[0.6rem] tracking-[0.25em] text-[#EC1D24] uppercase">S.H.I.E.L.D. SECURE LINK</span>
            </div>
            <span className="font-label text-base tracking-[0.05em] text-white font-medium mb-1">Classified Assets Unlocked</span>
            <span className="font-body text-[0.85rem] text-gray-400 leading-relaxed">Level 7 clearance granted. Full Avengers database is now streaming to your local terminal.</span>
          </div>

          <button
            className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-gray-500 hover:text-white transition-colors duration-300"
            onClick={() => setShowNotification(false)}
          >
            <span className="material-symbols-outlined text-[1.1rem] font-light">close</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
