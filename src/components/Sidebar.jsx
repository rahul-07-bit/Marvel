import React from 'react';

export default function Sidebar({ setHero }) {
  return (
    <div className="w-full md:w-1/2 flex flex-col justify-center space-y-8 lg:space-y-12 md:border-r border-white/5 pr-0 md:pr-12 lg:pr-24">
      <nav className="flex flex-col gap-6 lg:gap-8">
        <button
          className="nav-item group flex items-center text-left"
          onClick={() => setHero('moon-knight')}
          onMouseEnter={() => setHero('moon-knight')}
        >
          <span className="font-label text-[0.625rem] tracking-[0.4em] opacity-30 group-hover:opacity-100 mr-6 transition-opacity">01</span>
          <span className="font-headline text-4xl lg:text-7xl uppercase tracking-[0.1em] text-neutral-400 group-hover:text-white transition-colors duration-500">Moon Knight</span>
        </button>
        <button
          className="nav-item group flex items-center text-left"
          onClick={() => setHero('venom')}
          onMouseEnter={() => setHero('venom')}
        >
          <span className="font-label text-[0.625rem] tracking-[0.4em] opacity-30 group-hover:opacity-100 mr-6 transition-opacity">02</span>
          <span className="font-headline text-4xl lg:text-7xl uppercase tracking-[0.1em] text-neutral-400 group-hover:text-white transition-colors duration-500">Venom</span>
        </button>
        <button
          className="nav-item group flex items-center text-left"
          onClick={() => setHero('stories')}
          onMouseEnter={() => setHero('stories')}
        >
          <span className="font-label text-[0.625rem] tracking-[0.4em] opacity-30 group-hover:opacity-100 mr-6 transition-opacity">03</span>
          <span className="font-headline text-4xl lg:text-7xl uppercase tracking-[0.1em] text-neutral-400 group-hover:text-white transition-colors duration-500">Doctor Strange</span>
        </button>
        <button
          className="nav-item group flex items-center text-left"
          onClick={() => setHero('more')}
          onMouseEnter={() => setHero('more')}
        >
          <span className="font-label text-[0.625rem] tracking-[0.4em] opacity-30 group-hover:opacity-100 mr-6 transition-opacity">04</span>
          <span className="font-headline text-4xl lg:text-7xl uppercase tracking-[0.1em] text-neutral-400 group-hover:text-white transition-colors duration-500">More Characters</span>
        </button>
      </nav>
      <div className="mt-12 hidden md:block">
        <div className="flex gap-8 text-[0.625rem] tracking-[0.3em] font-label text-neutral-500">
          <a className="hover:text-white transition-colors" href="#">INSTAGRAM</a>
          <a className="hover:text-white transition-colors" href="#">TWITTER</a>
          <a className="hover:text-white transition-colors" href="#">BEHANCE</a>
        </div>
      </div>
    </div>
  );
}
