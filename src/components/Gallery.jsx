import React, { useRef, useState } from 'react';

const GalleryCard = ({ heightClass, imgSrc, videoSrc, colIndex, globalOverlayVideo, setActiveGalleryIndex, characterName, setHoveredChar, activeGalleryIndex, isVideoPlaying }) => {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const isGlobal = !!globalOverlayVideo;
  const currentVideoSrc = isGlobal ? globalOverlayVideo : videoSrc;

  const positionPercent = colIndex * (100 / 9);
  const objectPosition = `${positionPercent}% center`;

  const [isMobile, setIsMobile] = useState(false);
  React.useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);

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

  const handleClick = (e) => {
    e.stopPropagation();
    if (activeGalleryIndex === colIndex) return;
    setActiveGalleryIndex(colIndex);
  };

  React.useEffect(() => {
    if (isGlobal) {
      if (videoRef.current) {
        if (isVideoPlaying) videoRef.current.play().catch(console.error);
        else videoRef.current.pause();
      }
    } else {
      if (videoRef.current) {
        if (!isHovered) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        } else {
          videoRef.current.muted = true;
          videoRef.current.play().catch(console.error);
        }
      }
    }
  }, [isGlobal, isHovered, isVideoPlaying, currentVideoSrc]);

  const showVideo = (isGlobal || isHovered) && !isMobile;

  return (
    <div
      className={`gallery-card-wrapper ${heightClass} w-full max-w-[80px] bg-[#1c1c1c] overflow-hidden relative group cursor-pointer`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {showVideo && (
        <video
          ref={videoRef}
          src={currentVideoSrc}
          loop
          muted
          playsInline
          preload="none"
          className={`gallery-video absolute inset-0 w-full h-full object-cover ghost-filter transition-opacity duration-500 ease-in-out ${showVideo ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          style={isGlobal ? { objectPosition: objectPosition } : {}}
        />
      )}
      <img
        src={imgSrc}
        loading="lazy"
        className={`absolute inset-0 w-full h-full object-cover ghost-filter transition-opacity duration-500 ease-in-out ${showVideo ? 'opacity-0 z-0' : 'opacity-100 z-10'}`}
        alt="Gallery character"
        style={isGlobal ? { opacity: 0 } : {}}
      />
    </div>
  );
};

export default function Gallery({ activeGalleryIndex, setActiveGalleryIndex, isVideoPlaying }) {
  const [hoveredChar, setHoveredChar] = useState(null);

  const GALLERY_VIDEOS = [
    "https://res.cloudinary.com/ds1mlkugo/video/upload/f_auto,q_auto/v1776316291/hulk_2_buxhrz.mp4",
    "https://res.cloudinary.com/ds1mlkugo/video/upload/f_auto,q_auto/v1776279038/captainamerica_wwdjft.mp4",
    "https://res.cloudinary.com/ds1mlkugo/video/upload/f_auto,q_auto/v1776317310/thor_2_ybsvtb.mp4",
    "https://res.cloudinary.com/ds1mlkugo/video/upload/f_auto,q_auto/v1776279052/blackpanther_ysbqe1.mp4",
    "https://res.cloudinary.com/ds1mlkugo/video/upload/f_auto,q_auto/v1776279051/Deadpool_xfnekw.mp4",
    "https://res.cloudinary.com/ds1mlkugo/video/upload/f_auto,q_auto/v1776279112/venom_aolqww.mp4",
    "https://res.cloudinary.com/ds1mlkugo/video/upload/f_auto,q_auto/v1776279048/moonknight_y6pxim.mp4",
    "https://res.cloudinary.com/ds1mlkugo/video/upload/f_auto,q_auto/v1776279096/drstrange_gmejw5.mp4",
    "https://res.cloudinary.com/ds1mlkugo/video/upload/f_auto,q_auto/v1776314858/spiderman_nnpedk.mp4",
    "https://res.cloudinary.com/ds1mlkugo/video/upload/f_auto,q_auto/v1776279047/loki_zhxgcu.mp4"
  ];

  const GALLERY_CHARS = [
    "HULK", "CAPTAIN AMERICA", "THOR", "BLACK PANTHER", "DEADPOOL", "VENOM", "MOON KNIGHT", "DOCTOR STRANGE", "SPIDER-MAN", "LOKI"
  ];

  const globalOverlayVideo = activeGalleryIndex !== null ? GALLERY_VIDEOS[activeGalleryIndex] : null;

  React.useEffect(() => {
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

  // Synchronized startup
  React.useEffect(() => {
    if (activeGalleryIndex !== null) {
      setTimeout(() => {
        document.querySelectorAll('.gallery-video').forEach((video, index) => {
          video.muted = index !== activeGalleryIndex;
          video.currentTime = 0;
          if (isVideoPlaying) video.play().catch(console.error);
        });
      }, 50);
    }
  }, [activeGalleryIndex]); // Specifically execute sync loop solely when the index transitions

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
          videoSrc="https://res.cloudinary.com/ds1mlkugo/video/upload/f_auto,q_auto/v1776316291/hulk_2_buxhrz.mp4"
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
          imgSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuAZgf6hMEWbMzaPO8cGrXqA8Z1-DX2GhoxrfuzELYxf3FM4xDAwVv_E37itjupgiTp6sXpOTYT-nVSYr5coXxBTlmZ6hFnEyvo3OvVZzFdPBksjSxnPBHSLCLB7DVCoisGNAdWn21EDT0NK5si9QU4qvcnx8m6DSqbb0yz9WABRNeIeziEKWdZLBNe-am0jbIHWqrfBvMg-HEUCRBMN_gjWSKb7V1UHKNnY8zSBSvNJEhURMqMHBhi90OT39NQda-i5VcU49VS8vaU"
          videoSrc="https://res.cloudinary.com/ds1mlkugo/video/upload/f_auto,q_auto/v1776279038/captainamerica_wwdjft.mp4"
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
          imgSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuD5j-DsJwZppBYmfSqouvUfdHcQUzGVYlUnkXPgkZ40_DonUyEX-yO7EdinhuyqRJN4X9titaI3VtWv1MbbU7w3gt1Od9HYcsFHGUxWqGEXgTttXaV8Ace-zXU1N3Lo8CIdTn7DxftqXPLVCURMZOuPDKsYvZbl5eEH4j3EsYfKxUaSieoa5wXHuCEHPNbjK71QgDugMe2oki_d6k85i2vaAf2Nn2SJpBA8T_YySpWNZvCpDAZcCH8NV8bF1d-0_MECKEm31RaaPpA"
          videoSrc="https://res.cloudinary.com/ds1mlkugo/video/upload/f_auto,q_auto/v1776317310/thor_2_ybsvtb.mp4"
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
          videoSrc="https://res.cloudinary.com/ds1mlkugo/video/upload/f_auto,q_auto/v1776279052/blackpanther_ysbqe1.mp4"
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
          videoSrc="https://res.cloudinary.com/ds1mlkugo/video/upload/f_auto,q_auto/v1776279051/Deadpool_xfnekw.mp4"
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
          imgSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBcVP6H6Dp2HuHw1bhSw4u4wOjTIwFzDvu9CEa8MhU3FwH3qthDhoCOVdtdPr02FGEhnrJWpmq6M5rtHMcMto48tvMO6L_tSEK1VL4joB7xuTivGZ9x8N_zCYoAdJZnVVrNsU7kXrtgEnVVNEfecQqimAOiB-Aw58OeomUuKZ0y1HpoPjLwQ05VVxtJCYVFPTk6uz0vpErRD4THiJp0Ifl4JB1a8hRa653y3KeTQeHa83WZAXQC5_T2nvyrDfJfm5ncp-e3go5Ie0s"
          videoSrc="https://res.cloudinary.com/ds1mlkugo/video/upload/f_auto,q_auto/v1776279112/venom_aolqww.mp4"
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
          imgSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuCop0m3K06H9xr8rcZQKiLFcFMnlUaotY3m7qUzNoQbnxvviJKbZJXcm6dgWkIm5v7bZQu_7vDBibOMQapMeJtwo9ENkbt7CLqtL6veBE5iZPpGhpmJtmcV225W-WSFUotPNv2s-LhLuh5GGkgc2FmePoaXTvFzvzozAK7O2zryTuN0lCPopwUR3d8on9KUTzRwLY9R3HE7KREkM2LzllSiEj3Ez4wHPPYc_72j6q4KxlfqDc7dYn2ACqzunf20hZsROX2Xm1qMU4k"
          videoSrc="https://res.cloudinary.com/ds1mlkugo/video/upload/f_auto,q_auto/v1776279048/moonknight_y6pxim.mp4"
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
          videoSrc="https://res.cloudinary.com/ds1mlkugo/video/upload/f_auto,q_auto/v1776279096/drstrange_gmejw5.mp4"
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
          videoSrc="https://res.cloudinary.com/ds1mlkugo/video/upload/f_auto,q_auto/v1776314858/spiderman_nnpedk.mp4"
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
          imgSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuDWWw6MyqxUPjUcWCOiZ9KJVaVOZTj-aq_DlCj_i0fP9ipdywi17gNIUxde8ltrk5AIpx1-YgBKs783gDNe5Fr-6zkixPMzKuUXwHG3XQ8z-yScF75_szg3NFm2KM40OYNibPqW4ri4aOrJU5YBwWzt0me6Rgf10d8YWSbSqzKa2OktZRWHMlEYWA7cuIu389YimlcIzbCv7yTtkOd-kjKHt4Z-B6nzwWyFsVIrZah6P_1R31HUP1UXNoueJ1hoO8cB8sg7OokzliQ"
          videoSrc="https://res.cloudinary.com/ds1mlkugo/video/upload/f_auto,q_auto/v1776279047/loki_zhxgcu.mp4"
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
