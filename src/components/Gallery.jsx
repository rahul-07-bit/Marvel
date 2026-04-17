import React, { useRef, useState } from 'react';

const GalleryCard = ({ heightClass, imgSrc, videoSrc, colIndex, globalOverlayVideo, setActiveGalleryIndex, characterName, setHoveredChar, activeGalleryIndex, isVideoPlaying }) => {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 1024 || ('ontouchstart' in window));
    }
  }, []);

  if (!videoSrc || !imgSrc) return <div className="hidden">Loading...</div>; // React Safety Fallback

  const isGlobal = !!globalOverlayVideo;
  const currentVideoSrc = isGlobal ? globalOverlayVideo : videoSrc;
  const isActiveCard = activeGalleryIndex === colIndex;

  const positionPercent = colIndex * (100 / 9);
  const objectPosition = `${positionPercent}% center`;

  // Desktop Handlers
  const handleMouseEnter = () => {
    if (isGlobal || isMobile) return;
    setIsHovered(true);
    setHoveredChar(characterName);
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(e => console.log("Video autoplay failed", e));
    }
  };

  const handleMouseLeave = () => {
    if (isGlobal || isMobile) return;
    setIsHovered(false);
    setHoveredChar(null);
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleDoubleClick = (e) => {
    if (isMobile) return; // Prevent native double-click conflicts on mobile
    e.stopPropagation();
    if (activeGalleryIndex === colIndex) return;

    // Explicitly command audio ON during physical user event (Browser Policy)
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 1;
      videoRef.current.play().catch(console.error);
    }
    setActiveGalleryIndex(colIndex);
  };

  // Mobile Tap Handler
  const handleClick = (e) => {
    e.stopPropagation();
    if (!isMobile) return; // Desktop uses hover + double click

    if (!isHovered) {
      // First tap -> play preview video (silent)
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent('mobileTapSync', { detail: colIndex }));
      }
      setIsHovered(true);
      setHoveredChar(characterName);
      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.play().catch(console.error);
      }
    } else {
      // Second tap -> expand and play full video with sound
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.volume = 1;
        videoRef.current.play().catch(console.error);
      }
      setActiveGalleryIndex(colIndex);
    }
  };

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const handleMobileChange = (e) => {
      if (e.detail !== colIndex && isHovered && isMobile) {
        setIsHovered(false);
        if (videoRef.current && !isGlobal) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }
    };
    window.addEventListener('mobileTapSync', handleMobileChange);
    return () => window.removeEventListener('mobileTapSync', handleMobileChange);
  }, [isHovered, colIndex, isGlobal, isMobile]);

  React.useEffect(() => {
    if (isGlobal) {
      if (videoRef.current) {
        videoRef.current.muted = !isActiveCard; 
        if (isVideoPlaying) videoRef.current.play().catch(console.error);
        else videoRef.current.pause();
      }
    } else {
      if (videoRef.current) {
        if (!isHovered) {
          videoRef.current.pause();
        } else {
          videoRef.current.muted = true;
          videoRef.current.play().catch(console.error);
        }
      }
    }
  }, [isGlobal, isHovered, isVideoPlaying, currentVideoSrc]);

  const [videoError, setVideoError] = useState(false);
  const showVideoEffect = (isGlobal || isHovered) && !videoError;

  const handleVideoError = (e) => {
    console.error("Production Network failure. Attempting manual URL fallback render:", currentVideoSrc, e.target?.error);
    setVideoError(true);
  };

  return (
    <div
      className={`gallery-card-wrapper ${heightClass} w-full max-w-[80px] bg-[#1c1c1c] overflow-hidden relative group cursor-pointer`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
    >
      <video
        ref={videoRef}
        loop={!isGlobal}
        muted={!isActiveCard}
        controls={isActiveCard}
        playsInline
        webkit-playsinline="true"
        preload="metadata"
        crossOrigin="anonymous"
        onError={handleVideoError}
        className={`gallery-video absolute inset-0 w-full h-full object-cover ghost-filter transition-opacity duration-300 ease-in-out ${showVideoEffect ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        style={isGlobal ? { objectPosition: objectPosition } : {}}
      >
        <source src={currentVideoSrc} type="video/mp4" />
      </video>
      <img
        src={imgSrc}
        loading="lazy"
        className={`absolute inset-0 w-full h-full object-cover ghost-filter transition-opacity duration-300 ease-in-out ${showVideoEffect ? 'opacity-0 z-0' : 'opacity-100 z-10'}`}
        alt="Gallery character"
        style={isGlobal ? { opacity: 0 } : {}}
      />
    </div>
  );
};

export default function Gallery({ activeGalleryIndex, setActiveGalleryIndex, isVideoPlaying }) {
  const [hoveredChar, setHoveredChar] = useState(null);

  const GALLERY_VIDEOS = [
    "https://res.cloudinary.com/ds1mlkugo/video/upload/f_mp4,q_40/v1776316291/hulk_2_buxhrz.mp4",
    "https://res.cloudinary.com/ds1mlkugo/video/upload/f_mp4,q_40/v1776279038/captainamerica_wwdjft.mp4",
    "https://res.cloudinary.com/ds1mlkugo/video/upload/f_mp4,q_40/v1776317310/thor_2_ybsvtb.mp4",
    "https://res.cloudinary.com/ds1mlkugo/video/upload/f_mp4,q_40/v1776279052/blackpanther_ysbqe1.mp4",
    "https://res.cloudinary.com/ds1mlkugo/video/upload/f_mp4,q_40/v1776279051/Deadpool_xfnekw.mp4",
    "https://res.cloudinary.com/ds1mlkugo/video/upload/f_mp4,q_40/v1776279112/venom_aolqww.mp4",
    "https://res.cloudinary.com/ds1mlkugo/video/upload/f_mp4,q_40/v1776279048/moonknight_y6pxim.mp4",
    "https://res.cloudinary.com/ds1mlkugo/video/upload/f_mp4,q_40/v1776279096/drstrange_gmejw5.mp4",
    "https://res.cloudinary.com/ds1mlkugo/video/upload/f_mp4,q_40/v1776314858/spiderman_nnpedk.mp4",
    "https://res.cloudinary.com/ds1mlkugo/video/upload/f_mp4,q_40/v1776279047/loki_zhxgcu.mp4"
  ];

  const GALLERY_CHARS = [
    "HULK", "CAPTAIN AMERICA", "THOR", "BLACK PANTHER", "DEADPOOL", "VENOM", "MOON KNIGHT", "DOCTOR STRANGE", "SPIDER-MAN", "LOKI"
  ];

  const globalOverlayVideo = activeGalleryIndex !== null ? GALLERY_VIDEOS[activeGalleryIndex] : null;

  React.useEffect(() => {
    if (typeof document === "undefined") return;
    
    const handleEsc = (e) => {
      if (e.key === 'Escape') setActiveGalleryIndex(null);
    };
    const handleOutside = (e) => {
      if (!e.target.closest('.group') && !e.target.closest('footer')) {
        setActiveGalleryIndex(null);
      }
    };
    document.addEventListener('keydown', handleEsc);
    document.addEventListener('click', handleOutside);
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('click', handleOutside);
    };
  }, [setActiveGalleryIndex]);

  // Master-slave sync intentionally bypassed per architectural directive

  const activeText = activeGalleryIndex !== null ? GALLERY_CHARS[activeGalleryIndex] : (hoveredChar || "AVENGERS INITIATIVE");

  return (
    <main className="relative h-full min-h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center pt-8">
      <div className="arch-container w-full max-w-[90vw] px-12">
        {/* Col 0: Hulk */}
        <GalleryCard
          colIndex={0}
          globalOverlayVideo={globalOverlayVideo}
          setActiveGalleryIndex={setActiveGalleryIndex}
          activeGalleryIndex={activeGalleryIndex}
          isVideoPlaying={isVideoPlaying}
          characterName="HULK"
          setHoveredChar={setHoveredChar}
          heightClass="h-[35%]"
          imgSrc="/images/hulk.jpg"
          videoSrc="https://res.cloudinary.com/ds1mlkugo/video/upload/f_mp4,q_40/v1776316291/hulk_2_buxhrz.mp4"
        />
        {/* Col 1: Captain America */}
        <GalleryCard
          colIndex={1}
          globalOverlayVideo={globalOverlayVideo}
          setActiveGalleryIndex={setActiveGalleryIndex}
          activeGalleryIndex={activeGalleryIndex}
          isVideoPlaying={isVideoPlaying}
          characterName="CAPTAIN AMERICA"
          setHoveredChar={setHoveredChar}
          heightClass="h-[45%]"
          imgSrc="/images/captainamerica.jpg"
          videoSrc="https://res.cloudinary.com/ds1mlkugo/video/upload/f_mp4,q_40/v1776279038/captainamerica_wwdjft.mp4"
        />
        {/* Col 2: Thor */}
        <GalleryCard
          colIndex={2}
          globalOverlayVideo={globalOverlayVideo}
          setActiveGalleryIndex={setActiveGalleryIndex}
          activeGalleryIndex={activeGalleryIndex}
          isVideoPlaying={isVideoPlaying}
          characterName="THOR"
          setHoveredChar={setHoveredChar}
          heightClass="h-[55%]"
          imgSrc="/images/thor.jpg"
          videoSrc="https://res.cloudinary.com/ds1mlkugo/video/upload/f_mp4,q_40/v1776317310/thor_2_ybsvtb.mp4"
        />
        {/* Col 3: Black Panther */}
        <GalleryCard
          colIndex={3}
          globalOverlayVideo={globalOverlayVideo}
          setActiveGalleryIndex={setActiveGalleryIndex}
          activeGalleryIndex={activeGalleryIndex}
          isVideoPlaying={isVideoPlaying}
          characterName="BLACK PANTHER"
          setHoveredChar={setHoveredChar}
          heightClass="h-[65%]"
          imgSrc="/images/blackpanther.jpg"
          videoSrc="https://res.cloudinary.com/ds1mlkugo/video/upload/f_mp4,q_40/v1776279052/blackpanther_ysbqe1.mp4"
        />
        {/* Col 4: Deadpool */}
        <GalleryCard
          colIndex={4}
          globalOverlayVideo={globalOverlayVideo}
          setActiveGalleryIndex={setActiveGalleryIndex}
          activeGalleryIndex={activeGalleryIndex}
          isVideoPlaying={isVideoPlaying}
          characterName="DEADPOOL"
          setHoveredChar={setHoveredChar}
          heightClass="h-[75%]"
          imgSrc="/images/deadpool.jpg"
          videoSrc="https://res.cloudinary.com/ds1mlkugo/video/upload/f_mp4,q_40/v1776279051/Deadpool_xfnekw.mp4"
        />

        {/* Central Gap with Vertical Text */}
        <div className="flex flex-col items-center justify-center px-8 h-full">
          <h1 className="vertical-text font-headline text-gray-400 tracking-[0.4em] text-sm uppercase font-semibold leading-none transition-all duration-300">
            {activeText}
          </h1>
        </div>

        {/* Col 5: Venom */}
        <GalleryCard
          colIndex={5}
          globalOverlayVideo={globalOverlayVideo}
          setActiveGalleryIndex={setActiveGalleryIndex}
          activeGalleryIndex={activeGalleryIndex}
          isVideoPlaying={isVideoPlaying}
          characterName="VENOM"
          setHoveredChar={setHoveredChar}
          heightClass="h-[75%]"
          imgSrc="/images/venom.jpg"
          videoSrc="https://res.cloudinary.com/ds1mlkugo/video/upload/f_mp4,q_40/v1776279112/venom_aolqww.mp4"
        />
        {/* Col 6: Moon Knight */}
        <GalleryCard
          colIndex={6}
          globalOverlayVideo={globalOverlayVideo}
          setActiveGalleryIndex={setActiveGalleryIndex}
          activeGalleryIndex={activeGalleryIndex}
          isVideoPlaying={isVideoPlaying}
          characterName="MOON KNIGHT"
          setHoveredChar={setHoveredChar}
          heightClass="h-[65%]"
          imgSrc="/images/moonknight.jpg"
          videoSrc="https://res.cloudinary.com/ds1mlkugo/video/upload/f_mp4,q_40/v1776279048/moonknight_y6pxim.mp4"
        />
        {/* Col 7: Doctor Strange */}
        <GalleryCard
          colIndex={7}
          globalOverlayVideo={globalOverlayVideo}
          setActiveGalleryIndex={setActiveGalleryIndex}
          activeGalleryIndex={activeGalleryIndex}
          isVideoPlaying={isVideoPlaying}
          characterName="DOCTOR STRANGE"
          setHoveredChar={setHoveredChar}
          heightClass="h-[55%]"
          imgSrc="/images/doctorstrange.png"
          videoSrc="https://res.cloudinary.com/ds1mlkugo/video/upload/f_mp4,q_40/v1776279096/drstrange_gmejw5.mp4"
        />
        {/* Col 8: Spider-Man */}
        <GalleryCard
          colIndex={8}
          globalOverlayVideo={globalOverlayVideo}
          setActiveGalleryIndex={setActiveGalleryIndex}
          activeGalleryIndex={activeGalleryIndex}
          isVideoPlaying={isVideoPlaying}
          characterName="SPIDER-MAN"
          setHoveredChar={setHoveredChar}
          heightClass="h-[45%]"
          imgSrc="/images/spiderman.jpg"
          videoSrc="https://res.cloudinary.com/ds1mlkugo/video/upload/f_mp4,q_40/v1776314858/spiderman_nnpedk.mp4"
        />
        {/* Col 9: Loki */}
        <GalleryCard
          colIndex={9}
          globalOverlayVideo={globalOverlayVideo}
          setActiveGalleryIndex={setActiveGalleryIndex}
          activeGalleryIndex={activeGalleryIndex}
          isVideoPlaying={isVideoPlaying}
          characterName="LOKI"
          setHoveredChar={setHoveredChar}
          heightClass="h-[35%]"
          imgSrc="/images/loki.jpg"
          videoSrc="https://res.cloudinary.com/ds1mlkugo/video/upload/f_mp4,q_40/v1776279047/loki_zhxgcu.mp4"
        />
      </div>
      <div className="mt-12 text-center z-10 px-4">
        <p className="font-label text-[0.6875rem] uppercase tracking-[0.2em] text-gray-500 mb-4">
          ASSEMBLE THE TEAM. SAVE THE WORLD.
        </p>
        <h2 className="font-signature text-6xl md:text-7xl text-[#EC1D24] leading-none mb-12">
          The Earth's Mightiest
        </h2>
      </div>
    </main>
  );
}
