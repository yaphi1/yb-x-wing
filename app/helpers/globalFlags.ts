import { useEffect, useState } from 'react';

export const isMultiplayerEnabled = false; // keep this false most of the time to avoid blowing through free Liveblocks plan limits

export const useDebugMode = () => {
  const [isDebugMode, setIsDebugMode] = useState(false);
  useEffect(() => {
    setIsDebugMode(window.location.hash === '#debug');
  }, []);

  return { isDebugMode };
};
