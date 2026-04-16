import React from 'react';

const timelineData = [
  {
    hero: "Iron Man",
    fullName: "Tony Stark",
    dob: "May 29, 1970",
    status: "End: Avengers: Endgame",
    mission: "Sacrificed himself to save the universe",
    image: "/images/ironman.jpg",
    color: "#EC1D24"
  },
  {
    hero: "Black Widow",
    fullName: "Natasha Romanoff",
    dob: "1984",
    status: "End: Avengers: Endgame",
    mission: "Gave her life for the Soul Stone",
    image: "/images/blackwidow.jpg",
    color: "#EC1D24"
  },
  {
    hero: "Captain America",
    fullName: "Steve Rogers",
    dob: "1920",
    status: "Status: Retired",
    mission: "Led Avengers against Thanos",
    image: "/images/captainamerica.webp",
    color: "#4285F4"
  },
  {
    hero: "Thor",
    fullName: "Odinson",
    dob: "964 AD",
    status: "Status: Alive",
    mission: "Defended Asgard and Earth",
    image: "/images/thor.webp",
    color: "#FFD700"
  },
  {
    hero: "Hulk",
    fullName: "Bruce Banner",
    dob: "December 18, 1969",
    status: "Status: Alive",
    mission: "Reversed the snap",
    image: "/images/hulk.jpg",
    color: "#4CAF50"
  }
];

export default function AvengersTimeline({ onClose }) {
  return (
    <section id="timeline-section" className="pt-24 pb-32 px-24 bg-gradient-to-b from-transparent to-black/60 backdrop-blur-3xl relative min-h-[calc(100vh-80px)] overflow-hidden">
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-24 right-24 z-[100] text-gray-400 hover:text-[#EC1D24] transition-all duration-300 hover:scale-110 active:scale-95 group flex items-center gap-4"
      >
        <span className="font-label text-[0.7rem] tracking-[0.4em] uppercase font-black opacity-0 group-hover:opacity-100 transition-opacity">Return to terminal</span>
        <span className="material-symbols-outlined text-[3.5rem] font-light">close</span>
      </button>

      {/* Background Decorative Text */}
      <div className="absolute top-20 right-0 opacity-[0.02] select-none pointer-events-none block">
        <h2 className="font-marvel text-[25rem] uppercase leading-none text-white whitespace-nowrap translate-x-1/4">
          LEGACY
        </h2>
      </div>

      <div className="w-[1240px] mx-auto flex flex-col gap-16 relative z-10">
        <div className="flex flex-col gap-4 items-start text-left">
          <div className="flex items-center gap-4">
             <span className="w-12 h-[1px] bg-red-600 block"></span>
             <span className="font-label text-red-600 tracking-[0.5em] text-xs font-black uppercase">Chronicles of Valor</span>
          </div>
          <h2 className="font-marvel text-9xl text-white uppercase tracking-tighter leading-none">
            The Timeline
          </h2>
        </div>

        {/* Scroll Container */}
        <div className="flex overflow-x-auto gap-8 pb-20 scrollbar-hide snap-x perspective-1000">
          {timelineData.map((item, idx) => (
             <div 
               key={idx} 
               className="min-w-[450px] h-[700px] flex-shrink-0 group relative rounded-[2px] overflow-hidden snap-center border-[1px] border-white/5 bg-[#0a0a0a] transition-all duration-700 hover:border-red-600/50 hover:shadow-[0_0_50px_rgba(236,29,36,0.15)] reveal-item"
               style={{ animationDelay: `${idx * 0.2}s` }}
             >
                {/* Background Hero Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                   <img 
                     src={item.image} 
                     alt={item.hero} 
                     className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1 filter grayscale-[0.2] contrast-[1.1] group-hover:grayscale-0"
                   />
                   {/* Cinematic Overlays */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-[5]" />
                </div>

                {/* Tactical Frame Elements */}
                <div className="absolute inset-8 border border-white/10 z-20 pointer-events-none group-hover:border-red-600/30 transition-colors duration-500"></div>
                <div className="absolute top-4 left-4 font-label text-[0.5rem] tracking-[0.2em] text-white/30 z-20 font-bold uppercase">SECURE_DATA//LOG_{idx + 1}</div>

                {/* Content Overlay */}
                <div className="absolute inset-0 z-30 p-12 flex flex-col justify-end gap-8">
                   <div className="flex flex-col gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center gap-3">
                         <span className="w-4 h-4 rounded-full border border-red-600 flex items-center justify-center p-[2px]">
                            <span className="w-full h-full bg-red-600 rounded-full animate-pulse"></span>
                         </span>
                         <span className="font-label text-[0.7rem] text-red-600 tracking-[0.4em] uppercase font-black">{item.fullName}</span>
                      </div>
                      <h3 className="font-marvel text-6xl md:text-8xl text-white uppercase leading-none tracking-tight drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
                         {item.hero}
                      </h3>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8 opacity-0 group-hover:opacity-100 translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      <div className="flex flex-col gap-1.5">
                         <span className="font-label text-[0.6rem] text-gray-500 uppercase tracking-widest font-bold">Birth Record</span>
                         <span className="font-body text-sm text-white/90 font-medium">{item.dob}</span>
                      </div>
                      <div className="flex flex-col gap-1.5 text-right">
                         <span className="font-label text-[0.6rem] text-gray-500 uppercase tracking-widest font-bold">Service Status</span>
                         <span className="font-body text-sm text-red-500 font-bold uppercase tracking-tighter">{item.status.split(': ')[1]}</span>
                      </div>
                   </div>

                   <div className="flex flex-col gap-3 opacity-0 group-hover:opacity-100 translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-200">
                      <span className="font-label text-[0.6rem] text-gray-500 uppercase tracking-widest font-bold">Primary Mission Log</span>
                      <p className="font-body text-sm text-gray-400 leading-relaxed italic border-l-2 border-red-600 pl-6 py-1 bg-gradient-to-r from-red-600/5 to-transparent">
                         "{item.mission}"
                      </p>
                   </div>
                   
                   {/* Interactive Indicator */}
                   <div className="mt-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300">
                      <button className="flex items-center gap-3 text-[0.6rem] font-black tracking-[0.3em] uppercase text-white/40 hover:text-red-600 transition-colors">
                        Expand Dossier <span className="material-symbols-outlined text-sm font-light">add_circle</span>
                      </button>
                      <span className="text-white/10 font-marvel text-5xl">0{idx + 1}</span>
                   </div>
                </div>

                {/* Glow highlight */}
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
             </div>
          ))}
        </div>
      </div>
    </section>
  );
}
