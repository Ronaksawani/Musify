import React, { createContext, useContext, useState } from 'react';

const SongContext = createContext();

export const useSongContext = () => {
  const context = useContext(SongContext);
 
  return context;
};

export const SongProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <SongContext.Provider value={{ currentTrack, setCurrentTrack, isPlaying, setIsPlaying }}>
      {children}
    </SongContext.Provider>
  );
};
