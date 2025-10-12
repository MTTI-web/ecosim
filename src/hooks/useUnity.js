'use client';

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useUnityContext } from 'react-unity-webgl';
import fetchAPI from '@/utils/fetchAPI';
import { usePathname } from 'next/navigation';
import { Island_Moments } from 'next/font/google';

const UnityContext = createContext(null);

export function UnityProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(true);
  const pathname = usePathname();
  const [stats, setStats] = useState({ playing: false });
  const [playing, setPlaying] = useState(true);

  const unity = useUnityContext({
    loaderUrl: '/build/Build.loader.js',
    dataUrl: '/build/Build.data',
    frameworkUrl: '/build/Build.framework.js',
    codeUrl: '/build/Build.wasm',
  });

  const { sendMessage, addEventListener, removeEventListener, isLoaded } =
    unity;

  // 1. ✅ STABLE: Play function is correctly wrapped.
  const runPlay = useCallback(() => {
    const s = JSON.stringify({ dt: 0.1 });
    sendMessage('Canvas', 'Play', s);
    console.log('I AM PLAYING.');
  }, [sendMessage]);

  // 2. ✅ STABLE: Event handler wrapped in useCallback.
  const handleIncomingMessage = useCallback((message) => {
    console.log('Received message from Unity:', message);
  }, []);

  // 3. ✅ STABLE: FPS Request wrapped in useCallback.
  const askForFPS = useCallback(
    () => sendMessage('Canvas', 'GetFPS'),
    [sendMessage]
  );

  const mapcompress = useCallback(() => {
    console.log('asking for map');
    sendMessage('Canvas', 'GetMapCompressed');
  }, [sendMessage]);

  // 4. ✅ STABLE: FPS Setter wrapped in useCallback.
  const setFPS = useCallback(
    (fps) =>
      setStats((prev) => ({ ...prev, fps: Number.parseFloat(fps).toFixed(0) })),
    [setStats] // Depend on the stable setStats function
  );

  // ... (useEffect for user login remains the same)

  // 5. ✅ CORRECTED Dependencies for incoming messages
  useEffect(() => {
    addEventListener('Massag', handleIncomingMessage);

    return () => {
      removeEventListener('Massag', handleIncomingMessage);
      // NOTE: If you had a 'Play' listener, you'd clean it up here too.
    };
  }, [addEventListener, removeEventListener, handleIncomingMessage]);
  // Removed setStats from dependencies here.
  useEffect(() => {
    const intervalId = setInterval(askForFPS, 200);

    return () => clearInterval(intervalId);
  }, [askForFPS]);

  // useEffect(() => {
  //   const intervalId = setInterval(mapcompress, 200);

  //   return () => clearInterval(intervalId);
  // }, [mapcompress]);

  useEffect(() => {
    addEventListener('GetFPS', setFPS);

    return () => removeEventListener('GetFPS', setFPS);
  }, [addEventListener, removeEventListener, setFPS]);
  const handle = (data) => {
    console.log('getting map', data);
  };
  useEffect(() => {
    console.log('adding event listener for map');
    addEventListener('GetMapCompressed2', handle);

    return () => {
      removeEventListener('GetMapCompressed2', handle);
      // NOTE: If you had a 'Play' listener, you'd clean it up here too.
    };
  }, [addEventListener, removeEventListener, handleIncomingMessage]);

  // useEffect(() => {
  //   console.log(stats);
  // }, [stats]);

  const handleGetCurrentData = (data) => {
    const realdata = JSON.parse(data);
    setStats((stats) => ({ ...stats, ...realdata }));
  };
  useEffect(() => {
    console.log('adding event listener for get current data');
    addEventListener('GetCurrentData', handleGetCurrentData);

    return () => {
      removeEventListener('GetCurrentData', handleGetCurrentData);
      // NOTE: If you had a 'Play' listener, you'd clean it up here too.
    };
  }, [addEventListener, removeEventListener, handleIncomingMessage]);
  useEffect(() => {
    console.log('isplaying');
    addEventListener('IsPlaying', handleGetCurrentData);

    return () => {
      removeEventListener('IsPlaying', handleGetCurrentData);
      // NOTE: If you had a 'Play' listener, you'd clean it up here too.
    };
  }, [addEventListener, removeEventListener, handleIncomingMessage]);

  // ... (useEffect for GetFPS is fine now that setFPS is useCallback)

  // ... (useEffect for FPS interval is fine now that askForFPS is useCallback)

  // 6. ✅ CORRECTED Dependencies for map compressed listener

  // 7. ✅ Main Play/Pause logic is correct and stable.
  useEffect(() => {
    if (isLoaded) {
      if (playing) {
        runPlay();
      } else {
        console.log('I AM PAUSING.');
        sendMessage('Canvas', 'Pause');
      }
    }
  }, [playing, sendMessage, isLoaded, runPlay]);

  useEffect(() => {
    if (!isLoaded) {
      sendMessage('Canvas', 'GetMapCompressed');
    }
  }, [sendMessage, isLoaded]);

  useEffect(() => {
    const func = async () => {
      const res = await fetchAPI({ url: '/auth/get_user' });
      if (res.success) {
        setUser(res.user);
      }
      setloading(false);
    };
    func();
  }, [setUser]);
  useEffect(() => {
    addEventListener('GetMapCompressed', handle);
    return removeEventListener('GetMapCompressed', handle);
  }, [addEventListener, removeEventListener]);

  // 8. ✅ useMemo dependencies are complete.
  const contextValue = useMemo(() => {
    return {
      ...unity,
      user,
      setUser,
      stats,
      setStats,
      loading,
      setloading,
      playing,
      setPlaying,
    };
  }, [
    unity,
    user,
    stats,
    loading,
    playing,
    setStats,
    setUser,
    setloading,
    setPlaying,
  ]); // Added all state setters for completeness

  return (
    <UnityContext.Provider value={contextValue}>
      {children}
    </UnityContext.Provider>
  );
}

export function useUnity() {
  return useContext(UnityContext);
}
