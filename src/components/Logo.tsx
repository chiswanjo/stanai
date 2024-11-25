import React from 'react';

export default function Logo() {
  return (
    <div className="relative w-8 h-8">
      {/* Robot head */}
      <div className="absolute inset-0 bg-black rounded-2xl transform transition-transform group-hover:scale-110">
        {/* Happy eyes */}
        <div className="absolute top-[30%] left-[25%] w-[12%] h-[12%] bg-white rounded-full">
          <div className="absolute top-0 left-[25%] w-[50%] h-[50%] bg-white rounded-full" />
        </div>
        <div className="absolute top-[30%] right-[25%] w-[12%] h-[12%] bg-white rounded-full">
          <div className="absolute top-0 left-[25%] w-[50%] h-[50%] bg-white rounded-full" />
        </div>
        
        {/* Big smile */}
        <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 w-[60%] h-[20%] bg-white rounded-full">
          <div className="absolute -top-[2px] left-0 right-0 h-[50%] bg-black rounded-b-full" />
        </div>
        
        {/* Graduation cap */}
        <div className="absolute -top-2 left-0 right-0 h-2 bg-black">
          <div className="absolute -top-1 left-1/2 w-4 h-1 bg-black -translate-x-1/2 rotate-45">
            <div className="absolute top-0 right-0 w-1 h-1 bg-white rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}