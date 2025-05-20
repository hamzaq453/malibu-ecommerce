import React from 'react';
import Image from 'next/image';
import HeroImage1 from '../../public/Hero3.png';
import HeroImage2 from '../../public/Hero4.png';

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-[90vh] md:h-[80vh]">
      {/* Images Container */}
      <div className="flex flex-col md:flex-row w-full h-full">
        {/* Left Image */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full">
          <Image
            src={HeroImage1}
            alt="Hero Background Left"
            fill
            priority
            sizes="100vw"
            quality={100}
            className="object-cover"
          />
        </div>

        {/* Right Image */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full">
          <Image
            src={HeroImage2}
            alt="Hero Background Right"
            fill
            priority
            sizes="100vw"
            quality={100}
            className="object-cover"
          />
        </div>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white text-4xl sm:text-5xl md:text-7xl font-extrabold uppercase tracking-tight mb-4 drop-shadow-lg">
          Summer Lovin&apos;
        </h1>
        <p className="text-white text-base sm:text-lg md:text-2xl font-semibold drop-shadow-md">
          Shop the Vibe
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
