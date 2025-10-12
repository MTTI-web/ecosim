'use client';
// components/Header.jsx

import Link from 'next/link';
import styles from './styles.module.css';
import { useUnity } from '@/hooks/useUnity';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react'; // Added useMemo

const Header = () => {
  const { sendMessage, user } = useUnity();
  const pathname = usePathname();

  // Use useMemo to calculate the conditional class name
  const headerClass = useMemo(() => {
    return pathname.slice(0, 8) === '/project'
      ? `${styles.header} ${styles.unityHeader}`
      : styles.header;
  }, [pathname]);

  return (
    <header
      // Apply the conditional class name here
      className={headerClass}
      onClick={async () => {
        const stringified = await JSON.stringify({
          name: 'sex boy',
          age: 12,
          job: 'orgy coordinator',
        });
        console.log(stringified);
        console.log('sending message to unity');
        sendMessage('Canvas', 'Receive', stringified);
      }}
    >
      <div className={styles.container}>
        <div className={styles.projectTitle}>
          <Link href="/">EcoSim</Link>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {!user ? (
              <>
                <li className={styles.navItem}>
                  <Link href="/auth/login">Sign in</Link>
                </li>
                <li className={styles.navItem}>
                  <Link href="/auth/sign_up">Sign up</Link>
                </li>
              </>
            ) : null}
            {user ? (
              <li className={styles.navItem}>
                <Link href="/">EcoSim</Link>
              </li>
            ) : null}
            <li className={styles.navItem}>
              <Link href="/project/new">Simulate</Link>
            </li>
            {user ? (
              <>
                <li className={styles.navItem}>
                  <Link href="/home">Home</Link>
                </li>
                <li className={styles.navItem}>
                  <Link href="/profile">Profile</Link>
                </li>
              </>
            ) : null}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
