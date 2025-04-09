
import React, { useEffect, useRef } from 'react';

const VideoSection: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Set YouTube parameters for autoplay and quality
    const embedUrl = new URL('https://www.youtube.com/embed/jVFTGCeuNSM');
    embedUrl.searchParams.append('autoplay', '1');
    embedUrl.searchParams.append('mute', '0');
    embedUrl.searchParams.append('vq', 'hd1080');
    embedUrl.searchParams.append('rel', '0');
    
    if (iframeRef.current) {
      iframeRef.current.src = embedUrl.toString();
    }
  }, []);

  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="relative w-full max-w-4xl mx-auto aspect-video">
          <div className="cyberpunk-card p-1 h-full">
            <iframe
              ref={iframeRef}
              className="w-full h-full"
              title="Native American History Time Machine Of Destiny"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-primary-purple"></div>
          <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-primary-purple"></div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
