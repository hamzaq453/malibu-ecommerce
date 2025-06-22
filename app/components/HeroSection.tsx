'use client'
import React, { useState, useEffect, SyntheticEvent, useRef } from 'react';
import Image from 'next/image';


const HeroSection: React.FC = () => {
  // Track loading state for each video
  const [videosReady, setVideosReady] = useState({
    video1: false,
    video2: false
  });
  
  // Control when to show videos
  const [showVideos, setShowVideos] = useState(false);
  
  // Track current video for mobile cycling
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  
  // Track if we're on mobile
  const [isMobile, setIsMobile] = useState(false);
  
  // Video refs for programmatic control
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle video load completion
  const handleVideoLoad = (videoId: 'video1' | 'video2') => {
    console.log(`${videoId} loaded successfully`);
    setVideosReady(prev => ({
      ...prev,
      [videoId]: true
    }));
  };

  // Handle video errors
  const handleVideoError = (videoId: 'video1' | 'video2', error: SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error(`Error loading ${videoId}:`, error);
  };

  // Handle video end for mobile cycling
  const handleVideoEnd = () => {
    if (isMobile) {
      setCurrentVideoIndex(prev => prev === 0 ? 1 : 0);
    }
  };

  // Effect to handle video playback when currentVideoIndex changes
  useEffect(() => {
    if (isMobile && showVideos) {
      const currentVideo = currentVideoIndex === 0 ? video1Ref.current : video2Ref.current;
      const otherVideo = currentVideoIndex === 0 ? video2Ref.current : video1Ref.current;
      
      if (currentVideo && otherVideo) {
        // Pause the other video and reset it
        otherVideo.pause();
        otherVideo.currentTime = 0;
        
        // Play the current video
        currentVideo.currentTime = 0;
        currentVideo.play().catch(console.error);
      }
    }
  }, [currentVideoIndex, isMobile, showVideos]);

  // When both videos are ready, show them
  useEffect(() => {
    console.log('Videos ready state:', videosReady);
    if (videosReady.video1 && videosReady.video2) {
      console.log('Both videos ready, showing videos');
      setShowVideos(true);
    }
  }, [videosReady]);

  return (
    <section className="relative w-full h-[81vh] md:h-[90vh]">
      {/* Video and Image Container */}
      {isMobile ? (
        // Mobile: Single cycling video
        <div className="relative w-full h-full">
          {/* Static Image (shown while video loads) */}
          <div className={`absolute inset-0 transition-opacity duration-1000 ${showVideos ? 'opacity-0' : 'opacity-100'}`}>
            <Image
              src={currentVideoIndex === 0 ? "/Image1.png" : "/Image2.jpg"}
              alt={`Hero Image ${currentVideoIndex + 1}`}
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Video 1 */}
          <div className={`absolute inset-0 transition-opacity duration-1000 ${showVideos && currentVideoIndex === 0 ? 'opacity-100' : 'opacity-0'}`}>
            <video
              ref={video1Ref}
              src="/Video1.mp4"
              muted
              playsInline
              className="object-cover w-full h-full"
              onLoadedData={() => handleVideoLoad('video1')}
              onError={(e) => handleVideoError('video1', e)}
              onEnded={handleVideoEnd}
              preload="auto"
            />
          </div>
          
          {/* Video 2 */}
          <div className={`absolute inset-0 transition-opacity duration-1000 ${showVideos && currentVideoIndex === 1 ? 'opacity-100' : 'opacity-0'}`}>
            <video
              ref={video2Ref}
              src="/Video2.mp4"
              muted
              playsInline
              className="object-cover w-full h-full"
              onLoadedData={() => handleVideoLoad('video2')}
              onError={(e) => handleVideoError('video2', e)}
              onEnded={handleVideoEnd}
              preload="auto"
            />
          </div>
        </div>
      ) : (
        // Desktop: Parallel videos
        <div className="flex flex-col md:flex-row w-full h-full">
          {/* Left Side */}
          <div className="relative w-full md:w-1/2 h-1/2 md:h-full">
            {/* Static Image (shown while video loads) */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${showVideos ? 'opacity-0' : 'opacity-100'}`}>
              <Image
                src="/Image1.png"
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
      )}

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