// components/LoadingOverlay.jsx

'use client';

import React from 'react';
import styles from './styles.module.css';
import { useUnity } from '@/hooks/useUnity';

const LoadingOverlay = () => {
  const { loading } = useUnity();

  return (
    <div className={`${styles.overlay} ${!loading ? styles.invisible : ''}`}>
      {/* The top strip element that shows the loading animation.
        It uses the 'loadingStrip' class for the animation.
      */}
      <div className={styles.loadingStrip} aria-label="Loading progress"></div>
    </div>
  );
};

export default LoadingOverlay;
