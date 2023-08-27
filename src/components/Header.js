import React from "react";
import hero from "../assets/rocket.jpg";

export default function Header() {
  return (
   <header className="">
        <nav className='mx-auto w-full p-4 text-2xl border-b border-b-slate-200'>
          <logo className="mx-10 font-bold font-sans">rockets</logo>
        </nav>
        <div className='sm:flex justify-evenly p-10 pb-0 border-b border-b-slate-200'>
          <div className='space-y-2 p-2 self-center'>
            <h1 className='font-bold text-4xl lg:text-7xl text-center md:text-left'>Exploring Space with SpaceX</h1>
            <p className='font-meduim text-xl md:text-2xl text-center md:text-left'>Join us in our journey travelling space with SpaceX</p>
          </div>
          <img src={hero} alt='heroimage' className=' w-full sm:w-1/2 lg:w-6/12 rounded-t-lg mx-auto' />
        </div>
      </header>
  );
}
