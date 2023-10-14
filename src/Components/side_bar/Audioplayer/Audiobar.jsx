import React, { useEffect, useState } from 'react';
import '../../../App.css';
import { song } from '../../display_Main_content/Single_album_search';
import { useSongContext } from '../../Central_store/Contex';

const Audiobar = () => {
  const [audio, setAudio] = useState('https://p.scdn.co/mp3-preview/7ba76ba2cf1825bf5a278b91ee3c64539b36e1bd?cid=94b695c9a0e046ba9bb2e002d76b3b75');

  const { currentTrack, setCurrentTrack, isPlaying, setIsPlaying } = useSongContext();

  useEffect(() => {
    // Update the audio state when the song variable changes
    setAudio(currentTrack);
  }, [currentTrack]);

  return (
    <div className='audiobar_div1'>
      <div className='audiobar_div2'>
        <audio id='audio_container' src={audio} controls />
      </div>
    </div>
  );
}

export default Audiobar;
