import React, { useRef } from 'react';
import { TwitchEmbed } from 'react-twitch-embed';
import '../home.css'

const TwitchPopout = () => {
  const embed = useRef<any>();

  const handleReady = (e: any) => {
    embed.current = e;
  };
  
  return (
    <div className='twitch'>
      <div>Is CGR live?</div>
      <TwitchEmbed 
        channel="selectivesensitivity" 
        autoplay 
        muted 
        withChat={false}
        darkMode={true} 
        height={200}
        width={500}
        onVideoReady={handleReady} 
      />
    </div>
  )
}

export default TwitchPopout;