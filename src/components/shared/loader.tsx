"use client";

import React from "react";

const Loader = () => {
  return (
    <div className='fixed inset-0 w-full h-full flex items-center justify-center z-50 bg-slate-950'>
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className='w-full h-full object-cover'
      >
        <source src="/videos/loading.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Loader;
