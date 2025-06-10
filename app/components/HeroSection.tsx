'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';


const HeroSection: React.FC = () => {
  // Track loading state for each video
  const [videosReady, setVideosReady] = useState({
    video1: false,
    video2: false
  });
  
  // Control when to show videos
  const [showVideos, setShowVideos] = useState(false);

  // Handle video load completion
  const handleVideoLoad = (videoId: 'video1' | 'video2') => {
    console.log(`${videoId} loaded successfully`);
    setVideosReady(prev => ({
      ...prev,
      [videoId]: true
    }));
  };

  // Handle video errors
  const handleVideoError = (videoId: 'video1' | 'video2', error: any) => {
    console.error(`Error loading ${videoId}:`, error);
  };

  // When both videos are ready, show them
  useEffect(() => {
    console.log('Videos ready state:', videosReady);
    if (videosReady.video1 && videosReady.video2) {
      console.log('Both videos ready, showing videos');
      setShowVideos(true);
    }
  }, [videosReady]);

  return (
    <section className="relative w-full h-[90vh] md:h-[90vh]">
      {/* Video and Image Container */}
      <div className="flex flex-col md:flex-row w-full h-full">
        {/* Left Side */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full">
          {/* Static Image (shown while video loads) */}
          <div className={`absolute inset-0 transition-opacity duration-1000 ${showVideos ? 'opacity-0' : 'opacity-100'}`}>
            <Image
              src="/Image1.jpg"
              alt="Hero Image 1"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Video (hidden until ready) */}
          <div className={`absolute inset-0 transition-opacity duration-1000 ${showVideos ? 'opacity-100' : 'opacity-0'}`}>
            <video
              src="/Video1.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="object-cover w-full h-full"
              onLoadedData={() => handleVideoLoad('video1')}
              onError={(e) => handleVideoError('video1', e)}
              preload="auto"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full">
          {/* Static Image (shown while video loads) */}
          <div className={`absolute inset-0 transition-opacity duration-1000 ${showVideos ? 'opacity-0' : 'opacity-100'}`}>
            <Image
              src="/Image2.jpg"
              alt="Hero Image 2"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Video (hidden until ready) */}
          <div className={`absolute inset-0 transition-opacity duration-1000 ${showVideos ? 'opacity-100' : 'opacity-0'}`}>
            <video
              src="/Video2.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="object-cover w-full h-full"
              onLoadedData={() => handleVideoLoad('video2')}
              onError={(e) => handleVideoError('video2', e)}
              preload="auto"
            />
          </div>
        </div>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30" />

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