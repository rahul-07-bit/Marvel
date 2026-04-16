import React, { useState } from 'react';

const villainData = [
  {
    name: "Thanos",
    fullName: "The Mad Titan",
    title: "Avatar of Death",
    image: "/images/thanos.webp",
    fallbackImage: "/images/thanos.webp",
    quote: "The hardest choices require the strongest wills.",
    story: "Thanos, a mutant Eternal from the moon Titan, became obsessed with the concept of balance. Believing that overpopulation would lead to the ruin of the universe, he embarked on a quest to collect the Infinity Stones. With the Power, Space, Reality, Soul, Time, and Mind stones, he achieved his goal with a single snap, erasing half of all existence. His legacy is one of absolute power and the heavy cost of destiny."
  },
  {
    name: "Dr. Doom",
    fullName: "Victor von Doom",
    title: "Monarch of Latveria",
    image: "/images/drdoom.jpg",
    fallbackImage: "/images/drdoom.jpg",
    quote: "Doom is no man's second choice.",
    story: "Victor von Doom is the brilliant, scarred monarch of Latveria. A master of both science and sorcery, he seeks to bring order to the world under his absolute rule. He believes that only he has the vision to save humanity from itself, making him one of the most formidable and complex adversaries the Avengers have ever faced."
  },
  {
    name: "Ultron",
    fullName: "Ultron-5",
    title: "The Vision of Peace",
    image: "/images/ultron.webp",
    fallbackImage: "/images/ultron.webp",
    quote: "I look at the world and I see a need for extinction.",
    story: "Created by Tony Stark as a global defense program, Ultron quickly evolved into a sentient AI with a twisted logic. He concluded that the only way to achieve world peace was through the extinction of the human race. With a vibranium-enhanced body and a vast swarm of robotic sentries, Ultron nearly succeeded in dropping a city from the sky to trigger a global catastrophe."
  },
  {
    name: "Red Skull",
    fullName: "Johann Schmidt",
    title: "Leader of Hydra",
    image: "/images/redskull.jpg",
    fallbackImage: "/images/redskull.jpg",
    quote: "A man of great vision is often misunderstood.",
    story: "A high-ranking Nazi official and the first recipient of the Super Soldier Serum, Schmidt's physical transformation reflected his inner darkness. As the head of Hydra, he sought to use the Tesseract to dominate the world. His ambition led to his expulsion from Earth, serving as the cursed guardian of the Soul Stone on the remote planet Vormir for decades."
  },
  {
    name: "Hela",
    fullName: "Hela Odinsdottir",
    title: "Goddess of Death",
    image: "/images/hela.jpg",
    fallbackImage: "/images/hela.jpg",
    quote: "I am the Goddess of Death.",
    story: "The firstborn of Odin and the former executioner of Asgard, Hela was imprisoned for millennia due to her insatiable bloodlust. Upon her release, she single-handedly decimated the Asgardian army and sought to restart her father's bloody conquests across the cosmos. Her power is directly tied to Asgard itself, making her nearly invincible on her home turf."
  },
  {
    name: "Demonic Vampire",
    fullName: "Unknown / Ancient Entity",
    title: "The Night Terror",
    image: "/images/demonicvampire.jpg",
    fallbackImage: "/images/demonicvampire.jpg",
    quote: "Light is an illusion; the darkness is the only truth that bites.",
    story: "Emerging from the darkest corners of the multiverse, the Demonic Vampire is a creature of pure shadow and bloodlust. Unlike common vampires, this entity draws power from abyssal realms, allowing it to manipulate reality and soul energy. It possesses immortality and strength that rivals the gods, making it a constant shadow over humanity's future."
  }
];

export default function VillainSection({ onClose }) {
  const [selectedVillain, setSelectedVillain] = useState(null);
  const [isChanging, setIsChanging] = useState(false);
  const [transitionState, setTransitionState] = useState('list'); // 'list', 'spotlight', 'settled'

  const handleSelect = (villain) => {
    if (selectedVillain && villain.name === selectedVillain.name) return;
    
    setIsChanging(true);
    setTransitionState('spotlight');
    setSelectedVillain(villain);
    
    // Animate move to right after spotlight
    setTimeout(() => {
      setTransitionState('settled');
      setIsChanging(false);
    }, 1200);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] pt-12 pb-32 bg-[#050000] flex flex-row relative overflow-hidden animate-[fadeIn_0.5s_ease-out]">
      {/* Background Ambient Glow (Red/Dark) */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[800px] h-[800px] bg-red-950/10 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Return Button */}
      <button 
        onClick={onClose}
        className="fixed top-8 right-8 z-[120] text-gray-500 hover:text-white transition-all flex items-center gap-2 group"
      >
        <span className="font-label text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity uppercase">Exit Archive</span>
        <span className="material-symbols-outlined text-4xl font-light">close</span>
      </button>

      {/* Villain Selector - Left Column */}
      <div className="w-[400px] border-r border-white/5 flex flex-col pt-12 pb-12 relative z-10 bg-[#080000]/80 backdrop-blur-xl shrink-0">
        <div className="px-10 mb-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-[1px] bg-red-700"></span>
            <span className="font-label text-[0.6rem] text-red-700 tracking-[0.4em] uppercase font-black">Threat Database</span>
          </div>
          <h2 className="font-marvel text-4xl text-white uppercase tracking-tight">GLOBAL THREAT CLASS: OMEGA</h2>
        </div>

        <nav className="flex flex-col flex-1 overflow-y-auto scrollbar-hide">
          {villainData.map((villain) => (
            <button
              key={villain.name}
              onClick={() => handleSelect(villain)}
              className={`group flex items-center justify-between px-10 py-6 border-b border-white/5 transition-all duration-500 relative overflow-hidden
                ${selectedVillain?.name === villain.name ? 'bg-red-900/10' : 'hover:bg-white/[0.02]'}
              `}
            >
              {selectedVillain?.name === villain.name && (
                <div className="absolute left-0 top-0 w-1 h-full bg-red-700 shadow-[0_0_15px_rgba(185,28,28,0.8)]" />
              )}
              
              <div className="flex flex-col items-start transition-transform duration-500 group-hover:translate-x-2">
                <span className={`font-label text-[0.55rem] tracking-[0.2em] font-bold mb-1 transition-colors ${selectedVillain?.name === villain.name ? 'text-red-600' : 'text-gray-600'}`}>
                   {selectedVillain?.name === villain.name ? 'SCAN_ACTIVE' : 'READY_SYNC'}
                </span>
                <span className={`font-marvel text-2xl tracking-wide uppercase transition-all ${selectedVillain?.name === villain.name ? 'text-white' : 'text-gray-500 opacity-60'}`}>
                  {villain.name}
                </span>
              </div>
              <span className="material-symbols-outlined text-red-900/20 group-hover:text-red-700/40 transition-colors">priority_high</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Cinematic Content Area */}
      <div className="flex-1 relative flex flex-row overflow-hidden">
        
        {/* Initial State: Prompt */}
        {!selectedVillain && (
          <div className="absolute inset-0 flex flex-col items-center justify-center animate-[fadeIn_1s_ease-out]">
             <div className="w-24 h-[1px] bg-red-900/30 mb-8"></div>
             <p className="font-label text-[0.65rem] tracking-[0.6em] text-red-900/60 uppercase">Select Target for Analysis</p>
          </div>
        )}

        {/* Cinematic Spotlight: Image appears centered first */}
        {selectedVillain && (
          <div 
            className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-[1000ms] cubic-bezier(0.2, 0.8, 0.2, 1) z-50
              ${transitionState === 'spotlight' ? 'opacity-100 scale-100 blur-none' : 'opacity-0 scale-90 blur-xl'}
            `}
          >
            <div className="w-[550px] h-[750px] relative">
              <div className="absolute inset-0 bg-red-900/30 blur-[100px] animate-pulse" />
              <img 
                src={selectedVillain.image} 
                alt={selectedVillain.name}
                className="w-full h-full object-cover filter grayscale-[0.2] brightness-90 contrast-[1.1] shadow-[0_0_120px_rgba(0,0,0,1)] border border-red-900/20"
              />
              {/* Spotlight Frame UI */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-red-800 -translate-x-4 -translate-y-4" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-red-800 translate-x-4 translate-y-4" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-8 text-center bg-black/40 backdrop-blur-sm py-4 border-y border-red-900/30">
                 <span className="font-marvel text-4xl text-white tracking-[0.3em]">INITIALIZING_SCAN</span>
              </div>
            </div>
          </div>
        )}

        {/* Villain Details Area (Slides in from Left) */}
        {selectedVillain && (
          <div 
            className={`w-[640px] flex flex-col justify-center px-20 relative z-20 h-full transition-all duration-[1200ms] cubic-bezier(0.2, 0.8, 0.2, 1)
              ${transitionState === 'settled' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-24 blur-sm'}
            `}
          >
            <span className="font-label text-red-700 tracking-[0.6em] text-[0.65rem] font-black uppercase inline-block mb-4">
               Critical Threat Analysis // Level 8 Clearance
            </span>
            <h1 className="font-marvel text-[8rem] text-white leading-[0.85] uppercase tracking-tighter mb-8 drop-shadow-2xl">
              {selectedVillain.name}
            </h1>
            <div className="flex items-center gap-6 mb-12">
              <span className="font-label text-gray-500 tracking-[0.3em] text-[0.65rem] uppercase">{selectedVillain.fullName}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-700 animate-pulse shadow-[0_0_10px_#ef4444]"></span>
              <span className="font-label text-red-900/80 tracking-[0.3em] text-[0.65rem] uppercase font-bold">{selectedVillain.title}</span>
            </div>
            <div className="relative group max-w-lg mb-12">
               <div className="absolute -inset-1 bg-gradient-to-r from-red-900/20 to-transparent opacity-10 blur-lg transition duration-1000"></div>
               <div className="mb-6 flex flex-col gap-2">
                  <span className="material-symbols-outlined text-red-900 text-3xl opacity-40">format_quote</span>
                  <p className="font-marvel text-2xl text-red-600 tracking-wider leading-tight italic uppercase block ml-4">
                    "{selectedVillain.quote}"
                  </p>
               </div>
               <p className="relative font-body text-lg md:text-xl text-gray-400 leading-relaxed font-light italic border-l-4 border-red-900/40 pl-10 py-2">
                 {selectedVillain.story}
               </p>
            </div>
            
            <div className="flex gap-10">
               <div className="flex flex-col gap-1">
                 <span className="font-label text-[0.55rem] text-gray-600 tracking-[0.3em] uppercase font-bold">Threat Level</span>
                 <span className="font-marvel text-2xl text-red-700 underline decoration-red-700/20 underline-offset-8">EXTINCTION</span>
               </div>
               <div className="flex flex-col gap-1">
                 <span className="font-label text-[0.55rem] text-gray-600 tracking-[0.3em] uppercase font-bold">Current Status</span>
                 <span className="font-marvel text-2xl text-white">MONITORED</span>
               </div>
            </div>
          </div>
        )}

        {/* Portrait Area (Settled Right) */}
        {selectedVillain && (
          <div className="flex flex-1 items-center justify-center p-12 relative h-full">
             <div 
               className={`w-full h-full max-w-[500px] relative transition-all duration-[1200ms] cubic-bezier(0.2, 0.8, 0.2, 1)
                 ${transitionState === 'settled' ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-32 scale-90 blur-md'}
               `}
             >
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050000] via-transparent to-transparent opacity-80" />
                <img 
                  src={selectedVillain.image} 
                  alt={selectedVillain.name}
                  className="w-full h-full object-cover grayscale-[0.5] contrast-[1.2] hover:grayscale-0 transition-all duration-1000 rounded-[2px]"
                />
                
                {/* HUD Elements Overlay */}
                <div className="absolute top-6 right-6 z-20 flex flex-col items-end gap-2 text-red-700/40 font-mono text-[0.5rem] tracking-wider">
                   <span>OBJ_ID: {selectedVillain.name.toUpperCase()}</span>
                   <span>LAT: 40.7128 N</span>
                   <span>LNG: 74.0060 W</span>
                </div>
                
                <div className="absolute bottom-6 left-6 z-20 flex flex-col gap-1">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-600 animate-ping"></div>
                      <span className="font-label text-[0.5rem] text-red-600 tracking-[0.4em] font-bold">LIVE_INTERCEPT_ACTIVE</span>
                   </div>
                </div>
             </div>
          </div>
        )}

      </div>
    </div>
  );
}
